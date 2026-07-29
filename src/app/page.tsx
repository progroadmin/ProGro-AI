import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  HardHat,
  Images,
  ReceiptText,
  Users,
} from "lucide-react";

const tools = [
  { icon: BriefcaseBusiness, title: "Project control", text: "Keep active jobs, status, stakeholders, documents, and next steps together." },
  { icon: FileText, title: "Bids & quotes", text: "Build professional proposals and scopes without rebuilding the same information." },
  { icon: ReceiptText, title: "Billing", text: "Track invoices, change orders, payments, and outstanding balances by project." },
  { icon: HardHat, title: "Labor", text: "Organize crew records, hours, labor costs, and project assignments." },
  { icon: BarChart3, title: "Financial visibility", text: "See job activity, expenses, working capital, and portfolio performance more clearly." },
  { icon: Users, title: "Business directory", text: "Keep clients, vendors, subcontractors, and project contacts connected to the work." },
  { icon: Building2, title: "Equipment", text: "Maintain equipment and vehicle records in the same operating system." },
  { icon: Images, title: "Job photos", text: "Organize field photos by project so your records are easy to find later." },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#071A17] text-white">
        <div className="hero-grid absolute inset-0 opacity-35" />
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#19B47A]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-[#F4B740]" />
              Construction operations, organized
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Run the business behind every job.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              ProGro brings your projects, bids, billing, labor, contacts, equipment, and job records into one contractor-focused workspace.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/get-started" className="button-primary">
                Start your free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/product" className="button-secondary-dark">Explore the platform</Link>
            </div>
            <p className="mt-5 text-sm text-slate-400">Complete a short intake to unlock your 7-day trial. One project included.</p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[.07] p-3 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="rounded-[1.4rem] border border-white/10 bg-[#0E2722] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <Image src="/progro_logo.png" alt="ProGro.ai" width={46} height={46} className="rounded-xl" />
                    <div><p className="font-bold">Operations overview</p><p className="text-xs text-slate-400">Your company at a glance</p></div>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Live workspace</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[['Active projects','12'],['Open bids','7'],['Outstanding','4'],['Crew members','18']].map(([label,value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                      <p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-2xl font-black">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold">Recent work</p><ClipboardList className="h-4 w-4 text-[#F4B740]" /></div>
                  {['Community center renovation','Retail buildout','Municipal repairs'].map((name, i) => (
                    <div key={name} className="flex items-center justify-between border-t border-white/10 py-3 text-sm first:border-0">
                      <span className="text-slate-300">{name}</span><span className="text-xs text-emerald-300">{['Active','Quoted','In progress'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">One operating workspace</p>
          <h2 className="section-title">Less hunting. Less rebuilding. More control.</h2>
          <p className="section-copy">ProGro is designed around how contractors actually move from an opportunity to a project, through billing and closeout.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ icon: Icon, title, text }) => (
            <article key={title} className="feature-card">
              <div className="icon-box"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F6F8F7]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="eyebrow">Built for the whole operation</p>
            <h2 className="section-title">From the office to the field—and back again.</h2>
            <p className="section-copy">Give owners and office teams a clear operating view while keeping project information connected to the people doing the work.</p>
          </div>
          <div className="grid gap-4">
            {[
              'Keep project records tied to the correct job.',
              'Separate company access with roles and permissions.',
              'Use company branding on customer-facing documents.',
              'Find contacts, costs, photos, and documents without digging through separate systems.',
            ].map(item => (
              <div key={item} className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0B7658]" />
                <p className="font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="rounded-[2rem] bg-[#0B7658] px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-100">See it with your workflow</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">See ProGro for yourself.</h2>
            <p className="mt-4 text-emerald-50/85">Complete a short intake and we&apos;ll prepare your 7-day trial workspace, configured for how you work.</p>
          </div>
          <Link href="/get-started" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F4B740] px-6 py-3.5 font-bold text-[#16211E] transition hover:bg-[#FFD16A] lg:mt-0">
            Start your free trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
