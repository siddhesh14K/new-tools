import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            100+ Free Online Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
            Powerful, fast, and free online tools for PDF compression, image editing, text conversion, and more. No
            registration required.
          </p>

          <div className="w-full max-w-2xl mb-10">
            <SearchBar />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="#tools">
              <Button size="lg" className="gap-2">
                Explore All Tools
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pdf-compressor">
              <Button variant="outline" size="lg">
                PDF Compressor
              </Button>
            </Link>
            <Link href="/image-compressor">
              <Button variant="outline" size="lg">
                Image Compressor
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
            {[
              "100% Free Forever",
              "No Registration Required",
              "Works on All Devices",
              "Privacy First",
              "No Watermarks",
              "No File Size Limits",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
