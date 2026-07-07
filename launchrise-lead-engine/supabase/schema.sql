-- LaunchRise Lead Engine schema
-- Run in Supabase SQL editor

create extension if not exists pgcrypto;

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
  status text default 'new', -- new, queued, sent, replied, interested, closed, dnc
  created_at timestamptz default now()
);

create index if not exists idx_leads_status on leads(status);
create index if not exists idx_leads_category on leads(category);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  category text,
  sms_template text,
  email_subject text,
  email_body text,
  demo_site_url text,
  price_point text default '$499',
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists outreach_log (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  channel text, -- email or sms
  template_used text,
  sent_at timestamptz default now(),
  opened boolean default false,
  replied boolean default false
);

create index if not exists idx_outreach_lead on outreach_log(lead_id);

create table if not exists do_not_contact (
  id uuid primary key default gen_random_uuid(),
  phone text,
  email text,
  reason text, -- unsubscribed, complained, manual, stop_sms
  created_at timestamptz default now()
);

create index if not exists idx_dnc_email on do_not_contact(email);
create index if not exists idx_dnc_phone on do_not_contact(phone);

-- Prevent messaging the same business across categories once contacted:
-- outreach_log + leads.status already covers this since sending engine checks
-- "has this lead_id ever been sent to" before sending again.
