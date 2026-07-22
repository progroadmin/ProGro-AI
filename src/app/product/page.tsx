import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, Building2, FileText, HardHat, Images, ReceiptText, Users } from "lucide-react";

export const metadata: Metadata = { title: "Product", description: "Explore ProGro.ai construction operations software." };

const groups = [
  { icon: BriefcaseBusiness, title: "Projects", text: "Track job status, stakeholders, activity, and related records in one place." },
  { icon: FileText, title: "Bids & quotes", text: "Create customer-facing bids, quotes, scopes, and supporting documents." },
  { icon: ReceiptText, title: "Billing", text: "Manage invoices, change orders, payment status, and project balances." },
  { icon: HardHat, title: "Labor", text: "Organize crew information, hours, assignments, and labor cost records." },
  { icon: BarChart3, title: "Financials", text: "Review project spending, business activity, and operating performance." },
  { icon: Users, title: "Directory", text: "Keep clients, vendors, subcontractors, and contacts searchable and connected." },
  { icon: Building2, title: "Equipment", text: "Store equipment and vehicle information alongside company operations." },
  { icon: Images, title: "Photos", text: "Keep job photos organized by project instead of buried in individual phones." },
];

export default function ProductPage() {
  return <main>
    <section className="bg-[#071A17] text-white"><div className="page-shell text-center"><p className="text-sm font-black uppercase tracking-[.18em] text-emerald-300">The ProGro platform</p><h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">One place for the work that keeps your company moving.</h1><p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-300">Connect project operations without forcing your team to hunt across unrelated tools.</p></div></section>
    <section className="page-shell"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{groups.map(({icon:Icon,title,text})=><article key={title} className="feature-card"><div className="icon-box"><Icon className="h-5 w-5" /></div><h2 className="mt-5 text-xl font-black">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></section>
    <section className="border-y border-slate-200 bg-[#F6F8F7]"><div className="page-shell grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">Designed for growth</p><h2 className="section-title">Start with the operation you have. Build from there.</h2><p className="section-copy">ProGro supports separate company workspaces, user roles, company branding, and plan-based access so the platform can grow with your organization.</p></div><div className="rounded-3xl bg-white p-8 ring-1 ring-slate-200"><p className="font-black text-[#0B7658]">Currently available</p><ul className="mt-5 grid gap-3 text-slate-700">{['Company workspace and onboarding','Project and document workflows','Bids, quotes, scopes, and billing','Labor, directory, equipment, and photos','Roles, invitations, and plan controls'].map(x=><li key={x} className="flex gap-3"><span className="text-[#0B7658]">✓</span>{x}</li>)}</ul></div></div></section>
    <section className="page-shell text-center"><h2 className="text-3xl font-black">See how it works.</h2><p className="mx-auto mt-3 max-w-xl text-slate-600">Explore a sample ProGro workspace at your own pace—no meeting required.</p><a href="https://demo.progro.ai/?explore=1" className="button-primary mt-7">Launch live demo <ArrowRight className="h-4 w-4" /></a></section>
  </main>;
}
