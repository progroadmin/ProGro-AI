import type { Metadata } from "next"
import { title } from "../seo"

export const metadata: Metadata = {
  title: title("Search"),
  description: "Search across Visionaire × ProGro.AI pages and resources.",
  alternates: { canonical: "/search" },
}

export default function SearchPage() {
  return (
    <main className="container-progro py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Search</h1>
      <p className="mt-4 max-w-2xl mx-auto text-[#003399]/80">
        Site search coming soon. In the meantime, reach out via our Contact page.
      </p>
      <form action="/search" method="GET" className="mt-8">
        <input name="q" placeholder="Try: estimate, quote, projects…" className="border px-4 py-2 rounded-md w-full max-w-lg"/>
      </form>
    </main>
  )
}
