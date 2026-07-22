import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "How ProGro.ai handles website and account information." };

export default function PrivacyPage() {
  return <main className="page-shell max-w-4xl"><p className="eyebrow">Legal</p><h1 className="section-title">Privacy Policy</h1><p className="mt-4 text-sm text-slate-500">Last updated: July 19, 2026</p><div className="mt-10 space-y-8 text-slate-700 [&_h2]:text-xl [&_h2]:font-black [&_p]:mt-3 [&_p]:leading-7 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
    <section><h2>Information we collect</h2><p>We may collect information you provide through account registration, demo and contact requests, including your name, business email, company, team information, and message. The service may also collect account activity, device information, and records your organization chooses to store in its workspace.</p></section>
    <section><h2>How we use information</h2><p>We use information to provide and secure the service, respond to inquiries, support accounts, improve functionality, and communicate about ProGro. We do not sell personal information.</p></section>
    <section><h2>Service providers</h2><p>ProGro uses third-party infrastructure and service providers for functions such as hosting, authentication, email, scheduling, analytics, and data storage. They may process information only as needed to provide those services.</p></section>
    <section><h2>Data choices and security</h2><p>You may request access, correction, or deletion of personal information by contacting us. We use reasonable administrative and technical safeguards, but no internet service can guarantee absolute security.</p></section>
    <section><h2>Contact</h2><p>Privacy questions may be sent to <a className="font-bold text-[#0B7658] underline" href="mailto:admin@progro.ai">admin@progro.ai</a>.</p></section>
    <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">This policy will be reviewed and updated before paid customer subscriptions are activated.</p>
  </div></main>;
}
