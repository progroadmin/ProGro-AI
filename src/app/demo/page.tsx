import { Button } from "@/components/ui/button"

export default function DemoPage() {
  return (
    <div className="container-progro grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Request a Demo</h1>
      <p className="text-muted-foreground max-w-2xl">
        Tell us about your team and we’ll set up a walkthrough tailored to your use case.
      </p>
      <Button variant="brand" className="hover-lift hover-glow w-fit">Start Demo Request</Button>
    </div>
  )
}
