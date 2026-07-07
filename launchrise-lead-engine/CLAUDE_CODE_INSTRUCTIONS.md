# Paste this whole file into Claude Code to finish LaunchRise Lead Engine

## Context
The full codebase already exists in the `launchrise-lead-engine/` folder (Todd built it with Claude via Cowork). Your job is NOT to rebuild it — it's to get it running, connected, tested, and deployed. Read the existing files before changing anything.

## What already exists
- Next.js 14 App Router project, TypeScript
- `supabase/schema.sql` — full DB schema (leads, campaigns, outreach_log, do_not_contact)
- `lib/googlePlaces.ts` + `lib/emailScrape.ts` — lead sourcing (Google Places API, not scraping)
- `app/api/leads/source/route.ts` — POST to pull leads for a category+location
- `app/api/campaigns/route.ts` + `app/campaigns/new/page.tsx` — campaign builder (validates SMS has STOP wording, email has unsubscribe placeholder)
- `lib/sendEngine.ts` — core send logic: checks `do_not_contact` before every send, rate-limits (1 send/4sec), logs to `outreach_log`, never double-messages a lead
- `app/api/send/route.ts` — manual trigger (POST)
- `app/api/cron/send/route.ts` — daily cron trigger, protected by `CRON_SECRET`
- `app/api/webhooks/resend/route.ts` — email bounce/complaint/inbound reply → updates `do_not_contact` / lead status
- `app/api/webhooks/twilio/route.ts` — SMS STOP handling + reply detection
- `app/api/unsubscribe/route.ts` — the link every email footer must point to
- `app/dashboard/page.tsx` — sent today/week, reply rate by category, replied leads table
- `vercel.json` — cron schedule (9am AEST daily)

## Your build order — do NOT skip steps or reorder

1. **Install & sanity check**
   ```
   cd launchrise-lead-engine
   npm install
   npm run build
   ```
   Fix any type errors before moving on.

2. **Supabase**
   - Create a Supabase project (or use existing one Todd points you to)
   - Run `supabase/schema.sql` in the SQL editor
   - Copy Project URL + service role key into `.env.local` (copy from `.env.example`)

3. **Google Places API**
   - Enable "Places API" in Google Cloud Console, get an API key
   - Restrict the key to Places API only
   - Add to `.env.local` as `GOOGLE_PLACES_API_KEY`

4. **Resend**
   - Verify a sending domain in Resend
   - Get API key → `RESEND_API_KEY`, set `RESEND_FROM_EMAIL` to a verified address
   - Set up a webhook pointing to `/api/webhooks/resend` for bounce/complaint events, copy the signing secret into `RESEND_WEBHOOK_SECRET`
   - Set up inbound parsing (or a forwarding rule) so replies hit `/api/webhooks/resend` too

5. **Twilio**
   - Buy/confirm an AU number that supports SMS
   - Get Account SID + Auth Token → `.env.local`
   - Set the number's "A message comes in" webhook to `/api/webhooks/twilio`

6. **Fill in compliance fields**
   - `BUSINESS_NAME`, `BUSINESS_ABN` (or ACN), `BUSINESS_ADDRESS` (physical address or PO box — mandatory under the Spam Act), `REPLY_TO_EMAIL`
   - `UNSUBSCRIBE_BASE_URL` = your deployed domain + `/api/unsubscribe`
   - `CRON_SECRET` = generate a random string

7. **Test end-to-end manually before touching cron**
   - `npm run dev`
   - Hit `POST /api/leads/source` with `{ "category": "electrician", "location": "Melbourne VIC" }` — confirm real leads land in Supabase `leads` table
   - Create one campaign via `/campaigns/new` for that category
   - Manually POST `/api/send` with a small `batchSize` (like 2) and confirm: email arrives, SMS arrives, `outreach_log` row appears, unsubscribe link works, STOP reply gets added to `do_not_contact`
   - Only after that works end-to-end, deploy to Vercel and let `vercel.json`'s cron take over

8. **Deploy**
   - Push to GitHub, import into Vercel
   - Add all `.env.local` vars as Vercel environment variables
   - Confirm the cron job appears in Vercel's Cron tab

## Non-negotiables — do not weaken these
- Never send without checking `do_not_contact` first, no exceptions
- Every email needs a working unsubscribe link
- Rate-limit sends — never blast a whole batch instantly (current: 1 per 4 sec)
- Every lead only ever gets messaged once, ever, across all categories (`outreach_log` check in `sendEngine.ts` enforces this — don't remove it)
- SMS templates must include a STOP opt-out instruction (enforced in campaign validation — don't remove it)
- Email footer must include business name, ABN/physical address, and unsubscribe link — this is an Australian Spam Act legal requirement, not a nice-to-have

## If something in the existing code is wrong or incomplete
Fix it in place, but keep the same architecture (Next.js API routes + Supabase + Resend + Twilio + Vercel Cron) unless you hit a hard blocker — tell Todd immediately if so, don't quietly switch stacks.
