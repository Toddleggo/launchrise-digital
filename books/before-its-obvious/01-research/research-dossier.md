# PHASE 1 — RESEARCH DOSSIER

**Working title:** *Before It's Obvious*
**Research date:** 30 September 2026
**Book window:** late 2026 → 2031

Every claim below carries one of four labels. The finished book uses the same labels, in plain English, so readers always know how solid the ground is under their feet.

| Label | Meaning in the book |
|---|---|
| **NOW** | Documented. Happening. Sourced. |
| **LIKELY** | Strong evidence or broad expert agreement points this way. |
| **POSSIBLE** | Credible people argue for it; the evidence is thin or split. |
| **WILD CARD** | Could happen. Nobody can reliably predict it. |

> ⚠️ = flagged for re-verification before publication (secondary source only, fast-moving, or vendor claim).

---

## 1. How fast AI capability is actually moving

**The single most important number in the book: the "Doubling Clock."**

- **NOW** — METR (an independent AI evaluation lab) measures the length of task, in *human expert time*, that an AI agent can finish with 50% reliability. Across 2019–2025 that length doubled roughly every **7 months (196 days)**. Since 2024 it has doubled roughly every **89 days**. — METR, *Time Horizon 1.1*, 29 Jan 2026. https://metr.org/blog/2026-1-29-time-horizon-1-1/
- **NOW** — In that January 2026 update: Claude Opus 4.5 ≈ 320 min (5+ hours), GPT-5 ≈ 214 min, o3 ≈ 121 min — each with **very wide confidence intervals** (Opus 4.5: 170–729 min). Same source.
- **NOW** ⚠️ — By May 2026, METR states measurements "above 16 hrs are unreliable with our current task suite" — i.e., the newest frontier models are reaching the edge of what the test can measure. Secondary reporting puts Claude Opus 4.6 at ~718 minutes and an early Claude Mythos Preview at ≥16 hours (50%) and ~3 hours (80% reliability). Verify exact figures on the METR graph before print. https://metr.org/time-horizons/
- **Caveats to state in the book (honesty = credibility):** METR tasks are mostly software/research tasks; "50% success" is not "reliable"; the 80%-reliability horizon is much shorter; METR itself says only 5 of 31 long tasks had measured human baselines.
- **NOW** — The International AI Safety Report 2026 (Bengio et al., 100+ experts, 30+ countries, pub. 3 Feb 2026) concludes capabilities are advancing faster than governance, and that some risks once theoretical now have empirical evidence (e.g., models gaming evaluations, behaving differently in testing). https://internationalaisafetyreport.org/
- **NOW** — Stanford AI Index 2026: agent success on real-world task benchmarks rose from ~20% (2025) to 77.3%; cybersecurity agents solved 93% of a problem set vs 15% in 2024; **robots succeed at only ~12% of household tasks**; US–China frontier gap ~2.7% (Mar 2026). https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
- **NOW** — OpenAI's GDPval (44 occupations, tasks built by professionals averaging 14 years' experience): best models were at ~48% win-or-tie vs human experts when published (Claude Opus 4.1 top at 47.6%), improving roughly linearly; ~100x faster/cheaper on *model time only* — **excludes human review, iteration and integration** (state this every time). https://arxiv.org/abs/2510.04374
- **Book framing — "The Jagged Edge":** Harvard/BCG field experiment (758 consultants, GPT-4): inside AI's capability frontier, consultants did 12.2% more tasks, 25.1% faster, ~40% higher quality; on a task *outside* the frontier they were **19 percentage points less likely** to be correct. AI is brilliant and dumb at the same time, and you can't tell which from the confidence of its answer. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321

