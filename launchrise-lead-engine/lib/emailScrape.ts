// Light, compliant fetch of a business's own public homepage to find a
// contact email. This is NOT scraping a directory/ToS-protected source —
// it's reading one public page the business itself published.

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const JUNK_DOMAINS = ["example.com", "sentry.io", "wixpress.com", "godaddy.com"];

export async function findEmailOnWebsite(websiteUrl: string): Promise<string | null> {
  if (!websiteUrl) return null;

  try {
    const url = websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`;
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LeadEngineBot/1.0)" },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // mailto: links first — most reliable signal of an intended contact address
    const mailtoMatch = html.match(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (mailtoMatch) return cleanEmail(mailtoMatch[1]);

    // fallback: any email-shaped string on the page
    const matches = html.match(EMAIL_REGEX);
    if (matches) {
      const clean = matches
        .map(cleanEmail)
        .find((e) => !JUNK_DOMAINS.some((d) => e.endsWith(d)));
      if (clean) return clean;
    }

    // last resort: try /contact page
    try {
      const contactUrl = new URL("/contact", url).toString();
      const contactRes = await fetch(contactUrl, {
        signal: AbortSignal.timeout(6000),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; LeadEngineBot/1.0)" },
      });
      if (contactRes.ok) {
        const contactHtml = await contactRes.text();
        const contactMatches = contactHtml.match(EMAIL_REGEX);
        if (contactMatches) {
          const clean = contactMatches
            .map(cleanEmail)
            .find((e) => !JUNK_DOMAINS.some((d) => e.endsWith(d)));
          if (clean) return clean;
        }
      }
    } catch {
      // ignore contact page failures
    }

    return null;
  } catch {
    return null;
  }
}

function cleanEmail(raw: string): string {
  return raw.trim().replace(/[.,;]+$/, "").toLowerCase();
}
