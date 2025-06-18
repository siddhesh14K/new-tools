import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export function TrendingTools() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
        <TrendingUp className="h-6 w-6 mr-2" />🔥 Trending Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/pdf-compressor">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                PDF Compressor
                <Badge variant="destructive">Hot</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Reduce PDF size by 90%</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/image-compressor">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Image Compressor
                <Badge variant="secondary">Popular</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Optimize images for web</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/word-counter">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Word Counter
                <Badge variant="outline">Trending</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Count words & characters</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </section>
  )
}
