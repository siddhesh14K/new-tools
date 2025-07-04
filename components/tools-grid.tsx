import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  ImageIcon,
  Type,
  QrCode,
  Lock,
  Palette,
  Hash,
  LinkIcon,
  FileCode,
  Calculator,
  Calendar,
  Scale,
  Code,
  Scissors,
  Settings,
  Search,
  Download,
  Layers,
} from "lucide-react"

const tools = [
  // PDF Tools
  {
    name: "PDF Compressor",
    description: "Reduce PDF file size without losing quality",
    icon: FileText,
    href: "/pdf-compressor",
    category: "PDF",
    color: "text-red-500",
    status: "working",
    featured: false,
  },
  {
    name: "PDF Merger",
    description: "Combine multiple PDF files into one",
    icon: FileText,
    href: "/pdf-merger",
    category: "PDF",
    color: "text-red-600",
    status: "working",
    featured: false,
  },
  {
    name: "PDF Splitter",
    description: "Split PDF into separate pages or ranges",
    icon: Scissors,
    href: "/pdf-splitter",
    category: "PDF",
    color: "text-red-700",
    status: "working",
    featured: false,
  },

  // Image Tools
  {
    name: "Bulk Image Editor",
    description: "Process hundreds of images at once - resize, compress, convert",
    icon: Layers,
    href: "/bulk-image-editor",
    category: "Image",
    color: "text-blue-500",
    status: "working",
    featured: true,
  },
  {
    name: "Image Compressor",
    description: "Compress images without quality loss",
    icon: ImageIcon,
    href: "/image-compressor",
    category: "Image",
    color: "text-green-500",
    status: "working",
    featured: true,
  },
  {
    name: "Image Resizer",
    description: "Resize images to specific dimensions",
    icon: ImageIcon,
    href: "/image-resizer",
    category: "Image",
    color: "text-green-600",
    status: "working",
    featured: false,
  },
  {
    name: "Background Remover",
    description: "Remove background from images automatically",
    icon: ImageIcon,
    href: "/background-remover",
    category: "Image",
    color: "text-green-700",
    status: "working",
    featured: false,
  },

  // Text Tools
  {
    name: "Word Counter",
    description: "Count words, characters, and paragraphs",
    icon: Type,
    href: "/word-counter",
    category: "Text",
    color: "text-blue-500",
    status: "working",
    featured: false,
  },
  {
    name: "Case Converter",
    description: "Convert text to uppercase, lowercase, title case",
    icon: Type,
    href: "/case-converter",
    category: "Text",
    color: "text-blue-600",
    status: "working",
    featured: false,
  },
  {
    name: "Text Formatter",
    description: "Format and clean up text content",
    icon: Type,
    href: "/text-formatter",
    category: "Text",
    color: "text-blue-700",
    status: "working",
    featured: false,
  },
  {
    name: "Lorem Generator",
    description: "Generate Lorem Ipsum placeholder text",
    icon: Type,
    href: "/lorem-generator",
    category: "Text",
    color: "text-purple-500",
    status: "working",
    featured: false,
  },

  // Developer Tools
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: Code,
    href: "/base64-encoder",
    category: "Developer",
    color: "text-yellow-500",
    status: "working",
    featured: false,
  },
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: FileCode,
    href: "/json-formatter",
    category: "Developer",
    color: "text-emerald-500",
    status: "working",
    featured: true,
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    icon: Hash,
    href: "/hash-generator",
    category: "Utility",
    color: "text-orange-500",
    status: "working",
    featured: false,
  },

  // Utility Tools
  {
    name: "Password Generator",
    description: "Generate secure random passwords",
    icon: Lock,
    href: "/password-generator",
    category: "Security",
    color: "text-red-500",
    status: "working",
    featured: true,
  },
  {
    name: "QR Code Generator",
    description: "Create QR codes for text, URLs, and more",
    icon: QrCode,
    href: "/qr-generator",
    category: "Utility",
    color: "text-indigo-500",
    status: "working",
    featured: false,
  },
  {
    name: "Color Picker",
    description: "Pick colors and get hex, RGB, HSL values",
    icon: Palette,
    href: "/color-picker",
    category: "Design",
    color: "text-pink-500",
    status: "working",
    featured: false,
  },
  {
    name: "URL Shortener",
    description: "Shorten long URLs for easy sharing",
    icon: LinkIcon,
    href: "/url-shortener",
    category: "Utility",
    color: "text-cyan-500",
    status: "working",
    featured: false,
  },

  // Calculator Tools
  {
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: Scale,
    href: "/unit-converter",
    category: "Calculator",
    color: "text-amber-500",
    status: "working",
    featured: false,
  },
  {
    name: "Date Calculator",
    description: "Calculate differences between dates",
    icon: Calendar,
    href: "/date-calculator",
    category: "Calculator",
    color: "text-violet-500",
    status: "working",
    featured: false,
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, discounts, and tips",
    icon: Calculator,
    href: "/percentage-calculator",
    category: "Calculator",
    color: "text-rose-500",
    status: "working",
    featured: false,
  },

  // SEO Tools
  {
    name: "Meta Tag Generator",
    description: "Generate SEO meta tags for websites",
    icon: Settings,
    href: "/meta-tag-generator",
    category: "SEO",
    color: "text-green-400",
    status: "working",
    featured: false,
  },
  {
    name: "SEO Analyzer",
    description: "Analyze website SEO performance",
    icon: Search,
    href: "/seo-analyzer",
    category: "SEO",
    color: "text-green-500",
    status: "working",
    featured: false,
  },

  // Social Media Tools
  {
    name: "YouTube Thumbnail Downloader",
    description: "Download YouTube video thumbnails in high quality",
    icon: Download,
    href: "/youtube-thumbnail-downloader",
    category: "Social Media",
    color: "text-red-500",
    status: "working",
    featured: false,
  },
]

interface Tool {
  title?: string
  name?: string
  description: string
  href: string
  icon: any
  category: string
  color?: string
  featured?: boolean
  keywords?: string[]
  status?: string
}

interface ToolsGridProps {
  tools?: Tool[]
}

export function ToolsGrid({ tools: propTools }: ToolsGridProps = {}) {
  const toolsToRender = propTools || tools
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {toolsToRender.map((tool, index) => (
        <Link key={tool.href} href={tool.href}>
          <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer relative">
            {tool.featured && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">⭐ Featured</div>
            )}
            {tool.status === "working" && !tool.featured && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">✓ Working</div>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-background border rounded-lg p-2 group-hover:scale-110 transition-transform">
                  <tool.icon className={`h-6 w-6 ${tool.color || 'text-primary'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-muted px-2 py-1 rounded">{tool.category}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default ToolsGrid
