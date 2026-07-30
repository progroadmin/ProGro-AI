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
        {/* Copy matches what actually happens today. The previous text
            promised a 7-day trial workspace and an email delivering
            access — trial provisioning is deferred out of T2, so nothing
            creates that workspace or sends that mail. The success screen
            was corrected in the same commit; this is the same claim, one
            file earlier. */}
        <p className="mt-4 text-lg text-slate-600">
          A few questions about how your company runs — divisions, workflows, and the tools you use today.
          We&apos;ll review what you send and follow up by email about next steps.
        </p>
      </div>
      <div className="mt-10">
        <IntakeWorksheet />
      </div>
    </main>
  );
}
