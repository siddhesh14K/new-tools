import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Star, Users } from "lucide-react"

const trendingTools = [
  {
    name: "PDF Compressor",
    description: "Reduce PDF size by up to 90% without quality loss",
    href: "/pdf-compressor",
    users: "2.5M+",
    rating: 4.9,
    trend: "+25%",
    category: "PDF",
    hot: true,
  },
  {
    name: "Image Compressor",
    description: "Optimize images for web with smart compression",
    href: "/image-compressor",
    users: "1.8M+",
    rating: 4.8,
    trend: "+18%",
    category: "Image",
    hot: true,
  },
  {
    name: "QR Code Generator",
    description: "Create custom QR codes for any purpose",
    href: "/qr-generator",
    users: "1.2M+",
    rating: 4.9,
    trend: "+32%",
    category: "Utility",
    hot: true,
  },
  {
    name: "Password Generator",
    description: "Generate ultra-secure passwords instantly",
    href: "/password-generator",
    users: "950K+",
    rating: 4.7,
    trend: "+15%",
    category: "Security",
    hot: false,
  },
]

export function TrendingTools() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-center mb-8">
        <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
        <h2 className="text-3xl font-bold">🔥 Trending Tools This Week</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingTools.map((tool, index) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer relative overflow-hidden">
              {tool.hot && <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">🔥 HOT</Badge>}

              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                <CardDescription className="text-sm">{tool.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-blue-500" />
                      <span className="font-medium">{tool.users}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="font-medium">{tool.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {tool.category}
                    </Badge>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {tool.trend}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
