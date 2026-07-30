import type { Metadata } from "next";
import IntakePage from "@/components/intake-page";

export const metadata: Metadata = {
  title: "Tell us what you need — ProGro.ai",
  description: "Share your divisions, workflows, and current tools. We'll tailor ProGro to how your construction company actually runs.",
};

// Stays a SERVER component so metadata can be exported here. The heading
// and intro moved into <IntakePage />, which owns the submitted state so
// they swap together with the form — previously the page kept inviting
// visitors to fill in a form that was no longer on screen.
export default function GetStartedPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <IntakePage />
    </main>
  );
}
