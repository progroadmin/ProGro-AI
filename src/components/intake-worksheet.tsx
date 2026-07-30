"use client";

// ============================================================
// T3 — INTAKE WORKSHEET   [REV 5]
//
// CUTOVER, NOT ADDITION. The old submit_website_lead call into ozvyf is
// REMOVED in this same file, per the frozen decision in T3 REV 4 §0. A
// commit that adds this path without removing that one is dual-write by
// accident, and dual-write was rejected because two independently
// mutable lead records have no reliable winner when one write succeeds
// and the other fails.
//
// WHAT CHANGED, AND WHY
//
// 1. EMAIL IS FIRST. lead.leads requires email_raw and email_normalized,
//    and normalized email IS the identity key. A visitor who typed a
//    name and left used to leave nothing at all — that is the failure
//    this entire workstream exists to fix.
//
// 2. create FIRES ON BLUR, not per keystroke. john@abc.co is briefly
//    valid on the way to john@abc.com, and firing early would leave an
//    unreachable orphan lead behind every typo.
//
// 3. EACH SECTION SAVES ON BLUR as a FULL SNAPSHOT with a monotonic
//    seq. Not a patch: a patch cannot express "cleared on purpose".
//
// 4. SUBMIT WALKS next(1)..next(8). T2 requires step === current_step
//    and advances exactly one, so completion cannot be reached by
//    jumping. Consent is written once, on the final transition.
//
// 5. SUCCESS COPY no longer promises a trial workspace. Provisioning is
//    deferred out of T2 and nothing sends that email yet.
//
// CHANGES FROM REV 4 — presentation only, no intake behaviour.
//
// The success screen no longer renders its own heading and message. The
// page shell above it owns the submitted state now, so the h1 and intro
// swap together with the form instead of the page still inviting a
// visitor to fill in something that is no longer there — and the
// follow-up promise is stated once rather than twice on one screen.
// This component reports success via onSubmitted and renders only the
// onward action.
//
// CHANGES FROM REV 3 — one blocker, one correction.
//
// A. A FAILED resume() RE-OPENED THE OVERWRITE PATH. REV 3 swallowed
//    every resume error and cleared `hydrating` in a finally, so a 429,
//    a dropped connection or a 500 produced exactly the state it was
//    written to prevent: a VALID TOKEN, an EMPTY FORM, and an ENABLED
//    submit button — whose next() calls would write those empty
//    snapshots over sections the visitor had already filled.
//    "resume succeeded and there was nothing saved" and "resume failed
//    so what is saved is UNKNOWN" are now different states. The second
//    is fail-closed: submission stays disabled and the visitor is
//    offered a retry.
//
// B. DEDUPE FINGERPRINTS COULD NOT MATCH. Hydrated payloads come back
//    from jsonb, whose key order need not match the client snapshot's
//    insertion order, so an untouched section stringified differently
//    and re-saved on its first blur. Both sides now go through one
//    key-sorted serializer.
//
// CHANGES FROM REV 2 — two blockers, one correction.
//
// A. AN IN-FLIGHT create COULD INSTALL A TOKEN FOR AN OBSOLETE EMAIL.
//    The shared promise made a second caller WAIT, but never proved the
//    request it waited on was for the CURRENT address. Blur old@,
//    change to new@, submit: the old create finished, installed its
//    token, and the worksheet then wrote new@'s answers onto old@'s
//    lead. Now the in-flight request carries its email and a generation
//    counter, and a superseded result is discarded rather than adopted.
//
// B. REFRESH RECOVERED THE CREDENTIAL, NOT THE WORKSHEET. REV 2
//    restored the email and replayed create for a token, and stopped
//    there — the visitor saw a nearly empty form, and a later next
//    would have written those empty snapshots OVER six saved sections.
//    Recovery now calls resume() and hydrates every saved step back
//    into state, with the dedupe fingerprints seeded from what came
//    back so hydration does not immediately re-save it.
//
// C. Email comparison is normalized (trim + lowercase) to match
//    lead.normalize_email(). Case-only edits were starting a new
//    session and colliding with their own lead.
//
// CHANGES FROM REV 1 — four blockers, two corrections, none of which a
// green build would have caught.
//
// 1. SEQ RESET ON REFRESH. Module-memory counter went back to 0 while
//    progress.last_seq stayed at 3, so every save after a reload was
//    rejected as stale. Now persisted (see leadIntake). The submit loop
//    also CHECKS that each next actually advanced instead of assuming.
// 2. FAILED SAVES SUPPRESSED THEIR OWN RETRY. The dedupe fingerprint
//    was written BEFORE the request, so a failed save marked itself
//    saved and the next blur skipped it. Written on success only.
// 3. SUBMIT RACED AN IN-FLIGHT create. A boolean prevents duplicates
//    but does not let a second caller WAIT. Blur and submit now share
//    one promise.
// 4. HONEYPOT WAS HANDLED IN THE BROWSER, so T2 never saw the bot — no
//    Bucket A consumption, no blocked row, no limit. It is now sent and
//    the server decides, which is what moving it inside the admitted
//    paths was for.
// 5. onBlur BUBBLES, so "section blur" fired moving between every field
//    in the section. Focus moves that stay inside are now ignored.
// 6. EMAIL COULD DIVERGE FROM THE LEAD. Changing it after creation left
//    the lead keyed to the original address while the form showed
//    another. Changing it now starts a fresh intake session.
//
// ⚠ BUCKET B — FLAGGED FOR REVIEW, NOT RESOLVED. T2 allows 30
// authenticated actions per lead per hour, counting save, next and
// resume alike. This design can approach that: eight section saves,
// eight next calls, plus re-saves on backtracking. Saves are therefore
// deduped (identical snapshot = no call) and fire on section blur
// rather than per keystroke. If real sessions still bump the ceiling,
// the number is the thing to change, not the save discipline.
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { captureFirstTouch } from "@/lib/attribution";
import {
  createLead, saveStep, nextStep, resume, recallEmail, resetIntakeSession,
  IntakeError,
} from "@/lib/leadIntake";

