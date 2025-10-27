import type { Metadata } from "next"
import { breadcrumb } from "../schema"
import { SITE, title } from "../seo"

export const metadata: Metadata = {
  title: title("Terms of Service"),
  description: "The terms and conditions for using Visionaire × ProGro.AI.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function TermsPage() {
  const bc = breadcrumb([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Terms of Service", url: `${SITE.url}/terms` },
  ])

  return (
    <main className="container-progro py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Terms of Service</h1>
      <p className="mt-4 max-w-2xl mx-auto text-[#003399]/80">
        By using Visionaire × ProGro.AI, you agree to these terms and conditions.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
    </main>
  )
}
