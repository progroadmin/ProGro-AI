import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Hammer, Layers3, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "About", description: "Why ProGro.ai was created for construction businesses." };

export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#071A17] text-white"><div className="page-shell max-w-5xl"><p className="text-sm font-black uppercase tracking-[.18em] text-emerald-300">About ProGro</p><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Construction software should understand construction.</h1><p className="mt-6 max-w-3xl text-xl leading-8 text-slate-300">ProGro.ai is an independent software business building practical operating tools for contractors and construction teams.</p></div></section>
      <section className="page-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
        <div><p className="eyebrow">Our purpose</p><h2 className="section-title">Make the business side of construction easier to control.</h2><div className="mt-6 space-y-5 text-lg leading-8 text-slate-600"><p>Contractors often manage critical information across spreadsheets, text messages, email threads, accounting tools, photo galleries, and paper files. ProGro is being built to connect that work in one company workspace.</p><p>Our focus is practical: clearer projects, stronger records, faster access to information, and fewer disconnected systems.</p></div></div>
        <div className="grid gap-4">
          {[{icon:Hammer,title:'Contractor-focused',text:'Workflows organized around jobs, bids, billing, labor, and field records.'},{icon:Layers3,title:'Built to connect',text:'Information stays tied to the project, company, and people it belongs to.'},{icon:ShieldCheck,title:'Company-controlled',text:'Roles and permissions help each organization protect its own workspace.'}].map(({icon:Icon,title,text})=><div key={title} className="feature-card"><div className="icon-box"><Icon className="h-5 w-5" /></div><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}
        </div>
      </section>
      <section className="border-t border-slate-200 bg-[#F6F8F7]"><div className="page-shell flex flex-col justify-between gap-7 lg:flex-row lg:items-center"><div><h2 className="text-3xl font-black tracking-tight">Want to see what we’re building?</h2><p className="mt-2 text-slate-600">Explore the live demo at your own pace, or tell us what you need.</p></div><Link href="/demo" className="button-primary">Explore Demo <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
  );
}
