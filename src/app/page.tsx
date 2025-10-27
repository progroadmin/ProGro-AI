import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { title } from "./seo"

export const metadata: Metadata = {
  title: title("Home"),
  description:
    "Explore Visionaire × ProGro.AI — fast quotes, organized projects, and AI precision for construction teams.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white text-center px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-[#F9F9F9]" />
      <div className="mb-10 relative">
        <div className="absolute inset-0 blur-3xl opacity-25 bg-[radial-gradient(circle_at_center,rgba(249,178,52,0.4),transparent_70%)]" />
        <img src="/progro_logo.png" alt="ProGro.AI Logo" className="h-28 md:h-32 w-auto mx-auto relative z-10 animate-fadeIn" />
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#003399]">
        Visionaire × <span className="text-[#009B55]">ProGro.AI</span>
      </h1>

      <p className="mt-4 text-lg md:text-xl text-[#003399]/80 max-w-2xl mx-auto leading-relaxed">
        A smarter way to manage, quote, and grow your construction projects — powered by{" "}
        <span className="text-[#009B55] font-semibold">AI & precision design.</span>
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/demo"><Button variant="brandGold" size="lg">Request Demo</Button></Link>
        <Link href="/quote"><Button variant="brandGreen" size="lg">Get Quote</Button></Link>
        <Link href="/contact"><Button variant="brandBlueOutline" size="lg">Contact Us</Button></Link>
      </div>

      <div className="absolute bottom-10 text-sm md:text-base text-[#003399]/70">
        Built with ❤️ by Visionaire + ProGro.AI
      </div>
    </main>
  )
}
