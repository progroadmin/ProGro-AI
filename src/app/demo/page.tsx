import type { Metadata } from "next"
import { breadcrumb } from "../schema"
import { SITE, title } from "../seo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: title("Request a Demo"),
  description: "Schedule a walkthrough of Visionaire × ProGro.AI for your team.",
  alternates: { canonical: "/demo" },
  openGraph: { url: "/demo", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function DemoPage() {
  const bc = breadcrumb([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Request a Demo", url: `${SITE.url}/demo` },
  ])

  return (
    <main className="container-progro py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Request a Demo</h1>
      <p className="mt-4 max-w-2xl mx-auto text-[#003399]/80">
        Tell us about your team and we’ll set up a walkthrough tailored to your use case.
      </p>
      <div className="mt-8">
        <Button variant="brandGold" className="hover-lift hover-glow w-fit">Start Demo Request</Button>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
    </main>
  )
}
