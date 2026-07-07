# LaunchRise Lead Engine

Automated AU lead sourcing (Google Places API) → personalised email/SMS outreach (Resend + Twilio) → reply tracking → dashboard.

See `CLAUDE_CODE_INSTRUCTIONS.md` (one level up) for the full setup/build-order checklist — paste it straight into Claude Code.

Quick start:
```
npm install
cp .env.example .env.local   # fill in real keys
npm run dev
```

Core flow: `/api/leads/source` (pull leads) → `/campaigns/new` (create template) → `/api/send` (manual test send) → `vercel.json` cron (`/api/cron/send`) once verified.
