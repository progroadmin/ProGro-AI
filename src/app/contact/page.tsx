import type { Metadata } from "next"
import Script from "next/script"
import { breadcrumb } from "../schema"
import { SITE, title } from "../seo"
import Link from "next/link"

export const metadata: Metadata = {
  title: title("Contact"),
  description: "Contact Visionaire × ProGro.AI for demos, pricing, and partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function ContactPage() {
  return (
    <main className="container-progro py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Contact</h1>
      <p className="mt-4 max-w-2xl text-[#003399]/80">
        Questions, demos, or partnerships — we’d love to talk. Prefer a form? Try our{" "}
        <Link href="/quote" className="underline">Quote</Link> page.
      </p>

      <Script id="ld-breadcrumb-contact" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumb([
          { name: "Home", url: `${SITE.url}/` },
          { name: "Contact", url: `${SITE.url}/contact` },
        ]))}
      </Script>
    </main>
  )
}


