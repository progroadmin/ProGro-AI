"use client";

// ============================================================
// T3.1 — INTAKE PAGE SHELL   [REV 1]
//
// WHY THIS EXISTS
//
// The heading and intro lived in page.tsx while the submitted-state swap
// happened inside intake-worksheet.tsx, so the page had no idea the form
// was gone. After submitting, the screen read:
//
//     "Tell us what you need"
//     "A few questions about how your company runs ... We'll review what
//      you send and follow up by email about next steps."
//     "Thank you — we've received your requirements."
//     "Our team will review your submission and follow up by email ..."
//
// An invitation to fill in a form that is no longer there, and the same
// follow-up promise said twice.
//
// The submitted state is now owned HERE, one level above the worksheet,
// so the heading and intro swap together with the form. The worksheet
// reports success through onSubmitted and no longer renders its own
// heading or message — one message, in one place.
//
// page.tsx stays a SERVER component so it can keep exporting metadata;
// only this shell is client-side.
// ============================================================

import { useState } from "react";
import IntakeWorksheet from "@/components/intake-worksheet";

export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div className="text-center">
        {submitted ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Thank you &mdash; we&rsquo;ve received your requirements.
            </h1>
            {/* Says what actually happens. Trial provisioning is deferred
                out of T2: nothing creates a workspace or sends access. */}
            <p className="mt-4 text-lg text-slate-600">
              Our team will review your submission and follow up by email about next steps.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tell us what you need
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              A few questions about how your company runs &mdash; divisions, workflows, and the
              tools you use today. We&apos;ll review what you send and follow up by email about
              next steps.
            </p>
          </>
        )}
      </div>
      <div className="mt-10">
        <IntakeWorksheet onSubmitted={() => setSubmitted(true)} />
      </div>
    </>
  );
}
