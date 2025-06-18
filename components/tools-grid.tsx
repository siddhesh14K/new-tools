import type React from "react"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  ImageIcon,
  Type,
  Code,
  Key,
  Calendar,
  BarChart3,
  Percent,
  Hash,
  Palette,
  QrCode,
  LinkIcon,
  Tag,
  Scissors,
  Eraser,
} from "lucide-react"

interface Tool {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  category: string
  badge?: string
}

const tools: Tool[] = [
  {
    id: "pdf-compressor",
    title: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    icon: <FileText className="h-8 w-8" />,
    href: "/pdf-compressor",
    category: "PDF Tools",
  },
  {
    id: "pdf-merger",
    title: "PDF Merger",
    description: "Combine multiple PDF files into one document",
    icon: <FileText className="h-8 w-8" />,
    href: "/pdf-merger",
    category: "PDF Tools",
  },
  {
    id: "pdf-splitter",
    title: "PDF Splitter",
    description: "Extract pages or split PDF into multiple files",
    icon: <Scissors className="h-8 w-8" />,
    href: "/pdf-splitter",
    category: "PDF Tools",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress images without losing quality",
    icon: <ImageIcon className="h-8 w-8" />,
    href: "/image-compressor",
    category: "Image Tools",
  },
  {
    id: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to specific dimensions",
    icon: <ImageIcon className="h-8 w-8" />,
    href: "/image-resizer",
    category: "Image Tools",
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "Remove background from images automatically",
    icon: <Eraser className="h-8 w-8" />,
    href: "/background-remover",
    category: "Image Tools",
  },
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, and paragraphs",
    icon: <Type className="h-8 w-8" />,
    href: "/word-counter",
    category: "Text Tools",
  },
  {
    id: "text-formatter",
    title: "Text Formatter",
    description: "Format and beautify text content",
    icon: <Type className="h-8 w-8" />,
    href: "/text-formatter",
    category: "Text Tools",
  },
  {
    id: "case-converter",
    title: "Case Converter",
    description: "Convert text between different cases",
    icon: <Type className="h-8 w-8" />,
    href: "/case-converter",
    category: "Text Tools",
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: <Code className="h-8 w-8" />,
    href: "/json-formatter",
    category: "Developer Tools",
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: <Code className="h-8 w-8" />,
    href: "/base64-encoder",
    category: "Developer Tools",
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: <BarChart3 className="h-8 w-8" />,
    href: "/unit-converter",
    category: "Calculators",
  },
  {
    id: "date-calculator",
    title: "Date Calculator",
    description: "Calculate differences between dates",
    icon: <Calendar className="h-8 w-8" />,
    href: "/date-calculator",
    category: "Calculators",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate secure random passwords",
    icon: <Key className="h-8 w-8" />,
    href: "/password-generator",
    category: "Security Tools",
  },
  {
    id: "qr-generator",
    title: "QR Generator",
    description: "Create custom QR codes for any content",
    icon: <QrCode className="h-8 w-8" />,
    href: "/qr-generator",
    category: "Developer Tools",
  },
  {
    id: "color-picker",
    title: "Color Picker",
    description: "Select and convert between color formats",
    icon: <Palette className="h-8 w-8" />,
    href: "/color-picker",
    category: "Design Tools",
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes",
    icon: <Hash className="h-8 w-8" />,
    href: "/hash-generator",
    category: "Security Tools",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages, increases and decreases",
    icon: <Percent className="h-8 w-8" />,
    href: "/percentage-calculator",
    category: "Calculators",
  },
  {
    id: "lorem-generator",
    title: "Lorem Generator",
    description: "Generate Lorem Ipsum placeholder text",
    icon: <Type className="h-8 w-8" />,
    href: "/lorem-generator",
    category: "Text Tools",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Create short links for long URLs",
    icon: <LinkIcon className="h-8 w-8" />,
    href: "/url-shortener",
    category: "Web Tools",
  },
  {
    id: "meta-tag-generator",
    title: "Meta Tag Generator",
    description: "Create meta tags for better SEO",
    icon: <Tag className="h-8 w-8" />,
    href: "/meta-tag-generator",
    category: "SEO Tools",
  },
]

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Link href={tool.href} key={tool.id} className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">{tool.icon}</div>
                {tool.badge && <Badge variant="secondary">{tool.badge}</Badge>}
              </div>
              <CardTitle className="mt-4">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-1">
              <Badge variant="outline">{tool.category}</Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default ToolsGrid
