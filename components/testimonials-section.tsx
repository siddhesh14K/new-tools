import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Graphic Designer",
    company: "Creative Studio",
    content:
      "FreeTools.online has become my go-to resource for daily tasks. The image compressor alone has saved me hours of work and gigabytes of storage!",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Mike Chen",
    role: "Web Developer",
    company: "Tech Startup",
    content:
      "The JSON formatter and Base64 encoder are incredibly useful for development. Fast, reliable, and always available when I need them.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Writer",
    company: "Marketing Agency",
    content:
      "The word counter and text tools help me meet client requirements perfectly. The real-time analysis is a game-changer for my workflow.",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "David Kim",
    role: "Student",
    company: "University",
    content:
      "As a student, these free tools are a lifesaver! PDF compression for assignments and QR codes for projects - everything I need in one place.",
    rating: 5,
    avatar: "DK",
  },
]

export function TestimonialsSection() {
  return (
    <section className="mb-16 bg-muted/30 rounded-2xl p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">💬 What Our Users Say</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join millions of satisfied users who trust FreeTools.online for their daily tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-primary/20 mb-4" />

              <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
