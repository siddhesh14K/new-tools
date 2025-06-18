import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Scissors, Palette, RotateCw, Crop, Zap } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "Free Image Tools Online 2024 - Compress, Resize, Edit Images | FreeTools.online",
  description:
    "🎨 Best free image tools online! Compress images up to 80%, resize photos, remove backgrounds, convert formats. No registration, works on mobile, completely free.",
  keywords:
    "free image tools, image compressor online, photo editor, resize images, background remover, image converter, compress photos, edit pictures online",
}

const imageTools = [
  {
    name: "Image Compressor",
    description: "Compress images up to 80% without visible quality loss",
    icon: ImageIcon,
    href: "/image-compressor",
    color: "text-green-500",
    features: ["80% compression", "Batch processing", "All formats", "Quality preview"],
    popular: true,
  },
  {
    name: "Image Resizer",
    description: "Resize images to specific dimensions or percentages",
    icon: Crop,
    href: "/image-resizer",
    color: "text-green-600",
    features: ["Custom dimensions", "Aspect ratio lock", "Batch resize", "Preset sizes"],
    popular: true,
  },
  {
    name: "Background Remover",
    description: "Remove image backgrounds automatically with AI",
    icon: Scissors,
    href: "/background-remover",
    color: "text-green-700",
    features: ["AI-powered", "Instant results", "High accuracy", "Transparent PNG"],
    popular: true,
  },
  {
    name: "Image Converter",
    description: "Convert between JPG, PNG, WebP, and other formats",
    icon: RotateCw,
    href: "/image-converter",
    color: "text-blue-500",
    features: ["All formats", "Batch convert", "Quality control", "Fast processing"],
    popular: false,
  },
  {
    name: "Photo Editor",
    description: "Basic photo editing with filters and adjustments",
    icon: Palette,
    href: "/photo-editor",
    color: "text-purple-500",
    features: ["Filters & effects", "Brightness/contrast", "Crop & rotate", "Easy to use"],
    popular: false,
  },
  {
    name: "Image Optimizer",
    description: "Optimize images for web with perfect balance",
    icon: Zap,
    href: "/image-optimizer",
    color: "text-orange-500",
    features: ["Web optimized", "SEO friendly", "Fast loading", "Multiple formats"],
    popular: false,
  },
]

export default function ImageToolsPage() {
  return (
    <ToolLayout
      title="Free Image Tools Online 2024"
      description="Professional image editing tools that work in your browser. Compress, resize, edit, and convert images without installing software."
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Image Tools", href: "/image-tools" },
          ]}
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🎨 Free Image Tools Online 2024</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional image editing tools that work directly in your browser. Compress, resize, edit, and convert
            images without installing any software. Perfect for photographers, designers, and content creators!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {imageTools.map((tool, index) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer relative">
                {tool.popular && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
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
          <h2>Professional Image Tools for Everyone</h2>
          <p>
            Whether you're a professional photographer, graphic designer, social media manager, or just someone who
            needs to edit images occasionally, our tools provide professional-grade results without the complexity.
          </p>

          <h3>🎯 Most Popular Image Tools</h3>
          <ul>
            <li>
              <strong>Image Compressor:</strong> Reduce file size by up to 80% while maintaining visual quality
            </li>
            <li>
              <strong>Image Resizer:</strong> Resize images to exact dimensions or scale by percentage
            </li>
            <li>
              <strong>Background Remover:</strong> AI-powered background removal in seconds
            </li>
          </ul>

          <h3>✨ Why Choose Our Image Tools?</h3>
          <ul>
            <li>Process images directly in your browser - no uploads to servers</li>
            <li>Support for all major image formats (JPG, PNG, WebP, GIF, etc.)</li>
            <li>Batch processing for multiple images</li>
            <li>Mobile-optimized interface</li>
            <li>Professional results with one-click simplicity</li>
            <li>Completely free with no watermarks or limitations</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
