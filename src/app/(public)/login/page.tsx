"use client";

import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    const base = process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin;

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { emailRedirectTo: `${base}/auth/callback` },
    });

    if (error) alert(error.message);
    else setSent(true);
  }

  if (sent) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-xl font-semibold">Check your inbox 📩</h1>
        <p className="text-slate-600 mt-2">
          A magic login link has been sent to <b>{email}</b>.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border border-gray-300 rounded-md w-full p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
        >
          Send Magic Link
        </button>
      </form>
    </main>
  );
}


