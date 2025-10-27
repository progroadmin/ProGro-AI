export const metadata = {
  title: "About | Visionaire Construction",
  description: "Licensed GC serving LA & TX — commercial, municipal, and multi-family projects.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <section>
        <h1 className="text-4xl font-semibold">About Visionaire Construction</h1>
        <p className="mt-4 text-balance leading-relaxed">
          We’re a licensed general contractor delivering commercial, municipal, and light-industrial
          improvements. From RFP response through closeout, our team handles scopes like interior finishes,
          roofing, doors & hardware, and unit turnovers—with DBE certifications in New Orleans and Houston.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl p-6 shadow-sm bg-[--color-background] border">
          <h3 className="text-lg font-medium">What we do</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• Commercial & Municipal Renovations</li>
            <li>• Roofing (installs, replacements, repairs)</li>
            <li>• Interior/Exterior Painting & Drywall</li>
            <li>• Property Maintenance & Turnovers</li>
          </ul>
        </div>
        <div className="rounded-2xl p-6 shadow-sm bg-[--color-background] border">
          <h3 className="text-lg font-medium">Why owners choose us</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• Fast, clean mobilization</li>
            <li>• Clear pricing & change-order control</li>
            <li>• Closeout docs organized & on time</li>
          </ul>
        </div>
        <div className="rounded-2xl p-6 shadow-sm bg-[--color-background] border">
          <h3 className="text-lg font-medium">Certifications</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• DBE — New Orleans & Houston</li>
            <li>• Licensed GC — Louisiana</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
