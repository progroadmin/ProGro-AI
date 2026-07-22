import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#071A17] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-md">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/progro_logo.png" alt="ProGro.ai" width={42} height={42} className="rounded-xl" />
            <span className="text-xl font-black text-white">ProGro.ai</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-400">Contractor-focused software for organizing the business behind every job.</p>
          <a href="mailto:admin@progro.ai" className="mt-4 inline-block text-sm font-semibold text-emerald-300 hover:text-emerald-200">admin@progro.ai</a>
        </div>
        <div>
          <p className="font-bold text-white">Platform</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/product" className="hover:text-white">Product</Link><Link href="/solutions" className="hover:text-white">Solutions</Link><Link href="/demo" className="hover:text-white">Explore Demo</Link><Link href="/get-started" className="hover:text-white">Get started</Link>
          </nav>
        </div>
        <div>
          <p className="font-bold text-white">Company</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/about" className="hover:text-white">About</Link><Link href="/contact" className="hover:text-white">Contact</Link><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-slate-500">© {new Date().getFullYear()} ProGro.ai. All rights reserved.</div>
      </div>
    </footer>
  );
}
