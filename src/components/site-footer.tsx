"use client"

import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/progro_logo.png"
              alt="ProGro.AI"
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-[#003399]">ProGro.AI</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[#003399]">
            <Link href="/projects" className="hover:text-[#009B55]">Projects</Link>
            <Link href="/about" className="hover:text-[#009B55]">About</Link>
            <Link href="/demo" className="hover:text-[#009B55]">Demo</Link>
            <Link href="/contact" className="hover:text-[#009B55]">Contact</Link>
            <Link href="/quote" className="text-[#009B55] font-medium hover:underline">
              Get&nbsp;Quote
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="GitHub" className="rounded-md p-2 text-[#003399] hover:bg-[#F9B234]/10">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="rounded-md p-2 text-[#003399] hover:bg-[#F9B234]/10">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="mailto:admin@progro.ai" aria-label="Email" className="rounded-md p-2 text-[#003399] hover:bg-[#F9B234]/10">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <hr className="my-6 border-[color-mix(in_oklab,#FFFFFF_85%,#003399_15%)]" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-[#003399]/80 md:flex-row">
          <p>© {new Date().getFullYear()} ProGro.AI • Built with ❤️ by Sir Charles Investments × ProGro</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
