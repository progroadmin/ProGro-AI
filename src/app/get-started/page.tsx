import type { Metadata } from "next";
import IntakeWorksheet from "@/components/intake-worksheet";

export const metadata: Metadata = {
  title: "Tell us what you need — ProGro.ai",
  description: "Share your divisions, workflows, and current tools. We'll tailor ProGro to how your construction company actually runs.",
};

export default function GetStartedPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Tell us what you need</h1>
        <p className="mt-4 text-lg text-slate-600">
          A few questions about how your company runs — divisions, workflows, and the tools you use today.
          Completing this intake unlocks your 7-day ProGro trial, which includes one project.
          We&apos;ll email your workspace access once it&apos;s ready.
        </p>
      </div>
      <div className="mt-10">
        <IntakeWorksheet />
      </div>
    </main>
  );
}
