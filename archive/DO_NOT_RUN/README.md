# DO NOT RUN

`WEBSITE_LEADS_MIGRATION.sql` is the ORIGINAL migration that created
`website_leads` and the first version of `submit_website_lead`. It is kept
for history only.

**The deployment migration is `INTAKE_DATA_MIGRATION.sql` in the project root.**
That file is idempotent and transactional; it extends the existing schema and
supersedes this one. Running this older file could revert the canonical
function. Do not run it.
