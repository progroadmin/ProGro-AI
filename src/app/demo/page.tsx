import { redirect } from "next/navigation";

// Phase 1: the demo is no longer a no-form entry point. Every route that
// used to hand out https://demo.progro.ai/?explore=1 now funnels through
// the intake, which is what unlocks the 7-day trial. Header nav, footer
// "Explore Demo" and the /about CTA all point here, so this redirect
// closes them too.
export default function DemoPage() {
  redirect("/get-started");
}
