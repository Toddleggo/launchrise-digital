# LaunchRise Lead Engine

Standalone AU lead-gen + outreach system. **This is a completely separate app from the
LaunchRise Digital website** — it lives in this folder only, has its own dependencies,
and deploys as its own Vercel project.

Pipeline: source business leads by category from Google Places → score their website
(no site = hottest) → AI-personalise a 3-touch email + SMS sequence → send on a
compliant, warm-up-ramped schedule → AI-triage replies → surface hot leads in the dashboard.

> Not legal advice. The consent/footer approach follows a general reading of the
> Spam Act 2003 / ACMA guidance — have a lawyer sanity-check before the first real send.

## Stack

- **Dashboard**: Vite + React (this folder), Supabase Auth (email/password)
- **API**: Vercel serverless functions in `api/`
- **DB**: Supabase Postgres (`schema.sql`)
- **Leads**: Google Places API (New) Text Search — not scraping directories
- **Email**: Resend (outbound, inbound parsing, bounce/complaint webhooks)
- **SMS**: Twilio AU (STOP compliance)
- **AI**: Claude API (`claude-opus-4-8`) for personalization lines + reply triage

## Setup

1. **Database** — run `schema.sql` in the Supabase SQL editor. Create a dashboard
   user under Supabase Auth → Users (RLS grants authenticated users full access).
2. **New Vercel project** — import this repo, set **Root Directory = `lead-engine`**.
   This keeps it fully separate from the website's Vercel project.
3. **Env vars** — copy `.env.example`; set the `VITE_*` pair in both local `.env` and
   Vercel, and everything else in Vercel (server-side only). `CRON_SECRET` and
   `WEBHOOK_SECRET` are long random strings you generate (`openssl rand -hex 32`).
4. **Resend** — verify your sending domain (SPF + DKIM), then add webhooks:
   - Events (`email.bounced`, `email.complained`, `email.opened`) →
     `https://<deploy>/api/webhooks/resend?key=<WEBHOOK_SECRET>`
   - Inbound (`email.received` on your reply-to address) →
     `https://<deploy>/api/webhooks/resend-inbound?key=<WEBHOOK_SECRET>`
5. **Twilio** — buy an AU number, set the inbound SMS webhook to
   `https://<deploy>/api/webhooks/twilio-sms?key=<WEBHOOK_SECRET>` (POST).
   Also enable Twilio Advanced Opt-Out so STOP is honoured at carrier level.
6. **Cron** — `vercel.json` schedules `/api/send-batch` hourly; the function itself
   only sends 9am–5pm AEST on weekdays and respects the caps, so the hourly trigger
   is safe. (Vercel Hobby only allows daily crons — either upgrade, or change the
   schedule to `0 23 * * *` and raise `batchSize`.) Set `CRON_SECRET` in Vercel so
   cron requests are authenticated.

## Local dev

```bash
cd lead-engine
npm install
npm run dev            # dashboard only
# or: npx vercel dev   # dashboard + api functions
```

## Operating procedure (build order)

1. Source one category in one suburb → **Enrich** → eyeball the data quality.
2. Create a campaign for that category (templates pre-filled, edit freely).
3. **Generate AI personalization**, then **Queue ready leads**.
4. With sending still paused, flip the kill switch to live and use
   **Run send batch** on the Overview tab to verify one real end-to-end send.
5. Confirm the unsubscribe link, STOP handling, and reply triage all work.
6. Leave it to the hourly cron. Warm-up ramps automatically: 20/day week 1,
   50/day week 2, then 100/day.

## Compliance non-negotiables (enforced in code)

- Every send checks `do_not_contact` first — `sender.js` refuses otherwise.
- Emails only come from each business's **own website** (inferred consent);
  never from third-party directories.
- Every email carries business name, ABN, physical address, and a working
  unsubscribe link (+ one-click `List-Unsubscribe` headers). Every SMS carries
  the business name and "Reply STOP to opt out". `compliance.js` blocks any
  message missing these.
- Unsubscribe/STOP/complaints/hard bounces auto-populate `do_not_contact`
  across **both** channels and flip the lead to `dnc`.
- `outreach_log` has a unique `(lead_id, touch_number, channel)` index — no
  business can ever be double-messaged, even across categories.
- Kill switch (`send_settings.sending_paused`) starts **on** and is one click
  in the dashboard; the engine checks it before every batch.
- Warm-up caps are enforced per Sydney calendar day; sends are staggered
  3–6 s apart, never a burst.

## API routes

| Route | Auth | Purpose |
|---|---|---|
| `POST /api/source-leads` | dashboard session | Places search → insert leads |
| `POST /api/enrich-leads` | dashboard session | score websites, extract published emails |
| `POST /api/personalize-leads` | dashboard session | generate cached AI opening lines |
| `GET/POST /api/send-batch` | cron secret / session | run one sending batch |
| `POST /api/send-reply` | dashboard session | one-click send of AI draft |
| `GET /api/unsubscribe` | HMAC token in link | public one-click unsubscribe |
| `POST /api/webhooks/resend` | `?key=` secret | bounces, complaints, opens |
| `POST /api/webhooks/resend-inbound` | `?key=` secret | inbound email → triage |
| `POST /api/webhooks/twilio-sms` | `?key=` secret | inbound SMS / STOP → triage |
