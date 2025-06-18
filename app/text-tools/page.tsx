import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Type, RotateCw, Hash, FileText, Calculator, Shuffle } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "Free Text Tools Online 2024 - Word Counter, Case Converter | FreeTools.online",
  description:
    "🔤 Best free text tools online! Count words & characters, convert text case, generate Lorem Ipsum, format text. No registration, works on mobile, completely free.",
  keywords:
    "free text tools, word counter online, character counter, case converter, text formatter, Lorem Ipsum generator, text analysis tools, string manipulation",
}

const textTools = [
  {
    name: "Word Counter",
    description: "Count words, characters, paragraphs, and reading time",
    icon: Type,
    href: "/word-counter",
    color: "text-blue-500",
    features: ["Real-time counting", "Reading time", "Character analysis", "Paragraph count"],
    popular: true,
  },
  {
    name: "Case Converter",
    description: "Convert text between different cases instantly",
    icon: RotateCw,
    href: "/case-converter",
    color: "text-blue-600",
    features: ["Multiple cases", "Bulk conversion", "Copy to clipboard", "Instant results"],
    popular: true,
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for design and development",
    icon: FileText,
    href: "/lorem-generator",
    color: "text-blue-700",
    features: ["Custom length", "Multiple formats", "Classic Lorem", "Modern variants"],
    popular: true,
  },
  {
    name: "Text Formatter",
    description: "Format and clean up text with various options",
    icon: Hash,
    href: "/text-formatter",
    color: "text-purple-500",
    features: ["Remove extra spaces", "Line breaks", "Special characters", "Bulk formatting"],
    popular: false,
  },
  {
    name: "Text Analyzer",
    description: "Analyze text for readability, keywords, and more",
    icon: Calculator,
    href: "/text-analyzer",
    color: "text-green-500",
    features: ["Readability score", "Keyword density", "Sentiment analysis", "Text statistics"],
    popular: false,
  },
  {
    name: "Text Randomizer",
    description: "Shuffle words, sentences, or paragraphs randomly",
    icon: Shuffle,
    href: "/text-randomizer",
    color: "text-orange-500",
    features: ["Word shuffle", "Sentence mix", "Random order", "Custom delimiters"],
    popular: false,
  },
]

export default function TextToolsPage() {
  return (
    <ToolLayout
      title="Free Text Tools Online 2024"
      description="Professional text processing tools for writers, editors, and content creators. Count words, convert cases, generate Lorem Ipsum, and more."
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Text Tools", href: "/text-tools" },
          ]}
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🔤 Free Text Tools Online 2024</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional text processing tools for writers, editors, students, and content creators. Analyze, format,
            and manipulate text with ease - all in your browser!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {textTools.map((tool, index) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer relative">
                {tool.popular && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    🔥 POPULAR
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-background border rounded-lg p-3 group-hover:scale-110 transition-transform">
                      <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <div className="prose max-w-none">
          <h2>Essential Text Tools for Content Creators</h2>
          <p>
            Whether you're writing blog posts, academic papers, marketing copy, or code documentation, our text tools
            help you work more efficiently and produce better content.
          </p>

          <h3>📝 Most Popular Text Tools</h3>
          <ul>
            <li>
              <strong>Word Counter:</strong> Track word count, character count, and reading time in real-time
            </li>
            <li>
              <strong>Case Converter:</strong> Convert between uppercase, lowercase, title case, and more
            </li>
            <li>
              <strong>Lorem Ipsum Generator:</strong> Create placeholder text for designs and mockups
            </li>
          </ul>

          <h3>✨ Perfect for These Professionals</h3>
          <ul>
            <li>
              <strong>Writers & Authors:</strong> Track word counts and analyze text structure
            </li>
            <li>
              <strong>Students:</strong> Meet essay requirements and improve readability
            </li>
            <li>
              <strong>Marketers:</strong> Optimize content length for different platforms
            </li>
            <li>
              <strong>Developers:</strong> Generate test data and format code comments
            </li>
            <li>
              <strong>Designers:</strong> Create realistic mockups with proper placeholder text
            </li>
            <li>
              <strong>SEO Specialists:</strong> Analyze keyword density and content structure
            </li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
