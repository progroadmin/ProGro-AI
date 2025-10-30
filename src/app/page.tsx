import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Soft brand background blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="brand-gradient opacity-10 blur-3xl h-[40vh] w-[80vw] mx-auto mt-10 rounded-full" />
      </div>

      <section className="container mx-auto px-4 py-20 text-center">
        {/* ✅ Logo - this is where your image is used */}
        <Image
          src="/progro_logo.png"
          alt="ProGro.AI logo"
          width={100}
          height={100}
          className="mx-auto mb-8 drop-shadow-md animate-fade-in"
          priority
        />

        {/* Headline */}
        <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="text-gradient brand-gradient">Visionaire</span>
          <span className="mx-2"> × </span>
          <span className="text-gradient brand-gradient">ProGro.AI</span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-2xl text-slate-600 text-lg md:text-xl">
          A smarter way to manage, quote, and grow your construction projects — powered by{" "}
          <span className="font-semibold text-slate-900">AI</span> &{" "}
          <span className="font-semibold text-slate-900">precision design</span>.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button variant="brandGreen" className="rounded-xl hover-lift hover-glow">
            Request Demo
          </Button>
          <Button variant="brandGold" className="rounded-xl hover-lift">
            Get Quote
          </Button>
          <Button variant="outline" className="rounded-xl">
            Contact Us
          </Button>
        </div>

        {/* Optional metrics section */}
        <div className="mx-auto mt-16 max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["2× faster", "bids out the door"],
            ["30% fewer", "change orders"],
            ["All-in-one", "CRM + Jobs"],
            ["Multi-tenant", "ready"],
          ].map(([a, b]) => (
            <div key={a} className="surface rounded-xl p-4">
              <div className="text-sm text-slate-500">{b}</div>
              <div className="text-lg font-semibold">{a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
