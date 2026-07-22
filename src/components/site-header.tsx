"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Product", "/product"],
  ["Solutions", "/solutions"],
  ["Demo", "/demo"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/progro_logo.png" alt="ProGro.ai" width={42} height={42} className="rounded-xl" priority />
          <span className="text-xl font-black tracking-tight text-[#0B7658]">ProGro<span className="text-slate-900">.ai</span></span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-[#0B7658]">{label}</Link>)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-[#0B7658]">Log in</Link>
          <Link href="/get-started" className="rounded-xl bg-[#0B7658] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#075C45]">Get started</Link>
        </div>

        <button className="rounded-lg p-2 text-slate-800 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-slate-700 hover:bg-emerald-50">{label}</Link>)}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <Link href="/login" onClick={() => setOpen(false)} className="button-secondary px-4 py-3 text-center">Log in</Link>
              <Link href="/get-started" onClick={() => setOpen(false)} className="rounded-xl bg-[#0B7658] px-4 py-3 text-center font-bold text-white">Get started</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
