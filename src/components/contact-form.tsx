"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ kind = "contact" }: { kind?: "contact" | "demo" }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;

    setState("sending");
    setError("");
    const supabase = createClient();
    const { error: submitError } = await supabase.rpc("submit_website_lead", {
      p_lead_type: kind,
      p_first_name: String(data.get("first_name") || ""),
      p_last_name: String(data.get("last_name") || ""),
      p_email: String(data.get("email") || ""),
      p_company: String(data.get("company") || ""),
      p_team_size: String(data.get("team_size") || ""),
      p_contractor_type: String(data.get("contractor_type") || ""),
      p_message: String(data.get("message") || ""),
      p_source_url: window.location.href,
    });

    if (submitError) {
      setState("error");
      setError("We couldn’t submit the form. Please email admin@progro.ai and we’ll help you directly.");
      return;
    }

    form.reset();
    setState("sent");
  }

  if (state === "sent") {
    return <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200" role="status">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-[#0B7658]">✓</div>
      <h2 className="mt-5 text-2xl font-black">Request received.</h2>
      <p className="mt-3 leading-7 text-slate-600">Thank you. The ProGro team will follow up from admin@progro.ai.</p>
      <button onClick={() => setState("idle")} className="mt-6 font-bold text-[#0B7658] underline">Send another message</button>
    </div>;
  }

  return <form onSubmit={submit} className="space-y-5 rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:p-8">
    <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label><span className="form-label">First name</span><input name="first_name" className="form-field" maxLength={80} required /></label><label><span className="form-label">Last name</span><input name="last_name" className="form-field" maxLength={80} required /></label></div>
    <label><span className="form-label">Work email</span><input name="email" type="email" className="form-field" maxLength={254} required /></label>
    <label><span className="form-label">Company</span><input name="company" className="form-field" maxLength={160} required={kind === "demo"} /></label>
    {kind === "demo" && <div className="grid gap-5 sm:grid-cols-2"><label><span className="form-label">Team size</span><select name="team_size" className="form-field" defaultValue=""><option value="" disabled>Select</option><option>1–5</option><option>6–15</option><option>16–50</option><option>51+</option></select></label><label><span className="form-label">Contractor type</span><select name="contractor_type" className="form-field" defaultValue=""><option value="" disabled>Select</option><option>General contractor</option><option>Specialty contractor</option><option>Developer / owner</option><option>Other</option></select></label></div>}
    <label><span className="form-label">{kind === "demo" ? "What would you like to see?" : "How can we help?"}</span><textarea name="message" rows={5} className="form-field" maxLength={3000} required /></label>
    {state === "error" && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error} <a className="font-bold underline" href="mailto:admin@progro.ai">Email us</a></p>}
    <button type="submit" className="button-primary w-full" disabled={state === "sending"}>{state === "sending" ? "Submitting…" : kind === "demo" ? "Send demo request" : "Send message"}</button>
    <p className="text-xs leading-5 text-slate-500">By submitting, you agree that ProGro may contact you about your request. See our <a href="/privacy" className="underline">Privacy Policy</a>.</p>
  </form>;
}
