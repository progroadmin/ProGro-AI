"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!alive) return;

      if (error || !user) {
        router.replace("/login");
      } else {
        setEmail(user.email ?? null);
      }
      setLoading(false);
    })();

    return () => { alive = false; };
  }, [router, supabase]);

  if (loading) return <main className="p-6">Loading…</main>;
  if (!email) return null; // we redirected

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="opacity-80 mt-2">Welcome, {email}</p>
    </main>
  );
}


