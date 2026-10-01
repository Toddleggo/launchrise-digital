#!/usr/bin/env python3
"""Build the print PDF (WeasyPrint) and master DOCX (pandoc) for Future-Proof Your Family."""
import re, subprocess, sys
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
MS = ROOT / "manuscript"
BUILD = ROOT / "build"
OUT = ROOT / "output"
OUT.mkdir(exist_ok=True)

TITLE = "Future-Proof Your Family"


def chapter_files():
    return sorted(p for p in MS.glob("[0-9][0-9].md") if p.stem != "00")


def split_notes(text):
    """Return (body, notes) where notes is the markdown under '## Notes'."""
    m = re.search(r"^## Notes\s*$", text, flags=re.M)
    if not m:
        return text, ""
    return text[: m.start()].rstrip() + "\n", text[m.end():].strip()


def assemble():
    front = (MS / "00-front.md").read_text()
    parts = [front]
    notes = []
    for p in chapter_files():
        body, n = split_notes(p.read_text())
        parts.append(body)
        title = re.search(r"^# (.+?) \{", body, flags=re.M).group(1)
        num = int(p.stem)
        if n:
            notes.append(f"### Chapter {num}: {title} {{.notes-chapter}}\n\n{n}\n")
    back = sorted(MS.glob("9[0-9]-*.md"))
    for b in back:
        txt = b.read_text()
        if "<!-- NOTES -->" in txt:
            txt = txt.replace("<!-- NOTES -->", "\n".join(notes))
        parts.append(txt)
    return "\n\n".join(parts)


def md_to_html(md):
    src = BUILD / "book.md"
    src.write_text(md)
    html = subprocess.run(
        ["pandoc", str(src), "-f", "markdown+smart+fenced_divs+bracketed_spans",
         "-t", "html5", "--section-divs=false"],
        check=True, capture_output=True, text=True).stdout
    return html


def postprocess(html):
    soup = BeautifulSoup(html, "html.parser")
    # Chapter openers
    for h in soup.find_all("h1", class_="chapter"):
        num = h.get("data-number")
        part = h.get("data-part")
        ptitle = h.get("data-parttitle")
        wrap = soup.new_tag("div", attrs={"class": "chapter-open"})
        if part:
            k = soup.new_tag("p", attrs={"class": "part-kicker"})
            k.string = f"{part} · {ptitle}"
            wrap.append(k)
            wrap["class"] = ["chapter-open", "part-start"]
        n = soup.new_tag("p", attrs={"class": "chap-num"})
        n.string = f"Chapter {num}"
        wrap.append(n)
        h.insert_before(wrap)
        wrap.append(h.extract())
    # Let tables size columns from their content
    for cg in soup.find_all("colgroup"):
        cg.decompose()
    for t in soup.find_all(["th", "td"]):
        if t.has_attr("style"):
            del t["style"]
    # Group top-level content into sections (front / chapter / back)
    children = [c for c in list(soup.contents)]
    current = None
    first_main = True
    for c in children:
        name = getattr(c, "name", None)
        cls = (c.get("class") or []) if name else []
        starts = None
        if name == "h1" and "frontmatter" in cls:
            starts = "frontsec"
        elif name == "div" and "chapter-open" in cls:
            starts = "chapsec"
            if first_main:
                starts = "chapsec firstsec"
                first_main = False
        elif name == "h1" and "backmatter" in cls:
            starts = "backsec " + " ".join(x for x in cls if x not in ("backmatter",))
        elif name in ("div", "section") and any(x in cls for x in ("halftitle", "titlepage", "copyright", "toc-page")):
            current = None
            continue
        if starts:
            current = soup.new_tag("section", attrs={"class": starts})
            c.insert_before(current)
        if current is not None:
            current.append(c.extract())
    # One container for all main-matter sections so they form a single page group
    secs = soup.find_all("section", class_=["chapsec", "backsec"], recursive=False)
    if secs:
        main = soup.new_tag("div", attrs={"class": "mainmatter"})
        secs[0].insert_before(main)
        for sct in secs:
            main.append(sct.extract())
    # Table of contents
    toc = soup.find(class_="toc-page")
    if toc:
        ul = soup.new_tag("ul", attrs={"class": "toc"})
        for h in soup.find_all("h1"):
            cls = h.get("class") or []
            if "toc-title" in cls:
                continue
            if "halftitle" in cls:
                continue
            hid = h.get("id")
            if not hid:
                continue
            li = soup.new_tag("li")
            if "chapter" in cls:
                par = h.find_parent("div", class_="chapter-open")
                if par and par.find("p", class_="part-kicker"):
                    pli = soup.new_tag("li", attrs={"class": "toc-part"})
                    pli.string = par.find("p", class_="part-kicker").get_text()
                    ul.append(pli)
                li["class"] = "toc-chapter"
                num = soup.new_tag("span", attrs={"class": "toc-num"})
                num.string = h.get("data-number")
                li.append(num)
            elif "frontmatter" in cls:
                li["class"] = "toc-front"
            else:
                li["class"] = "toc-back"
            a = soup.new_tag("a", href=f"#{hid}")
            a.string = h.get_text()
            li.append(a)
            ul.append(li)
        toc.append(ul)
        for c in list(toc.contents):
            if getattr(c, "name", None) is None and "TOC" in str(c):
                c.extract()
    # Strip pandoc comment placeholder
    html = str(soup).replace("<!-- TOC -->", "")
    return html


def build_pdf(html_body):
    from weasyprint import HTML, CSS
    from weasyprint.text.fonts import FontConfiguration
    css = (BUILD / "print.css").read_text().replace("FONTDIR", str(BUILD / "fonts"))
    doc = f"<!DOCTYPE html><html lang='en-AU'><head><meta charset='utf-8'><title>{TITLE}</title></head><body>{html_body}</body></html>"
    (BUILD / "book.html").write_text(doc)
    fc = FontConfiguration()
    out = OUT / "Future-Proof-Your-Family-KDP-6x9-FINAL.pdf"
    HTML(string=doc, base_url=str(BUILD)).write_pdf(
        out, stylesheets=[CSS(string=css, font_config=fc)], font_config=fc,
        pdf_variant=None)
    print("PDF:", out)
    return out


def build_docx(md):
    # Ebook/master DOCX: strip print-only blocks
    md2 = re.sub(r"::: \{\.halftitle\}.*?\n:::\n", "", md, flags=re.S)
    md2 = re.sub(r"::: \{\.toc-page\}.*?\n:::\n", "", md2, flags=re.S)
    md2 = re.sub(r"::: \{\.titlepage\}.*?\n:::\n", "", md2, flags=re.S)
    src = BUILD / "book-docx.md"
    src.write_text(md2)
    out = OUT / "Future-Proof-Your-Family-FINAL.docx"
    ref = BUILD / "reference.docx"
    args = ["pandoc", str(src), "-f", "markdown+smart+fenced_divs+bracketed_spans",
            "-o", str(out), "--toc", "--toc-depth=1"]
    if ref.exists():
        args += ["--reference-doc", str(ref)]
    subprocess.run(args, check=True)
    print("DOCX:", out)


if __name__ == "__main__":
    md = assemble()
    html = postprocess(md_to_html(md))
    if "pdf" in sys.argv or len(sys.argv) == 1:
        build_pdf(html)
    if "docx" in sys.argv or len(sys.argv) == 1:
        build_docx(md)