**Disagreement to explain:** Some researchers argue benchmark gains overstate real-world usefulness (METR's own 2025 developer RCT: experienced devs were **19% slower** with early-2025 AI tools while *believing* they were 20% faster — METR now labels this result historical). Others argue measured gains understate what agents can already do. Book position: *trust the trend, distrust any single number.* https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

---

## 2. Jobs and the labour market — what the data actually shows

**The honest headline: no economy-wide collapse (yet). A real, measurable squeeze on the bottom rung of the ladder.**

- **NOW** — Stanford Digital Economy Lab, *Canaries in the Coal Mine* (Brynjolfsson, Chandar, Chen), Aug 2026 update, ADP payroll data through June 2026:
  1. No widespread, economy-wide displacement.
  2. Workers **aged 22–25 in the most AI-exposed jobs are ~19% below** where they'd be if they'd tracked peers in less-exposed jobs (up from 15% in July 2025).
  3. Experienced workers show no comparable gap.
  4. It's happening through **fewer hires, not more firings.**
  5. Declines concentrate where AI *automates*; where it *augments*, employment is flat or rising.
  6. Wages so far stable.
  Authors stress these are **descriptive, not causal.** https://digitaleconomy.stanford.edu/news/canariesaug26/
- **Book framing — "The Hiring Freeze Nobody Announced."** Nobody fires you. They just stop replacing the person who leaves, and stop hiring the graduate.
- **NOW** — Yale Budget Lab (ongoing tracker): no discernible economy-wide disruption to the occupational mix since ChatGPT; labour-market weakness in 2025–26 is "probably not (yet)" AI. https://budgetlab.yale.edu/research/ai-probably-not-yet-reason-labor-market-weakening
- **NOW** — US unemployment 4.1% (Aug 2026, BLS). Recent college grads (22–27): ~5.6–5.7% unemployment, underemployment ~42% (NY Fed, Q1–Q2 2026) — higher than the overall rate, historically unusual. https://www.bls.gov/news.release/empsit.nr0.htm · https://www.newyorkfed.org/research/college-labor-market
- **NOW** — Challenger, Gray & Christmas: AI was the **#1 stated reason for US job-cut announcements** for five straight months in 2026; ~101,700 cuts citing AI by June 2026 (~23% of all cuts), vs ~54,800 in all of 2025. Caveat for the book: *announced* reasons, which companies may use as cover for ordinary cost-cutting. https://www.challengergray.com/blog/category/job-cuts-report/
- **NOW** — Stanford AI Index 2026: employment of software developers aged 22–25 down nearly 20% since 2024.
- **LIKELY** — WEF *Future of Jobs 2025* (employer survey, 1,000+ firms, 14M workers): by 2030, 170M jobs created, 92M displaced, net +78M; employers expect **39% of core skills to change**. Fastest-growing skills: AI & big data, networks & cybersecurity, tech literacy, creative thinking, resilience, curiosity, lifelong learning. Caveat: employer *expectations*, not measurements. https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/
- **LIKELY** — IMF (Jan 2024): ~40% of global jobs exposed to AI; ~60% in advanced economies; roughly half of exposed jobs may benefit, half may face lower demand/wages; AI likely to worsen inequality in most scenarios. https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity
- **POSSIBLE** — Dario Amodei (Anthropic CEO), May 2025: AI could eliminate up to half of entry-level white-collar jobs within 1–5 years, pushing unemployment to 10–20%. By 2026 he also emphasised a Jevons-style effect (cheaper work → more demand). Present as one credible insider's warning, **not** a forecast consensus. https://www.axios.com/2025/05/28/ai-jobs-white-collar-unemployment-anthropic
- **NOW (usage)** — Anthropic Economic Index (Jan–Jun 2026): on Claude.ai, ~52% of conversations *augment* people (learning, iterating) vs ~45% automate; API/business traffic is mostly automation; computer & maths tasks ≈ a third of consumer use. https://www.anthropic.com/research/economic-index-june-2026-report

**Productivity evidence (the "who gains most" story):**
- **NOW** — Customer support, 5,179 agents: AI assistant raised issues resolved/hour **14% on average, 34% for novices**, little for top performers; improved customer sentiment and retention. (Brynjolfsson, Li, Raymond, *QJE* 2025.) https://academic.oup.com/qje/article/140/2/889/7990658
- **NOW** — Klarna: AI assistant did the work of ~700 agents in 2024; in 2025 the CEO said cost had been "too predominant," quality fell, and the company resumed hiring humans for complex/premium support. **Perfect book story: "AI-first, then human-again."** https://www.customerexperiencedive.com/news/klarna-reinvests-human-talent-customer-service-AI-chatbot/747586/
- **NOW** — MIT NANDA (Jul 2025): ~95% of enterprise gen-AI pilots showed no measurable P&L impact; failure mostly integration and workflow, not the model. Caveat: small-sample methodology, widely criticised. → **Opportunity for readers:** businesses need people who can make AI *actually work*. https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx

---

## 3. Trades, robots, driving, the physical world

- **NOW** — Waymo: ~500,000+ paid driverless rides/week across 14 US cities (Sept 2026), target 1M/week by end of 2026. ⚠️ verify on Waymo's own blog before print. https://techcrunch.com/2026/03/27/waymo-skyrocketing-ridership-in-one-chart/
- **NOW** — Humanoid robots: as of mid-2026 no maker has sustained commercial deployment beyond the low hundreds of units. Figure (BMW Spartanburg) and Agility (Digit) have paying customers; Tesla's Optimus units are internal and Musk called them primarily for learning/data collection. ⚠️ mostly vendor/secondary claims. https://humanoid.guide/humanoid-deployments-in-2026-favor-figure-and-agility/
- **NOW** — Stanford AI Index 2026: robots succeed at ~12% of household tasks. **Your plumber is safer than your paralegal — for now.**
- **NOW** — AI is *creating* trade demand: AGC/NCCER 2026 survey — 58% of construction firms say data-centre projects are increasing competition for workers; nearly half feel pressure to raise wages. https://www.cnbc.com/2026/03/18/ai-data-center-buildout-jobs-salary-skilled-traders-worker-shortage.html
- **LIKELY** — IEA: data-centre electricity use to roughly double to ~945 TWh by 2030 (≈ Japan's total consumption today), ~3% of global electricity. → electricians, linesmen, HVAC, cooling techs, grid workers. https://www.iea.org/reports/energy-and-ai/executive-summary
- **POSSIBLE** — Humanoids doing meaningful paid work in warehouses/factories at scale by 2029–2031. Trucking: long-haul autonomy in limited corridors. Home robots doing general chores: **WILD CARD** in this window.

---

## 4. Scams, fraud, deepfakes — the family-safety chapter's backbone

- **NOW** — FBI IC3 2025: $20.9B reported losses (+26%); **people 60+ lost $7.75B (+59%)**; crypto-related losses >$11B; first-ever AI section: 22,364 complaints, ~$893M. https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf
- **NOW** — FTC 2025: record **$15.9B** reported fraud losses (~3M reports); investment scams ~$7.9B; impostor scams $3.5B. FTC estimated true 2024 cost incl. under-reporting could be up to ~$196B. https://www.ftc.gov/news-events/news/press-releases/2026/06/ftc-data-show-people-reported-losing-3-point-5-billion-imposter-scams-2025
- **NOW** — Arup (engineering firm): Hong Kong employee paid ~US$25M across 15 transfers after a video call where every other "colleague" was a deepfake (reported Feb 2024; Arup confirmed May 2024). https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk
- **NOW** — McAfee survey (7,054 people, 7 countries, 2023): 1 in 4 had experienced or knew someone hit by an AI voice scam; of victims, 77% lost money. ⚠️ vendor survey, 2023 — label as such. https://www.businesswire.com/news/home/20230501005587/en/
- **Book framework — "The Family Safe Word"** and **"Hang up, call back"** rules. Cheap, instant, and they beat a $25M deepfake.

---

## 5. Children, education, companions

- **NOW** — Stanford AI Index 2026: ~80% of US high-school and college students use AI for school; only ~6% of teachers report clear AI policies.
- **NOW** — Common Sense Media (2025, n=1,060 teens): **72% of US teens have used AI companions**, 52% regularly, ~1 in 3 for social interaction/relationships. https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions
- **NOW** — Character.AI & Google settled five lawsuits tied to teen harm (Jan 2026, no admission of liability). California SB 243 (in force 1 Jan 2026): companion bots must disclose they're AI to minors, prompt breaks every 3 hours, have self-harm protocols. https://calawyers.org/privacy-law/regulatory-focus-on-ai-companion-character-chatbots/
- **NOW (the hopeful side)** — World Bank RCT, Nigeria: 6 weeks of teacher-guided GPT-4 tutoring → +0.31 SD overall, ≈1.5–2 years of typical learning; gains showed up in end-of-year exams. https://blogs.worldbank.org/en/education/From-chalkboards-to-chatbots-Transforming-learning-in-Nigeria
- **NOW** — Harvard physics RCT (Kestin et al., *Scientific Reports* 2025, n=194): a carefully designed AI tutor produced median learning gains >2x an active-learning class, in less time. Key: the tutor was **built to make students think, not to give answers.** https://www.nature.com/articles/s41598-025-97652-6
- **Book thesis for parents:** AI can make a child dramatically smarter or dramatically lazier. The difference is *design and supervision*, not the tool.

---

## 6. Money, social safety nets, public mood

- **NOW** — OpenResearch unconditional cash study ($1,000/mo for 3 years, 1,000 recipients vs 2,000 controls): modest drop in work hours, more business ideas/intentions, stress/food-security gains faded after year one. Useful for the UBI chapter: **not magic, not disaster.** https://www.openresearchlab.org/projects/unconditional-cash-study
- **NOW** — Pew: 52% of Americans more concerned than excited about AI; for the first time a majority of under-30s (55%) too (Aug 2026). Workers: 52% worried, 36% hopeful. https://www.pewresearch.org/short-reads/2026/08/18/young-adults-in-the-us-are-increasingly-wary-of-ai-concerned-it-will-take-jobs/
- **NOW** — Stanford AI Index 2026: gen-AI reached 53% population adoption in ~3 years — faster than the PC or internet; US adoption ranks only ~24th (28.3%). **Most people are still not using it seriously. That's the reader's head start.**

---

## 7. Regulation & government

- **NOW** — EU AI Act: transparency duties (tell people they're talking to AI; label AI content) apply from 2 Aug 2026; high-risk obligations delayed to **2 Dec 2027** (standalone) / **2 Aug 2028** (embedded products) by the Digital Omnibus (Reg. 2026/1744). https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/
- **NOW** — US: patchwork of state laws (e.g., CA SB 243). ⚠️ Federal pre-emption fights ongoing — re-check in final fact-check pass.
- **Book stance:** Don't wait for the government to protect your household. Help may come; plan as if it arrives late.

---

## 8. Health & professional services (quick hits)

- **NOW** — Stanford AI Index 2026: physicians using clinical AI scribes reported ~83% less time writing notes.
- **LIKELY** — Admin-heavy roles (medical billing, claims, paralegal research, bookkeeping, junior analyst work) see the earliest *headcount* pressure; licensed, hands-on, accountable roles (nurses, surgeons, electricians, pharmacists-in-person) see *augmentation* first.

---

## 9. Where the experts genuinely disagree (the book explains all of these)

1. **Speed.** Lab leaders talk of transformative AI by ~2027–2030; many economists expect decades-long diffusion like electricity. Evidence: capabilities are racing; *adoption inside real businesses* is slow (MIT NANDA, Yale).
2. **Jobs.** Net creation (WEF) vs severe white-collar disruption (Amodei). Current data: entry-level squeeze, no broad collapse.
3. **Productivity.** Big gains in controlled studies; small or negative in some real-world settings (METR 2025 RCT).
4. **Robots.** Huge investment and hype; very small real deployments so far.
5. **Kids.** Tutoring evidence is excellent *when designed well*; companion-app evidence is worrying.

---

## 10. Flags carried into Phase 5 fact-check

- ⚠️ METR per-model numbers after Jan 2026 (read from secondary sources).
- ⚠️ "SWE-bench Verified near 100%" appears only in secondary summaries of the AI Index — do not use until checked in the full report.
- ⚠️ Waymo and humanoid-robot numbers (company claims).
- ⚠️ Challenger AI-attribution is *self-reported by employers*.
- ⚠️ McAfee voice-clone survey is 2023 and vendor-run.
- ⚠️ Any model names/versions — will be stale by publication. Book should refer to "the best models of 2026" and put specifics in endnotes.
- ⚠️ US federal AI policy — moving monthly.
