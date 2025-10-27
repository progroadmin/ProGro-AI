"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    // capture the form element BEFORE any awaits so reset() is safe later
    const formEl = e.currentTarget;

    const f = new FormData(formEl);
    const name = (f.get("name") as string | null)?.trim() ?? "";
    const email = (f.get("email") as string | null)?.trim() ?? "";
    const phone = (f.get("phone") as string | null)?.trim() ?? "";
    const company = (f.get("company") as string | null)?.trim() || null;
    const message = (f.get("message") as string | null)?.trim() ?? "";

    // We let the DB provide defaults for things like `title` (already set in SQL)
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      company,
      message,
      source: "website",
    });

    setLoading(false);

    if (error) {
      setErr(error.message);
      return;
    }

    setOk("✅ Thanks! We’ll reach out shortly.");
    formEl.reset();
  }

  return (
    <main className="container-progro max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <input
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
          className="rounded-xl border px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          className="rounded-xl border px-3 py-2"
        />
        <input
          name="phone"
          placeholder="Phone number"
          autoComplete="tel"
          className="rounded-xl border px-3 py-2"
        />
        <input
          name="company"
          placeholder="Company (optional)"
          autoComplete="organization"
          className="rounded-xl border px-3 py-2"
        />
        <textarea
          name="message"
          placeholder="Tell us about your project"
          minLength={10}
          required
          rows={6}
          className="rounded-xl border px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="rounded-2xl border px-4 py-2"
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {ok && (
          <p className="text-sm mt-2 text-green-600" aria-live="polite">
            {ok}
          </p>
        )}
        {err && (
          <p className="text-sm mt-2 text-red-600" aria-live="assertive">
            {err}
          </p>
        )}
      </form>
    </main>
  );
}
