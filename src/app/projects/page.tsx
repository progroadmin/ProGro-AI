import type { Metadata } from "next"
import { breadcrumb } from "../schema"
import { SITE, title } from "../seo"

export const metadata: Metadata = {
  title: title("Projects"),
  description: "Recent Visionaire × ProGro.AI projects showcasing speed, accuracy, and savings.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", images: [{ url: "/progro_logo.png" }] },
  twitter: { images: ["/progro_logo.png"] },
}

export default function ProjectsPage() {
  const bc = breadcrumb([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Projects", url: `${SITE.url}/projects` },
  ])

  return (
    <main className="container-progro py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Projects</h1>
      <p className="mt-4 max-w-2xl text-[#003399]/80">
        A snapshot of recent work powered by our AI-driven estimating and project tools.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
    </main>
  )
}
