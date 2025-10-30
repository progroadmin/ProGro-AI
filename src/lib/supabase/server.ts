// src/lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// The exported function MUST be async to satisfy the type checker's insistence on 'await'
export async function createClient() {
  // 💥 FINAL FIX: Await the cookies() function to resolve the phantom Promise type error
  const cookieStore = await cookies();

  // Define the cookie handlers, using the await-ed cookieStore instance
  const cookieHandlers = {
    get(name: string) {
      // Use the resolved cookieStore's get method
      return cookieStore.get(name)?.value;
    },
    set(name: string, value: string, options: any) {
      try {
        // Use the resolved cookieStore instance to set
        (cookieStore as any).set(name, value, options);
      } catch (error) {
        // Standard workaround
      }
    },
    remove(name: string, options: any) {
      try {
        (cookieStore as any).set({ name, value: "", ...options, maxAge: 0 });
      } catch (error) {
        // Standard workaround
      }
    },
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieHandlers,
    }
  );
}