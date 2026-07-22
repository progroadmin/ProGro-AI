"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Public client intake worksheet. Submits through the SHARED
// submit_website_lead contract (lead_type 'intake') with the full
// checklist packed into intake_data jsonb. No second table, no
// competing function. The pipeline thread consumes the same record.
// The self-guided demo link is always instant — this never replaces
// it with a "we'll contact you" flow.

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
const DEMO_URL = "https://demo.progro.ai/?explore=1";
const APP_URL = "https://app.progro.ai";

type Tri = "yes" | "no" | "";

export default function IntakeWorksheet() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [divisions, setDivisions] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [tools, setTools] = useState({ quickbooks: "" as Tri, connecteam: "" as Tri, twilio: "" as Tri });
  const [roles, setRoles] = useState<string[]>([]);
  const [setupNeeds, setSetupNeeds] = useState<string[]>([]);
  const [future, setFuture] = useState<string[]>([]);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot

    setState("sending");
    setError("");

    const intake_data = {
      divisions,
      divisions_other: String(data.get("divisions_other") || ""),
      features_wanted: features,
      current_tools: {
        has_quickbooks: tools.quickbooks || null,
        has_connecteam: tools.connecteam || null,
        has_twilio: tools.twilio || null,
        other: String(data.get("tools_other") || ""),
      },
      users: {
        office: String(data.get("office_users") || ""),
        field: String(data.get("field_users") || ""),
        active_jobs: String(data.get("active_jobs") || ""),
      },
      approval_roles: roles,
      setup_needs: setupNeeds,
      future_interests: future,
      reporting_needs: String(data.get("reporting_needs") || ""),
      pain_points: String(data.get("pain_points") || ""),
      go_live: String(data.get("go_live") || ""),
      budget_notes: String(data.get("budget_notes") || ""),
    };

    const supabase = createClient();
    const { error: submitError } = await supabase.rpc("submit_website_lead", {
      p_lead_type: "intake",
      p_first_name: String(data.get("first_name") || ""),
      p_last_name: String(data.get("last_name") || ""),
      p_email: String(data.get("email") || ""),
      p_company: String(data.get("company") || ""),
      p_phone: String(data.get("phone") || ""),
      p_message: "Client intake worksheet submission",
      p_source_url: window.location.href,
      p_intake_data: intake_data,
    });

    if (submitError) {
      setState("error");
      setError("We couldn’t submit the worksheet. Please email admin@progro.ai and we’ll help you directly.");
      return;
    }
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Thank you — we’ve got your requirements.</h2>
        <p className="mt-3 text-slate-600">We’ll review what you need and prepare a tailored recommendation. In the meantime:</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={DEMO_URL} className="button-primary">Explore the Demo Now</a>
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
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <h3 className="text-lg font-semibold text-slate-900">About your company</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input name="first_name" required placeholder="First name" className="intake-input" />
          <input name="last_name" required placeholder="Last name" className="intake-input" />
          <input name="email" type="email" required placeholder="Work email" className="intake-input" />
          <input name="phone" placeholder="Phone" className="intake-input" />
          <input name="company" required placeholder="Company name" className="intake-input sm:col-span-2" />
        </div>
      </div>

      <div>
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
        <input name="divisions_other" placeholder="Other / specialty divisions" className="intake-input mt-3" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">What do you need it to do?</h3>
        <p className="text-sm text-slate-500">Pick the capabilities that matter to you.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <button type="button" key={f.key} onClick={() => toggle(features, f.key, setFeatures)}
              className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${features.includes(f.key) ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {features.includes(f.key) ? "✓ " : ""}{f.label}
            </button>
          ))}
        </div>
      </div>

      <div>
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
          <input name="tools_other" placeholder="Other software you use" className="intake-input" />
        </div>
      </div>

      <div>
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

      <div>
        <h3 className="text-lg font-semibold text-slate-900">What help do you want getting set up?</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {SETUP_NEEDS.map((f) => (
            <button type="button" key={f.key} onClick={() => toggle(setupNeeds, f.key, setSetupNeeds)}
              className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${setupNeeds.includes(f.key) ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {setupNeeds.includes(f.key) ? "\u2713 " : ""}{f.label}
            </button>
          ))}
        </div>
        <input name="reporting_needs" placeholder="Any specific reports you rely on today?" className="intake-input mt-3 w-full" />
      </div>

      <div>
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

      <div>
        <h3 className="text-lg font-semibold text-slate-900">Scale & goals</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <input name="office_users" placeholder="Office / mgmt users" className="intake-input" />
          <input name="field_users" placeholder="Field / crew users" className="intake-input" />
          <input name="active_jobs" placeholder="Active jobs (typical)" className="intake-input" />
        </div>
        <textarea name="pain_points" rows={3} placeholder="What slows you down or gets entered twice today?" className="intake-input mt-4 w-full" />
        <input name="go_live" placeholder="Ideal go-live timeframe" className="intake-input mt-4" />
        <input name="budget_notes" placeholder="Budget range or constraints (optional)" className="intake-input mt-4 w-full" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="button-primary" disabled={state === "sending"}>
          {state === "sending" ? "Submitting…" : "Send my requirements"}
        </button>
        <a href={DEMO_URL} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          or explore the demo now →
        </a>
      </div>
      <p className="text-xs leading-5 text-slate-500">
        By submitting, you agree that ProGro may contact you about your request. See our <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
