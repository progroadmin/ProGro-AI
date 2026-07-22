import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building, HardHat, Landmark, Wrench } from "lucide-react";

export const metadata: Metadata = { title: "Solutions", description: "ProGro.ai solutions for contractors and construction teams." };

export default function SolutionsPage() {
  const audiences=[
    {icon:HardHat,title:'General contractors',text:'Coordinate projects, company records, billing, labor, contacts, and project documentation.'},
    {icon:Wrench,title:'Specialty contractors',text:'Keep bids, scopes, job costs, invoices, crew information, and photos organized by project.'},
    {icon:Building,title:'Growing construction firms',text:'Replace scattered files and individual workarounds with shared company processes.'},
    {icon:Landmark,title:'Public-sector contractors',text:'Build cleaner records for bids, project activity, changes, invoicing, and closeout.'},
  ];
  return <main><section className="bg-[#071A17] text-white"><div className="page-shell"><p className="text-sm font-black uppercase tracking-[.18em] text-emerald-300">Solutions</p><h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Built for contractors who need control—not more clutter.</h1><p className="mt-6 max-w-3xl text-xl leading-8 text-slate-300">ProGro helps construction businesses bring repeatable structure to the work behind every project.</p></div></section><section className="page-shell"><div className="grid gap-5 md:grid-cols-2">{audiences.map(({icon:Icon,title,text})=><article key={title} className="feature-card p-8"><div className="icon-box"><Icon className="h-5 w-5" /></div><h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div><div className="mt-16 rounded-[2rem] bg-[#0B7658] p-8 text-white sm:p-12 lg:flex lg:items-center lg:justify-between"><div><h2 className="text-3xl font-black">Explore it yourself.</h2><p className="mt-3 max-w-2xl text-emerald-50/85">Open the sample workspace immediately and see where ProGro fits your process.</p></div><a href="https://demo.progro.ai/?explore=1" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F4B740] px-6 py-3.5 font-bold text-[#16211E] lg:mt-0">Launch live demo <ArrowRight className="h-4 w-4" /></a></div></section></main>;
}
