-- LaunchRise Digital — Supabase Schema
-- Run this in your Supabase SQL editor

create table if not exists quote_requests (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  business_name text,
  project_type text not null,
  idea_description text not null,
  features_wanted text not null,
  needs_logins text default 'unsure',
  needs_payments text default 'unsure',
  needs_ai text default 'unsure',
  similar_examples text,
  budget_range text not null,
  ideal_timeline text not null,
  anything_else text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table quote_requests enable row level security;

-- Allow anyone to INSERT (for the quote form)
create policy "Allow public insert" on quote_requests
  for insert to anon with check (true);

-- Only authenticated users (you) can read leads
create policy "Allow auth read" on quote_requests
  for select to authenticated using (true);
