import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Amazing tools! The PDF compressor saved me so much time and the quality is perfect."
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">Graphic Designer</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Best collection of free tools I've found. No registration needed and everything works perfectly."
              </p>
              <div className="font-semibold">Mike Chen</div>
              <div className="text-sm text-muted-foreground">Web Developer</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "I use these tools daily for my work. Fast, reliable, and completely free!"
              </p>
              <div className="font-semibold">Emma Davis</div>
              <div className="text-sm text-muted-foreground">Content Creator</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
