import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { SITE, ogImage } from "./seo"
import { orgSchema, websiteSchema } from "./schema"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["construction","AI","quoting","project management","Visionaire","ProGro.AI"],
  authors: [{ name: "ProGro.AI" }],
  creator: "ProGro.AI",
  publisher: "ProGro.AI",
  openGraph: {
    type: "website",
    url: "/",
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [ogImage],
  },
  alternates: { canonical: "/" },
  category: "technology",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* GA4 (loads after hydration) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3RBM8TCCSS"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3RBM8TCCSS');
          `}
        </Script>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>

      <body>
        <SiteHeader />
        <div className="pt-16">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
