import type { Metadata } from "next"
import { breadcrumb } from "../schema"
import { SITE, title } from "../seo"

export const metadata: Metadata = {
  title: title("About"),
  description: "Learn about Visionaire Construction and our mission to modernize construction ops.",
  alternates: { canonical: "/about" },        // ✅ page-specific canonical
  openGraph: { url: "/about", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function AboutPage() {
  const bc = breadcrumb([
    { name: "Home", url: `${SITE.url}/` },
    { name: "About", url: `${SITE.url}/about` },
  ])

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <section>
        <h1 className="text-4xl font-semibold">About Visionaire Construction</h1>
        <p className="mt-4 text-balance leading-relaxed">
          We’re a licensed general contractor delivering commercial, municipal, and light-industrial
          improvements. From RFP response through closeout, our team handles scopes like interior finishes,
          roofing, doors &amp; hardware, and unit turnovers—with DBE certifications in New Orleans and Houston.
        </p>
      </section>

      {/* ✅ Server-rendered Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }}
      />
    </main>
  )
}
