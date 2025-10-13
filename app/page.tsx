"use client";

import React from "react";
// import { supabase } from "@/lib/supabase"; // add later when needed

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">PROGRO-AI</h1>
      <p className="mt-2 text-sm text-gray-500">
        Contact:{" "}
        <a href="mailto:admin@progro.ai" className="underline">
          admin@progro.ai
        </a>{" "}
        • (504) 666-9166
      </p>
    </main>
  );
}
