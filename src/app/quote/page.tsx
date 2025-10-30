import type { Metadata } from "next"
import { breadcrumb } from "../schema"
import { SITE, title } from "../seo"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: title("Get a Quote"),
  description: "Request a fast, accurate quote powered by ProGro.AI.",
  alternates: { canonical: "/quote" },
  openGraph: { url: "/quote", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function QuotePage() {
  const bc = breadcrumb([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Get a Quote", url: `${SITE.url}/quote` },
  ])

  return (
    <main className="container-progro py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Get a Quote</h1>

      <div className="mt-8 max-w-xl mx-auto text-left">
        <Card>
          <CardContent className="space-y-3 pt-6">
            <Input placeholder="Project name" />
            <Input placeholder="Scope (short description)" />
            <Input placeholder="Budget range" />
            <Input placeholder="Timeline" />
            <Button variant="brandGreen" className="hover-lift hover-glow w-fit">Submit</Button>
          </CardContent>
        </Card>
      </div>

      {/* Breadcrumb JSON-LD (server-rendered) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
    </main>
  )
}


