import type { Metadata } from "next"
import { title } from "../seo"

export const metadata: Metadata = {
  title: title("Terms of Service"),
  description: "The terms and conditions for using Visionaire × ProGro.AI.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <main className="container-progro py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003399]">Terms of Service</h1>
      <p className="mt-4 max-w-2xl mx-auto text-[#003399]/80">
        By using Visionaire × ProGro.AI, you agree to these terms and conditions.
      </p>
    </main>
  )
}
