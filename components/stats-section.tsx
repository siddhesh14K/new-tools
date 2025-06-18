import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, Clock, Star } from "lucide-react"

export function StatsSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">10M+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-muted-foreground">Free Tools</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