const DIVISIONS = ["Commercial", "Residential", "Government / Municipal", "Electrical", "Plumbing", "Roofing", "HVAC", "Concrete / Masonry", "Framing / Carpentry", "Painting / Finishes", "Flooring", "Drywall", "Site / Landscaping", "Demolition", "Excavation", "Mechanical", "Specialty"];

const FEATURES = [
  { key: "projects", label: "Project & job management" },
  { key: "bidding", label: "Bidding, quotes & SOWs" },
  { key: "invoicing", label: "Invoices & change orders" },
  { key: "field", label: "Field crew & time tracking" },
  { key: "jobcost", label: "Job costing & financial visibility" },
  { key: "docs", label: "Documents & photos" },
  { key: "equipment", label: "Equipment & vehicles" },
  { key: "phone", label: "Phone & voicemail in-app" },
  { key: "ai", label: "AI-assisted SOWs & analysis" },
];

const ROLES = ["Owner / principal", "Office / admin", "Project managers", "Estimators", "Foremen / field leads", "Crew / field workers", "Subcontractors", "Accountant / bookkeeper"];

const SETUP_NEEDS = [
  { key: "implementation", label: "Hands-on implementation & configuration" },
  { key: "training", label: "Team training" },
  { key: "migration", label: "Import our existing data (clients, projects, pricing)" },
  { key: "templates", label: "Custom document templates & branding" },
  { key: "integrations", label: "Connect our other tools (QuickBooks, etc.)" },
];

const FUTURE = [
  { key: "estimating", label: "AI estimating" },
  { key: "takeoff", label: "AI blueprint takeoff" },
  { key: "api", label: "Two-way integrations (QuickBooks, calendar)" },
  { key: "sub_network", label: "Linking with our subs / GCs on the platform" },
];

