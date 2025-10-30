"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();
  const [msg, setMsg] = useState("Finishing sign-in…");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );
        if (error) throw error;
        if (!alive) return;
        setMsg("Signed in! Redirecting…");
        router.replace("/dashboard");
      } catch (err: any) {
        if (!alive) return;
        setMsg(err?.message ?? "Could not complete sign-in.");
        // If it fails, kick to login after a beat
        setTimeout(() => router.replace("/login"), 1200);
      }
    })();
    return () => { alive = false; };
  }, [router, supabase]);

  return <main className="p-6">{msg}</main>;
}


