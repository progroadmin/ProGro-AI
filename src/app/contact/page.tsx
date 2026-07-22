import type { Metadata } from "next";
import { Mail } from "lucide-react";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contact the ProGro.ai team." };

export default function ContactPage() {
  return <main className="bg-[#F6F8F7]"><div className="page-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="eyebrow">Contact ProGro</p><h1 className="section-title">How can we help?</h1><p className="section-copy">Questions about the platform, your account, partnerships, or a demonstration are welcome.</p><a href="mailto:admin@progro.ai" className="mt-8 flex items-center gap-3 font-bold text-[#0B7658]"><span className="icon-box"><Mail className="h-5 w-5" /></span>admin@progro.ai</a></div><ContactForm /></div></main>;
}
