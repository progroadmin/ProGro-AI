import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <p>
            <strong>ProGro.AI</strong> © {new Date().getFullYear()} • Built by Sir Charles Investments × ProGro
          </p>
          <nav className="flex gap-4">
            <Link href="/projects" className="hover:text-primary">Projects</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/demo" className="hover:text-primary">Demo</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
