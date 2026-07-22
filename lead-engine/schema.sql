-- LaunchRise Lead Engine — Supabase Schema
-- Run this in your Supabase SQL editor (after schema.sql).

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  category text,
  phone text,
  email text,
  website text,
  address text,
  suburb text,
  state text,
  google_place_id text unique,
  has_website boolean default false,
  website_quality_score int default 0, -- 0=no site, 1=bad/outdated, 2=decent, 3=great (skip)
  lead_score int default 0,            -- computed priority, higher = message first
  status text default 'new',           -- new, queued, sent, replied, interested, not_interested, closed, dnc
  personalization_line text,           -- AI-generated, cached so it's not regenerated per touch
  review_snippet text,                 -- public review text used for personalization
  rating numeric,
  review_count int,
  enriched_at timestamptz,             -- when website scoring / email extraction ran
  created_at timestamptz default now()
);

create table if not exists outreach_log (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  channel text,          -- email or sms
  touch_number int,      -- 1, 2, 3 in the sequence
  template_used text,
  sent_at timestamptz default now(),
  opened boolean default false,
  bounced boolean default false,
  replied boolean default false,
  provider_message_id text
);

-- A lead can never receive the same touch on the same channel twice.
create unique index if not exists outreach_log_touch_once
  on outreach_log (lead_id, touch_number, channel);

create table if not exists do_not_contact (
  id uuid primary key default gen_random_uuid(),
  phone text,
  email text,
  reason text, -- unsubscribed, complained, bounced_hard, manual
  created_at timestamptz default now()
);

create unique index if not exists dnc_email_unique on do_not_contact (email) where email is not null;
create unique index if not exists dnc_phone_unique on do_not_contact (phone) where phone is not null;

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  category text,
  active boolean default true,
  touch_1_sms text, touch_1_email_subject text, touch_1_email_body text,
  touch_2_sms text, touch_2_email_subject text, touch_2_email_body text,
  touch_3_sms text, touch_3_email_subject text, touch_3_email_body text,
  demo_site_url text,
  price_point text default '$499',
  created_at timestamptz default now()
);

create table if not exists replies (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  channel text,        -- email or sms
  raw_message text,
  classification text, -- interested, question, not_interested, angry, unclear
  ai_draft_response text,
  handled boolean default false,
  created_at timestamptz default now()
);

-- Singleton settings row: kill switch + warm-up ramp.
create table if not exists send_settings (
  id int primary key default 1 check (id = 1),
  sending_paused boolean default true,   -- starts paused; flip in dashboard when ready
  warmup_started_at timestamptz,         -- set automatically on the first live send
  week1_cap int default 20,
  week2_cap int default 50,
  max_daily_cap int default 100,
  send_window_start int default 9,       -- AEST hour, inclusive
  send_window_end int default 17,        -- AEST hour, exclusive
  weekdays_only boolean default true,
  touch_2_delay_days int default 4,
  touch_3_delay_days int default 9,      -- days after touch 1
  updated_at timestamptz default now()
);

insert into send_settings (id) values (1) on conflict (id) do nothing;

create index if not exists leads_status_idx on leads (status);
create index if not exists leads_category_idx on leads (category);
create index if not exists outreach_log_lead_idx on outreach_log (lead_id);
create index if not exists outreach_log_sent_at_idx on outreach_log (sent_at);
create index if not exists replies_handled_idx on replies (handled);

-- RLS: dashboard users (authenticated) get full access; anon gets nothing.
-- Server-side API routes use the service role key, which bypasses RLS.
alter table leads enable row level security;
alter table outreach_log enable row level security;
alter table do_not_contact enable row level security;
alter table campaigns enable row level security;
alter table replies enable row level security;
alter table send_settings enable row level security;

create policy "auth all" on leads for all to authenticated using (true) with check (true);
create policy "auth all" on outreach_log for all to authenticated using (true) with check (true);
create policy "auth all" on do_not_contact for all to authenticated using (true) with check (true);
create policy "auth all" on campaigns for all to authenticated using (true) with check (true);
create policy "auth all" on replies for all to authenticated using (true) with check (true);
create policy "auth all" on send_settings for all to authenticated using (true) with check (true);
