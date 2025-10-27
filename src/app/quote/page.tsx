import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function QuotePage() {
  return (
    <div className="container-progro grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Get a Quote</h1>

      <Card className="max-w-xl">
        <CardContent className="py-6 grid gap-4">
          <Input placeholder="Project name" />
          <Input placeholder="Budget range" />
          <Input placeholder="Timeline" />
<Button variant="brandGreen" className="hover-lift hover-glow w-fit">Submit</Button>
        </CardContent>
      </Card>
    </div>
  )
}
