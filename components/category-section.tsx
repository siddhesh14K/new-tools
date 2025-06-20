import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ImageIcon, Type, Video, Search, Calculator, Shield, Code } from "lucide-react"

const categories = [
  {
    name: "PDF Tools",
    icon: FileText,
    count: 15,
    description: "Compress, merge, split, convert PDFs",
    tools: ["PDF Compressor", "PDF Merger", "PDF Splitter", "PDF to Word"],
    href: "/pdf-tools",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    name: "Image Tools",
    icon: ImageIcon,
    count: 13,
    description: "Edit, compress, resize images",
    tools: ["Bulk Image Editor", "Image Compressor", "Background Remover", "Image Resizer"],
    href: "/image-tools",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    name: "Text Tools",
    icon: Type,
    count: 18,
    description: "Format, count, convert text",
    tools: ["Word Counter", "Case Converter", "Text Formatter", "Lorem Generator"],
    href: "/text-tools",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Video Tools",
    icon: Video,
    count: 8,
    description: "Compress, convert, edit videos",
    tools: ["Video Compressor", "Video Converter", "Video Trimmer", "GIF Maker"],
    href: "/video-tools",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "SEO Tools",
    icon: Search,
    count: 10,
    description: "Analyze, optimize for search",
    tools: ["SEO Analyzer", "Keyword Checker", "Meta Generator", "Sitemap Creator"],
    href: "/seo-tools",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    name: "Calculators",
    icon: Calculator,
    count: 14,
    description: "Mathematical calculations",
    tools: ["Percentage Calc", "Date Calculator", "Unit Converter", "BMI Calculator"],
    href: "/calculators",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    name: "Security Tools",
    icon: Shield,
    count: 6,
    description: "Password, hash, encryption",
    tools: ["Password Generator", "Hash Generator", "Encryption Tool", "QR Scanner"],
    href: "/security-tools",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    name: "Developer Tools",
    icon: Code,
    count: 20,
    description: "JSON, Base64, URL tools",
    tools: ["JSON Formatter", "Base64 Encoder", "URL Encoder", "HTML Validator"],
    href: "/developer-tools",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
]

export function CategorySection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-4">🎯 Tools by Category</h2>
      <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
        Explore our organized collection of tools designed for specific tasks and professions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link key={category.href} href={category.href}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer">
              <CardHeader className="pb-3">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.bgColor} mb-3`}
                >
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {category.name}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({category.count} tools)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <div className="space-y-1">
                  {category.tools.slice(0, 3).map((tool, toolIndex) => (
                    <div key={toolIndex} className="text-xs text-muted-foreground">
                      • {tool}
                    </div>
                  ))}
                  {category.tools.length > 3 && (
                    <div className="text-xs text-primary font-medium">+{category.tools.length - 3} more tools</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
