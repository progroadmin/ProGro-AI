import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { geistSans, geistMono } from "./fonts";
import { SITE, ogImage } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Construction Operations Software`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["construction management software", "contractor software", "project tracking", "construction billing", "construction operations"],
  openGraph: { type: "website", siteName: SITE.name, title: SITE.name, description: SITE.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, images: [ogImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-[100dvh] bg-white text-slate-900 antialiased font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
