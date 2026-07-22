-- Run once in the PROGRO production Supabase project (ozvyfpmlhmacsydadcks).
-- Public visitors may submit through the validated RPC, but they can never read lead records.

create table if not exists public.website_leads (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null check (lead_type in ('contact', 'demo')),
  first_name text not null,
  last_name text not null,
  email text not null,
  company text,
  team_size text,
  contractor_type text,
  message text not null,
  source_url text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'qualified', 'closed', 'spam')),
  created_at timestamptz not null default now()
);

alter table public.website_leads enable row level security;
revoke all on public.website_leads from anon, authenticated;

create or replace function public.submit_website_lead(
  p_lead_type text,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_company text default '',
  p_team_size text default '',
  p_contractor_type text default '',
  p_message text default '',
  p_source_url text default ''
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
  clean_email text := lower(trim(p_email));
begin
  if p_lead_type not in ('contact', 'demo') then raise exception 'invalid lead type'; end if;
  if length(trim(p_first_name)) < 1 or length(trim(p_first_name)) > 80 then raise exception 'invalid first name'; end if;
  if length(trim(p_last_name)) < 1 or length(trim(p_last_name)) > 80 then raise exception 'invalid last name'; end if;
  if clean_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' or length(clean_email) > 254 then raise exception 'invalid email'; end if;
  if length(trim(p_message)) < 2 or length(trim(p_message)) > 3000 then raise exception 'invalid message'; end if;
  if length(coalesce(p_company, '')) > 160 or length(coalesce(p_source_url, '')) > 1000 then raise exception 'invalid input'; end if;

  if exists (
    select 1 from public.website_leads
    where email = clean_email and created_at > now() - interval '5 minutes'
  ) then raise exception 'please wait before submitting again'; end if;

  insert into public.website_leads (lead_type, first_name, last_name, email, company, team_size, contractor_type, message, source_url)
  values (p_lead_type, trim(p_first_name), trim(p_last_name), clean_email, nullif(trim(p_company), ''), nullif(trim(p_team_size), ''), nullif(trim(p_contractor_type), ''), trim(p_message), nullif(trim(p_source_url), ''))
  returning id into new_id;
  return new_id;
end;
$$;

revoke all on function public.submit_website_lead(text,text,text,text,text,text,text,text,text) from public;
grant execute on function public.submit_website_lead(text,text,text,text,text,text,text,text,text) to anon, authenticated;

create index if not exists website_leads_created_at_idx on public.website_leads (created_at desc);
create index if not exists website_leads_status_idx on public.website_leads (status, created_at desc);
