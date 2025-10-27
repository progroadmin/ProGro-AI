"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b backdrop-blur-sm transition-all",
        isHome
          ? "bg-white/70 border-transparent shadow-none"
          : "bg-white border-[#E5E7EB] shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/progro_logo.png"
            alt="ProGro.AI Logo"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center space-x-8 font-medium text-[#003399]">
          <Link href="/projects" className="hover:text-[#009B55] transition-colors">
            Projects
          </Link>
          <Link href="/about" className="hover:text-[#009B55] transition-colors">
            About
          </Link>
          <Link href="/demo" className="hover:text-[#009B55] transition-colors">
            Demo
          </Link>
          <Link href="/contact" className="hover:text-[#009B55] transition-colors">
            Contact
          </Link>
          <Link href="/quote">
            <Button
              variant="brandGold"
              size="sm"
              className="shadow-sm hover:shadow-md"
            >
              Get Quote
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
