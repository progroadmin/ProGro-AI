// ============================================================
// T3 — LEAD INTAKE CLIENT   [REV 2]
//
// The ONLY write path from the browser. Plain fetch to the T2 Edge
// Function — never supabase-js, which reaches Postgres through
// PostgREST, and `lead` is not an exposed schema.
//
// Requires NEXT_PUBLIC_LEAD_INTAKE_URL on the progro-ai Vercel project:
//   https://xjzfpdsbwvesslzlcmwt.supabase.co/functions/v1/lead-intake
// ============================================================

import { readFirstTouch } from "./attribution";

const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_INTAKE_URL ?? "";

// ------------------------------------------------------------
// WHAT IS PERSISTED, AND WHAT DELIBERATELY IS NOT
//
// NOT the bearer token. Hashing it in the database protects a dump or a
// log; it does nothing for a token stolen from browser storage, which
// stays usable until it expires. The token lives in React state only
// and dies with the page.
//
// PERSISTED: the idempotency key and the email. Neither is a
// credential. After a refresh, re-issuing `create` with the SAME key
// and the SAME body is a REPLAY — T2 derives and returns the SAME
// token. So the session recovers without ever having stored one.
//
// This is why create is idempotent at all: a lost response and a
// refreshed tab are the same problem.
// ------------------------------------------------------------
const IDEM_KEY = "progro_intake_idem";
const EMAIL_KEY = "progro_intake_email";

function idempotencyKey(): string {
  try {
    const existing = sessionStorage.getItem(IDEM_KEY);
    if (existing) return existing;
    const k = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "");
    sessionStorage.setItem(IDEM_KEY, k);
    return k;
  } catch {
    return crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "");
  }
}

export const rememberEmail = (e: string) => {
  try { sessionStorage.setItem(EMAIL_KEY, e); } catch { /* ignore */ }
};
export const recallEmail = (): string => {
  try { return sessionStorage.getItem(EMAIL_KEY) ?? ""; } catch { return ""; }
};

export type CreateResult = {
  token: string; step: number; expires_at: string;
  state: { completed: number[]; next_step: number };
};
export type SaveResult = {
  applied: boolean; completed?: boolean; step: number;
  expires_at: string; state: { completed: number[]; next_step: number };
};

export class IntakeError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}

async function post(body: unknown, headers: Record<string, string> = {}) {
  if (!ENDPOINT) throw new IntakeError(0, "not_configured");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new IntakeError(res.status, json?.error ?? "unknown");
  return json;
}

// create fires on a settled email — blur or debounce — never on every
// parseable keystroke. A typo'd address that is briefly valid would
// otherwise leave an unreachable orphan lead.
export async function createLead(
  email: string, website = "",
): Promise<CreateResult> {
  rememberEmail(email);
  // `website` is the honeypot, and it is SENT rather than handled in the
  // browser. REV 1 returned early on the client, so T2 never saw the
  // bot: no Bucket A consumption, no blocked risk row, no rate limit.
  // The server decides.
  return await post(
    { action: "create", email, website, attribution: readFirstTouch() },
    { "idempotency-key": idempotencyKey() },
  ) as CreateResult;
}

// FULL SNAPSHOT for the step, plus a monotonic seq. Never a patch: a
// patch cannot express "the visitor cleared this field on purpose".
//
// ⚠ THE SEQ MUST SURVIVE A REFRESH. REV 1 kept it in module memory, so
// a reload reset it to 0 while progress.last_seq stayed at 3 in
// Postgres — every subsequent save was rejected as stale, and the
// refresh recovery the token replay was built for still failed. It is
// now persisted, and only ever moves forward.
const SEQ_KEY = "progro_intake_seq";

export function nextSeq(): number {
  try {
    const n = Number(sessionStorage.getItem(SEQ_KEY) ?? "0") + 1;
    sessionStorage.setItem(SEQ_KEY, String(n));
    return n;
  } catch {
    // No sessionStorage: fall back to wall-clock ms, which is
    // monotonic enough for one page life and always exceeds a small
    // counter from an earlier one.
    return Date.now();
  }
}

// A NEW IDEMPOTENCY SESSION. Used when the visitor corrects their email
// after a lead already exists: the address is the identity key, so a
// different address is a different lead, and reusing the old key would
// replay the old one.
export function resetIntakeSession(): void {
  try {
    sessionStorage.removeItem(IDEM_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(SEQ_KEY);
  } catch { /* ignore */ }
}

export async function saveStep(
  token: string, step: number, payload: Record<string, unknown>, website = "",
): Promise<SaveResult> {
  return await post(
    { action: "save", step, seq: nextSeq(), payload, website },
    { authorization: `Bearer ${token}` },
  ) as SaveResult;
}

export async function nextStep(
  token: string, step: number, payload: Record<string, unknown>, website = "",
): Promise<SaveResult> {
  return await post(
    { action: "next", step, seq: nextSeq(), payload, website },
    { authorization: `Bearer ${token}` },
  ) as SaveResult;
}

export async function resume(token: string) {
  return await post({ action: "resume" }, { authorization: `Bearer ${token}` });
}
