-- =============================================================================
-- INTAKE_DATA_MIGRATION.sql  (v2 — single backward-compatible function)
-- ██ TARGET PROJECT — ozvyf (progro-app) ONLY. ██  (website_leads lives here)
-- Safe to re-run.
--
-- Adds structured intake to the SHARED lead contract without a second table:
--   website_leads.phone         text
--   website_leads.intake_data   jsonb   — divisions, features, tools, roles, etc.
--   website_leads.intake_version int
--
-- CRITICAL (ChatGPT blocker #1): we do NOT create a second overload. Leaving
-- both a 9-arg and an 11-arg function (both with defaults) makes a 9-arg call
-- AMBIGUOUS to PostgREST — the existing contact form would break intermittently.
-- Instead we DROP the old signature and CREATE ONE function whose new params
-- are optional, so old 9-arg callers AND new callers both resolve to it.
-- =============================================================================

BEGIN;

ALTER TABLE public.website_leads ADD COLUMN IF NOT EXISTS phone          text;
ALTER TABLE public.website_leads ADD COLUMN IF NOT EXISTS intake_data    jsonb;
ALTER TABLE public.website_leads ADD COLUMN IF NOT EXISTS intake_version int;

-- Drop the OLD 9-arg signature explicitly so no ambiguous pair can exist.
DROP FUNCTION IF EXISTS public.submit_website_lead(text,text,text,text,text,text,text,text,text);

-- The ONE canonical function. Old callers passing 9 args still match
-- (params 10–11 default); new callers pass phone + intake_data.
CREATE OR REPLACE FUNCTION public.submit_website_lead(
  p_lead_type text,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_company text default '',
  p_team_size text default '',
  p_contractor_type text default '',
  p_message text default '',
  p_source_url text default '',
  p_phone text default '',
  p_intake_data jsonb default null
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  new_id uuid;
  clean_email text := lower(trim(p_email));
BEGIN
  IF p_lead_type NOT IN ('contact', 'demo', 'intake') THEN RAISE EXCEPTION 'invalid lead type'; END IF;
  IF length(trim(p_first_name)) < 1 OR length(trim(p_first_name)) > 80 THEN RAISE EXCEPTION 'invalid first name'; END IF;
  IF length(trim(p_last_name)) < 1 OR length(trim(p_last_name)) > 80 THEN RAISE EXCEPTION 'invalid last name'; END IF;
  IF clean_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' OR length(clean_email) > 254 THEN RAISE EXCEPTION 'invalid email'; END IF;
  -- intake carries its detail in JSON, so the message minimum is relaxed for it
  IF p_lead_type <> 'intake' AND (length(trim(p_message)) < 2 OR length(trim(p_message)) > 3000) THEN RAISE EXCEPTION 'invalid message'; END IF;
  IF length(coalesce(p_message,'')) > 5000 THEN RAISE EXCEPTION 'invalid message'; END IF;
  IF length(coalesce(p_company, '')) > 160 OR length(coalesce(p_source_url, '')) > 1000 THEN RAISE EXCEPTION 'invalid input'; END IF;
  IF length(coalesce(p_phone, '')) > 40 THEN RAISE EXCEPTION 'invalid phone'; END IF;

  -- blocker #5: validate + size-limit the JSON payload
  IF p_intake_data IS NOT NULL THEN
    IF jsonb_typeof(p_intake_data) <> 'object' THEN RAISE EXCEPTION 'invalid intake payload'; END IF;
    IF length(p_intake_data::text) > 20000 THEN RAISE EXCEPTION 'intake payload too large'; END IF;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.website_leads
    WHERE email = clean_email AND created_at > now() - interval '5 minutes'
  ) THEN RAISE EXCEPTION 'please wait before submitting again'; END IF;

  INSERT INTO public.website_leads
    (lead_type, first_name, last_name, email, company, team_size, contractor_type, message, source_url, phone, intake_data, intake_version)
  VALUES
    (p_lead_type, trim(p_first_name), trim(p_last_name), clean_email,
     nullif(trim(p_company),''), nullif(trim(p_team_size),''), nullif(trim(p_contractor_type),''),
     nullif(trim(p_message),''), nullif(trim(p_source_url),''), nullif(trim(p_phone),''),
     p_intake_data, CASE WHEN p_intake_data IS NULL THEN NULL ELSE 1 END)
  RETURNING id INTO new_id;
  RETURN new_id;
END; $$;

REVOKE ALL ON FUNCTION public.submit_website_lead(text,text,text,text,text,text,text,text,text,text,jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.submit_website_lead(text,text,text,text,text,text,text,text,text,text,jsonb) TO anon, authenticated;

COMMIT;


-- Verify (both call shapes must work):
-- SELECT public.submit_website_lead('contact','A','B','t1@x.com','Co','','','hello there','');   -- 9-arg legacy
-- SELECT public.submit_website_lead('intake','A','B','t2@x.com','Co','','','intake','','5045551212','{"divisions":["Commercial"]}'::jsonb);
