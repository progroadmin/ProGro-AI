// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center">
      <section className="w-full max-w-5xl px-6 py-16 text-center">
        <div className="mx-auto mb-8 flex items-center justify-center">
          <Image
            src="/progro_logo.png"
            alt="ProGro.AI logo"
            width={240}
            height={240}
            priority
            className="h-auto w-56 md:w-60"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand">
          Modern Construction Ops, Powered by AI
        </h1>

        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          Estimates, bids, scheduling, and field coordination—streamlined.{" "}
          <span className="badge-success">ProGro.AI</span> helps contractors move
          faster with fewer mistakes.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/demo" className="btn btn-primary rounded-xl">
            View Demo
          </Link>
          <Link href="/contact" className="btn btn-outline rounded-xl">
            Contact Us
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Need a private demo?{" "}
          <a className="link-accent" href="mailto:admin@progro.ai">
            admin@progro.ai
          </a>
        </p>
      </section>
    </main>
  );
}
