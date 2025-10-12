"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Company = { org_id: string; name: string | null };

export default function Home() {
  const [rows, setRows] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("company_info")
        .select("org_id,name")
        .limit(10);
      if (error) setErr(error.message);
      if (data) setRows(data as Company[]);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Visionaire Platform</h1>
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">Error: {err}</p>}
      {!loading && !err && (
        <ul className="mt-4 list-disc pl-6">
          {rows.length === 0 && <li>(no rows yet)</li>}
          {rows.map(r => (
            <li key={r.org_id}>{r.name ?? "(no name)"} — {r.org_id}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
