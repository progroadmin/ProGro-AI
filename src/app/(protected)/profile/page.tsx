// src/app/(protected)/profile/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient(); // 👈 await the async helper

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // optional: log for debugging; remove in prod
    console.error("getUser error:", error.message);
  }

  if (!user) redirect("/login");

  return <main className="p-6">Profile (protected) — placeholder</main>;
}
