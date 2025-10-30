"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo + brand chip */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-semibold leading-none">
            <span className="text-primary">ProGro</span>.ai
          </Link>
          {/* Brand chip (hidden on xs) */}
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-[#003399] bg-[#F9B234]/20">
            Built for Contractors
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden gap-8 md:flex">
          <Link href="/projects" className="text-[15px] text-slate-700 hover:text-primary underline-fx">
            Projects
          </Link>
          <Link href="/about" className="text-[15px] text-slate-700 hover:text-primary underline-fx">
            About
          </Link>
          <Link href="/demo" className="text-[15px] text-slate-700 hover:text-primary underline-fx">
            Demo
          </Link>
          <Link href="/contact" className="text-[15px] text-slate-700 hover:text-primary underline-fx">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <div className="ml-4">
          <Button asChild variant="brandGold" className="rounded-xl font-semibold hover-lift hover-glow">
            <Link href="/quote">Get Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
