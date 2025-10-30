import type { Metadata } from "next"
import { breadcrumb } from "../schema"
import { SITE, title } from "../seo"

export const metadata: Metadata = {
  title: title("Privacy Policy"),
  description: "How ProGro.AI collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function PrivacyPage() {
  const bc = breadcrumb([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Privacy Policy", url: `${SITE.url}/privacy` },
  ])

  return (
    <main className="container-progro py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Privacy Policy</h1>
      <p className="mt-4 max-w-2xl mx-auto text-[#003399]/80">
        Your privacy matters. ProGro.AI collects only what’s needed to deliver our
        services, and we protect your data with industry-standard security.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
    </main>
  )
}


