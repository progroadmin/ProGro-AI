import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using the ProGro.ai website and preview service." };

export default function TermsPage() {
  return <main className="page-shell max-w-4xl"><p className="eyebrow">Legal</p><h1 className="section-title">Terms of Use</h1><p className="mt-4 text-sm text-slate-500">Last updated: July 19, 2026</p><div className="mt-10 space-y-8 text-slate-700 [&_h2]:text-xl [&_h2]:font-black [&_p]:mt-3 [&_p]:leading-7">
    <section><h2>Website and preview access</h2><p>These terms apply to the ProGro.ai website, demonstrations, early-access accounts, and preview features. Features may be changed, limited, or discontinued as the platform develops.</p></section>
    <section><h2>Accounts</h2><p>You are responsible for providing accurate information, safeguarding your credentials, and using the service only for lawful business purposes. You may not attempt to access another organization’s workspace or interfere with the service.</p></section>
    <section><h2>Your content</h2><p>You retain ownership of content you submit. You grant ProGro the limited rights necessary to host, process, and display that content to provide the service.</p></section>
    <section><h2>Software and branding</h2><p>The ProGro software, website, branding, and related materials are protected intellectual property. Access does not transfer ownership or permit copying, resale, reverse engineering, or unauthorized distribution.</p></section>
    <section><h2>No construction advice</h2><p>ProGro is an organizational software service. It does not replace professional judgment, contract review, accounting, engineering, estimating verification, safety procedures, or legal advice. Users remain responsible for reviewing their work and project decisions.</p></section>
    <section><h2>Contact</h2><p>Questions may be sent to <a className="font-bold text-[#0B7658] underline" href="mailto:admin@progro.ai">admin@progro.ai</a>.</p></section>
    <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Customer subscription terms, payment terms, warranty limitations, and the legal operating entity will be finalized before paid subscriptions are activated.</p>
  </div></main>;
}
