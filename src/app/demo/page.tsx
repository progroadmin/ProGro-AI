import type { Metadata } from "next";
import { ArrowRight, CalendarDays, CheckCircle2, MonitorPlay, MousePointerClick } from "lucide-react";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = { title: "Live Demo", description: "Explore the ProGro.ai interactive demo instantly or request a personalized walkthrough." };

export default function DemoPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL;
  return <main>
    <section className="relative overflow-hidden bg-[#071A17] text-white">
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="page-shell relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">
        <div><p className="text-sm font-black uppercase tracking-[.18em] text-emerald-300">Interactive product demo</p><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Explore ProGro right now.</h1><p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">Walk through a sample construction company workspace on your own. No form, meeting, credit card, or sales call required.</p><a href="https://demo.progro.ai/?explore=1" className="button-primary mt-8">Launch live demo <ArrowRight className="h-4 w-4" /></a><p className="mt-4 text-sm text-slate-400">Sample data only. Your changes do not affect a real company.</p></div>
        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-7 backdrop-blur sm:p-9"><div className="icon-box bg-emerald-400/15 text-emerald-300"><MousePointerClick className="h-5 w-5" /></div><h2 className="mt-5 text-2xl font-black">What you can explore</h2><ul className="mt-5 grid gap-3 text-sm text-slate-300">{['Company dashboard and project tracking','Bids, quotes, scopes, and billing','Labor, contacts, equipment, and job photos','Financial and operational visibility'].map(item=><li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />{item}</li>)}</ul></div>
      </div>
    </section>

    <section className="bg-[#F6F8F7]"><div className="page-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start"><div className="lg:sticky lg:top-28"><p className="eyebrow">Prefer a guided walkthrough?</p><h2 className="section-title">Let us tailor it to your company.</h2><p className="section-copy">A personalized session is optional. Use it when you want help evaluating ProGro for your team or have detailed workflow questions.</p>{bookingUrl && <a href={bookingUrl} target="_blank" rel="noreferrer" className="button-secondary mt-7">Book a demo time</a>}<div className="mt-8 space-y-5">{[{icon:CalendarDays,text:'Scheduled through the official ProGro calendar.'},{icon:MonitorPlay,text:'Focused on the tools relevant to your operation.'},{icon:CheckCircle2,text:'Time for questions, fit, and next steps.'}].map(({icon:Icon,text})=><div key={text} className="flex gap-3"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#0B7658]" /><p className="text-slate-700">{text}</p></div>)}</div></div><ContactForm kind="demo" /></div></section>
  </main>;
}