const BOOKING_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "";
const LAST_STEP = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors lead.normalize_email(): lower(btrim(...)) and nothing more.
// Dots and +tags survive, deliberately — stripping them would merge
// addresses belonging to different people.
const norm = (s: string) => s.trim().toLowerCase();

// ONE serializer for both sides of the dedupe comparison. jsonb does not
// preserve the client's key insertion order, so a hydrated section and
// the snapshot rebuilt from it can hold identical values and stringify
// differently. Sorting makes the comparison about content only.
function canon(v: unknown): string {
  if (v === null || typeof v !== "object") return JSON.stringify(v) ?? "null";
  if (Array.isArray(v)) return "[" + v.map(canon).join(",") + "]";
  const o = v as Record<string, unknown>;
  return "{" + Object.keys(o).sort()
    .map((k) => JSON.stringify(k) + ":" + canon(o[k])).join(",") + "}";
}

type Tri = "yes" | "no" | "";

export default function IntakeWorksheet(
  { onSubmitted }: { onSubmitted?: () => void } = {},
) {
  // restoring / restore_error are distinct states on purpose: an
  // unknown server-side draft must never be submittable.
  const [state, setState] = useState<
    "idle" | "restoring" | "restore_error" | "sending" | "sent" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 1
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  // Steps 2-8
  const [divisions, setDivisions] = useState<string[]>([]);
  const [divisionsOther, setDivisionsOther] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [tools, setTools] = useState({ quickbooks: "" as Tri, connecteam: "" as Tri, twilio: "" as Tri });
  const [toolsOther, setToolsOther] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [setupNeeds, setSetupNeeds] = useState<string[]>([]);
  const [reportingNeeds, setReportingNeeds] = useState("");
  const [future, setFuture] = useState<string[]>([]);
  const [officeUsers, setOfficeUsers] = useState("");
  const [fieldUsers, setFieldUsers] = useState("");
  const [activeJobs, setActiveJobs] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [goLive, setGoLive] = useState("");
  const [budgetNotes, setBudgetNotes] = useState("");

  // The token lives in a ref, in memory only. Never in localStorage or
  // sessionStorage: a stolen bearer token is usable until it expires,
  // and hashing it server-side does nothing about that. Recovery after
  // a refresh comes from replaying create with the stored idempotency
  // key, which is not a credential.
  const token = useRef<string | null>(null);
  // A SHARED PROMISE, not a boolean. A boolean tells a second caller
  // "busy" and nothing else; submit then saw a null token and reported
  // a failure while the create it was racing succeeded moments later.
  // Carries the email it is FOR, so a result cannot be adopted for a
  // different address than the one requested.
  const createInFlight = useRef<{ email: string; promise: Promise<void> } | null>(null);
  const createGen = useRef(0);
  const lastSaved = useRef<Record<number, string>>({});
  // The address the CURRENT lead is keyed to, so a later edit can be
  // detected rather than silently ignored.
  const leadEmail = useRef<string>("");
  const honeypot = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    captureFirstTouch();
    const prior = recallEmail();
    if (!prior) return;

    // FULL RECOVERY, not just the credential. Replay create for the
    // token, then resume() and hydrate the saved sections. Costs one
    // Bucket A attempt per page load, which is the price of a visitor
    // who refreshes not losing their answers.
    setEmail(prior);
    void recover(prior);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function recover(prior: string) {
    setState("restoring"); setError("");
    try {
      await ensureLead(prior);
    } catch { /* handled below by the token check */ }

    if (!token.current) {
      // No token: nothing was recovered, and nothing can be overwritten
      // either. A normal blank start is safe.
      setState("idle");
      return;
    }

    // FAIL CLOSED. A token without a known draft is the dangerous
    // combination — submitting would write empty snapshots over saved
    // sections.
    const restored = await hydrateFrom(token.current);
    if (!restored) {
      setState("restore_error");
      setError("We couldn't restore your saved answers. Submitting now could overwrite them.");
      return;
    }
    setState("idle");
  }

  // true = the server's draft state is KNOWN (even if empty).
  // false = unknown, and the form must not be submittable.
  async function hydrateFrom(t: string): Promise<boolean> {
    let saved: Record<string, Record<string, unknown>>;
    try {
      const r = await resume(t) as { saved_payloads?: Record<string, Record<string, unknown>> };
      saved = r.saved_payloads ?? {};
    } catch { return false; }

    const str = (v: unknown) => (typeof v === "string" ? v : "");
    const arr = (v: unknown) => (Array.isArray(v) ? v as string[] : []);

    for (const [k, p] of Object.entries(saved)) {
      if (!p) continue;
      switch (Number(k)) {
        case 1:
          setFirstName(str(p.first_name)); setLastName(str(p.last_name));
          setPhone(str(p.phone)); setCompany(str(p.company));
          if (str(p.email)) setEmail(str(p.email));
          break;
        case 2: setDivisions(arr(p.divisions)); setDivisionsOther(str(p.divisions_other)); break;
        case 3: setFeatures(arr(p.features_wanted)); break;
        case 4: {
          const t4 = (p.current_tools ?? {}) as Record<string, unknown>;
          setTools({
            quickbooks: (str(t4.has_quickbooks) || "") as Tri,
            connecteam: (str(t4.has_connecteam) || "") as Tri,
            twilio: (str(t4.has_twilio) || "") as Tri,
          });
          setToolsOther(str(t4.other));
          break;
        }
        case 5: setRoles(arr(p.approval_roles)); break;
        case 6: setSetupNeeds(arr(p.setup_needs)); setReportingNeeds(str(p.reporting_needs)); break;
        case 7: setFuture(arr(p.future_interests)); break;
        case 8: {
          const u = (p.users ?? {}) as Record<string, unknown>;
          setOfficeUsers(str(u.office)); setFieldUsers(str(u.field));
          setActiveJobs(str(u.active_jobs));
          setPainPoints(str(p.pain_points)); setGoLive(str(p.go_live));
          setBudgetNotes(str(p.budget_notes));
          break;
        }
      }
      // Seed the dedupe fingerprint from what the server returned, so
      // hydration does not immediately re-save everything it just read.
      lastSaved.current[Number(k)] = canon(p);
    }
    return true;
  }

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  // ---------- per-step snapshots ----------
  const snapshot = useCallback((step: number): Record<string, unknown> => {
    switch (step) {
      case 1: return { email, first_name: firstName, last_name: lastName, phone, company };
      case 2: return { divisions, divisions_other: divisionsOther };
      case 3: return { features_wanted: features };
      case 4: return { current_tools: {
        has_quickbooks: tools.quickbooks || null,
        has_connecteam: tools.connecteam || null,
        has_twilio: tools.twilio || null,
        other: toolsOther } };
      case 5: return { approval_roles: roles };
      case 6: return { setup_needs: setupNeeds, reporting_needs: reportingNeeds };
      case 7: return { future_interests: future };
      case 8: return { users: { office: officeUsers, field: fieldUsers, active_jobs: activeJobs },
        pain_points: painPoints, go_live: goLive, budget_notes: budgetNotes };
      default: return {};
    }
  }, [email, firstName, lastName, phone, company, divisions, divisionsOther,
      features, tools, toolsOther, roles, setupNeeds, reportingNeeds, future,
      officeUsers, fieldUsers, activeJobs, painPoints, goLive, budgetNotes]);

  // ---------- create, on a settled email ----------
  //
  // Returns a promise every caller can await, so submit does not have to
  // guess whether a blur-triggered create finished.
  const ensureLead = useCallback(async (raw: string): Promise<void> => {
    const v = raw.trim();
    if (!EMAIL_RE.test(v)) return;
    const key = norm(v);

    // EMAIL CHANGED AFTER CREATION. The normalized address IS the
    // identity, so a different address is a different lead. Reusing the
    // old idempotency key would replay the OLD lead and leave the form
    // showing one address while the record held another. Compared
    // NORMALIZED, so a case-only edit is not a change at all.
    if (token.current && leadEmail.current && key !== leadEmail.current) {
      token.current = null;
      leadEmail.current = "";
      lastSaved.current = {};
      resetIntakeSession();
    }
    if (token.current) return;

    // An in-flight request for a DIFFERENT address must not be adopted.
    // Waiting on it is fine; inheriting its token is not.
    if (createInFlight.current) {
      if (createInFlight.current.email === key) return createInFlight.current.promise;
      await createInFlight.current.promise.catch(() => {});
      if (token.current && leadEmail.current !== key) {
        token.current = null;
        leadEmail.current = "";
        lastSaved.current = {};
        resetIntakeSession();
      }
      if (token.current) return;
    }

    const gen = ++createGen.current;
    const promise = (async () => {
      await runCreate(v, gen, key);
    })().finally(() => {
      if (createInFlight.current?.email === key) createInFlight.current = null;
    });
    createInFlight.current = { email: key, promise };
    return promise;
  }, []);

  async function runCreate(v: string, gen: number, key: string) {
    setEmailError("");
    try {
      const r = await createLead(v, honeypot.current?.value ?? "");
      // SUPERSEDED? Discard. The visitor edited the address while this
      // was in flight, and adopting it would key the lead to an address
      // the form no longer shows.
      if (gen !== createGen.current) return;
      token.current = r.token;
      leadEmail.current = key;
    } catch (e) {
      if (e instanceof IntakeError && e.code === "invalid_email") {
        // Deliberately indistinguishable from an address already held by
        // a live lead. The server must not reveal which.
        setEmailError("Please check this email address and try again.");
      } else if (e instanceof IntakeError && e.status === 429) {
        setEmailError("Too many attempts just now. Please try again shortly.");
      }
      // Any other failure stays silent: the visitor is still typing and
      // a scary message here costs more than a retry on the next blur.
    }
  }

  // ---------- save a section, deduped ----------
  const saveSection = useCallback(async (step: number) => {
    if (!token.current) return;
    const payload = snapshot(step);
    const fingerprint = canon(payload);
    if (lastSaved.current[step] === fingerprint) return;   // nothing changed
    try {
      await saveStep(token.current, step, payload, honeypot.current?.value ?? "");
      // ONLY ON SUCCESS. REV 1 recorded the fingerprint first, so a
      // failed save marked itself saved and the next blur deduped the
      // retry away — the comment claimed recovery that could not happen.
      lastSaved.current[step] = fingerprint;
    } catch {
      // Fingerprint untouched, so the next blur retries.
    }
  }, [snapshot]);

  // onBlur BUBBLES. Without this guard, moving from email to first name
  // counts as leaving the section and fires a save — many times the
  // Bucket B traffic the design claims.
  const sectionBlur = (step: number) => (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) return;
    void saveSection(step);
  };

  // ---------- submit ----------
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Belt and braces: the button is disabled in these states, but a
    // stray programmatic submit must not slip past.
    if (state === "restoring" || state === "restore_error") return;
    setState("sending"); setError("");

    // NO CLIENT-SIDE HONEYPOT SHORT-CIRCUIT. The value rides along with
    // the requests and T2 refuses it after admission, so the attempt is
    // counted instead of invisible.
    const hp = honeypot.current?.value ?? "";

    // AWAIT the in-flight create rather than testing a flag. A visitor
    // who blurs the email and immediately clicks submit used to get a
    // false "couldn't start" while that very create was succeeding.
    await ensureLead(email);
    if (!token.current) {
      setState("error");
      setError("We couldn't start your intake. Please check your email address.");
      return;
    }

    try {
      // ONE STEP AT A TIME. T2 requires step === current_step and
      // advances exactly one, so completion cannot be jumped to.
      for (let step = 1; step <= LAST_STEP; step++) {
        const r = await nextStep(token.current, step, snapshot(step), hp);
        // VERIFY IT ADVANCED. A stale seq returns applied:false and the
        // step does not move; continuing would hammer a step that never
        // progresses and end without ever completing.
        if (r.applied === false || r.step <= step) {
          throw new IntakeError(409, "did_not_advance");
        }
      }
      setState("sent");
      onSubmitted?.();
    } catch (err) {
      setState("error");
      if (err instanceof IntakeError && err.code === "did_not_advance") {
        setError("Your session got out of sync. Please refresh the page and submit again.");
      } else if (err instanceof IntakeError && err.status === 400) {
        setError("Some required details are missing. Please check the first section and try again.");
      } else if (err instanceof IntakeError && err.status === 429) {
        setError("Too many requests just now. Please wait a moment and try again.");
      } else {
        setError("We couldn't submit the worksheet. Please email admin@progro.ai and we'll help you directly.");
      }
    }
  }

  if (state === "sent") {
    // Heading and message live in the page shell, which swaps them when
    // onSubmitted fires. Only the onward action belongs here.
    return (
      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 text-center">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {BOOKING_URL ? (
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="button-secondary">Book a Time to Talk</a>
          ) : (
            <a href="/" className="button-secondary">Return to ProGro.ai</a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8 rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:p-8">
      <input ref={honeypot} type="text" name="website" tabIndex={-1}
        autoComplete="off" className="hidden" aria-hidden="true" />

      <div onBlur={sectionBlur(1)}>
        <h3 className="text-lg font-semibold text-slate-900">About your company</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* EMAIL FIRST. It is the identity key, and create fires the
              moment it settles — everything after this point is
              recoverable even if the visitor closes the tab. */}
          <input name="email" type="email" required placeholder="Work email"
            className="intake-input sm:col-span-2" value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => { void ensureLead(email); }} />
          {emailError && <p className="text-sm text-red-600 sm:col-span-2">{emailError}</p>}
          <input name="first_name" required placeholder="First name" className="intake-input"
            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input name="last_name" required placeholder="Last name" className="intake-input"
            value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input name="phone" placeholder="Phone" className="intake-input"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input name="company" required placeholder="Company name" className="intake-input"
            value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      <div onBlur={sectionBlur(2)}>
        <h3 className="text-lg font-semibold text-slate-900">What divisions do you run?</h3>
        <p className="text-sm text-slate-500">Tap all that apply.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DIVISIONS.map((d) => (
            <button type="button" key={d} onClick={() => toggle(divisions, d, setDivisions)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${divisions.includes(d) ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {d}
            </button>
          ))}
        </div>
        <input name="divisions_other" placeholder="Other / specialty divisions" className="intake-input mt-3"
          value={divisionsOther} onChange={(e) => setDivisionsOther(e.target.value)} />
      </div>

      <div onBlur={sectionBlur(3)}>
        <h3 className="text-lg font-semibold text-slate-900">What do you need it to do?</h3>
        <p className="text-sm text-slate-500">Pick the capabilities that matter to you.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <button type="button" key={f.key} onClick={() => toggle(features, f.key, setFeatures)}
              className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${features.includes(f.key) ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {features.includes(f.key) ? "\u2713 " : ""}{f.label}
            </button>
          ))}
        </div>
      </div>

      <div onBlur={sectionBlur(4)}>
        <h3 className="text-lg font-semibold text-slate-900">What are you using today?</h3>
        <div className="mt-3 space-y-3">
          {([["quickbooks", "QuickBooks"], ["connecteam", "Connecteam / time clock"], ["twilio", "A business phone system"]] as const).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-700">{label}</span>
              <div className="flex overflow-hidden rounded-lg border border-slate-200">
                {(["yes", "no"] as const).map((v) => (
                  <button type="button" key={v} onClick={() => setTools((t) => ({ ...t, [key]: v }))}
                    className={`px-4 py-1.5 text-xs font-semibold ${tools[key] === v ? (v === "yes" ? "bg-emerald-600 text-white" : "bg-slate-400 text-white") : "bg-white text-slate-500"}`}>
                    {v === "yes" ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <input name="tools_other" placeholder="Other software you use" className="intake-input"
            value={toolsOther} onChange={(e) => setToolsOther(e.target.value)} />
        </div>
      </div>

      <div onBlur={sectionBlur(5)}>
        <h3 className="text-lg font-semibold text-slate-900">Who needs to approve things?</h3>
        <p className="text-sm text-slate-500">Roles in your company that review or sign off on work.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button type="button" key={r} onClick={() => toggle(roles, r, setRoles)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${roles.includes(r) ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div onBlur={sectionBlur(6)}>
        <h3 className="text-lg font-semibold text-slate-900">What help do you want getting set up?</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {SETUP_NEEDS.map((f) => (
            <button type="button" key={f.key} onClick={() => toggle(setupNeeds, f.key, setSetupNeeds)}
              className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${setupNeeds.includes(f.key) ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {setupNeeds.includes(f.key) ? "\u2713 " : ""}{f.label}
            </button>
          ))}
        </div>
        <input name="reporting_needs" placeholder="Any specific reports you rely on today?"
          className="intake-input mt-3 w-full" value={reportingNeeds}
          onChange={(e) => setReportingNeeds(e.target.value)} />
      </div>

      <div onBlur={sectionBlur(7)}>
        <h3 className="text-lg font-semibold text-slate-900">Interested in down the road?</h3>
        <p className="text-sm text-slate-500">No commitment — just tells us where you might grow.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {FUTURE.map((f) => (
            <button type="button" key={f.key} onClick={() => toggle(future, f.key, setFuture)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${future.includes(f.key) ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div onBlur={sectionBlur(8)}>
        <h3 className="text-lg font-semibold text-slate-900">Scale &amp; goals</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <input name="office_users" placeholder="Office / mgmt users" className="intake-input"
            value={officeUsers} onChange={(e) => setOfficeUsers(e.target.value)} />
          <input name="field_users" placeholder="Field / crew users" className="intake-input"
            value={fieldUsers} onChange={(e) => setFieldUsers(e.target.value)} />
          <input name="active_jobs" placeholder="Active jobs (typical)" className="intake-input"
            value={activeJobs} onChange={(e) => setActiveJobs(e.target.value)} />
        </div>
        <textarea name="pain_points" rows={3} placeholder="What slows you down or gets entered twice today?"
          className="intake-input mt-4 w-full" value={painPoints}
          onChange={(e) => setPainPoints(e.target.value)} />
        <input name="go_live" placeholder="Ideal go-live timeframe" className="intake-input mt-4"
          value={goLive} onChange={(e) => setGoLive(e.target.value)} />
        <input name="budget_notes" placeholder="Budget range or constraints (optional)"
          className="intake-input mt-4 w-full" value={budgetNotes}
          onChange={(e) => setBudgetNotes(e.target.value)} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {state === "restore_error" && (
        <button type="button" className="button-secondary"
          onClick={() => { void recover(email); }}>
          Try restoring again
        </button>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="button-primary"
          disabled={state === "sending" || state === "restoring" || state === "restore_error"}>
          {state === "restoring" ? "Restoring your answers…"
            : state === "sending" ? "Submitting…" : "Send my requirements"}
        </button>
      </div>
      <p className="text-xs leading-5 text-slate-500">
        By submitting, you agree that ProGro may contact you about your request. See our <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
