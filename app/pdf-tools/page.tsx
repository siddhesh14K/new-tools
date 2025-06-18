import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Merge, Split, Lock, Unlock } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "Free PDF Tools Online 2024 - Compress, Merge, Split PDFs | No Registration",
  description:
    "15+ free PDF tools to compress, merge, split, convert, and edit PDF files online. No registration required. Fast, secure, and works on all devices.",
  keywords: "PDF tools, compress PDF, merge PDF, split PDF, PDF converter, free PDF editor, online PDF tools",
}

const pdfTools = [
  {
    name: "PDF Compressor",
    description: "Reduce PDF file size by up to 90% without losing quality",
    icon: FileText,
    href: "/pdf-compressor",
    color: "text-red-500",
    bgColor: "bg-red-50",
    available: true,
  },
  {
    name: "PDF Merger",
    description: "Combine multiple PDF files into one document",
    icon: Merge,
    href: "/pdf-merger",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    available: true,
  },
  {
    name: "PDF Splitter",
    description: "Split large PDF files into smaller documents",
    icon: Split,
    href: "/pdf-splitter",
    color: "text-green-500",
    bgColor: "bg-green-50",
    available: false,
  },
  {
    name: "PDF to Word",
    description: "Convert PDF files to editable Word documents",
    icon: FileText,
    href: "/pdf-to-word",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    available: false,
  },
  {
    name: "PDF Password Remover",
    description: "Remove password protection from PDF files",
    icon: Unlock,
    href: "/pdf-password-remover",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    available: false,
  },
  {
    name: "PDF Password Protector",
    description: "Add password protection to your PDF files",
    icon: Lock,
    href: "/pdf-password-protector",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    available: false,
  },
]

export default function PDFToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "PDF Tools", href: "/pdf-tools" },
        ]}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🔴 Free PDF Tools Online</h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Complete collection of free PDF tools to compress, merge, split, convert, and edit PDF files. All tools work
          directly in your browser - no downloads, no registration required!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {pdfTools.map((tool, index) => (
          <Card
            key={tool.href}
            className={`h-full transition-all duration-200 ${tool.available ? "hover:shadow-lg cursor-pointer" : "opacity-60"}`}
          >
            <CardHeader className="pb-3">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tool.bgColor} mb-3`}>
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              <CardTitle className="text-lg">
                {tool.name}
                {!tool.available && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Coming Soon</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
              {tool.available ? (
                <Link href={tool.href}>
                  <Button className="w-full">Use Tool</Button>
                </Link>
              ) : (
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEO Content */}
      <div className="prose max-w-none">
        <h2>Why Choose Our Free PDF Tools?</h2>
        <p>
          Our PDF tools are designed to handle all your PDF needs without any cost or registration. Whether you need to
          compress large PDF files, merge multiple documents, or split a large PDF into smaller parts, we have the
          perfect tool for you.
        </p>

        <h3>🚀 Key Features</h3>
        <ul>
          <li>
            <strong>100% Free:</strong> No hidden costs or premium plans
          </li>
          <li>
            <strong>No Registration:</strong> Start using tools immediately
          </li>
          <li>
            <strong>Privacy First:</strong> All processing happens in your browser
          </li>
          <li>
            <strong>High Quality:</strong> Maintain document quality during processing
          </li>
          <li>
            <strong>Fast Processing:</strong> Quick results with optimized algorithms
          </li>
          <li>
            <strong>Mobile Friendly:</strong> Works perfectly on all devices
          </li>
        </ul>

        <h3>📄 Popular PDF Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div>
            <h4 className="font-bold text-lg mb-2">Compression</h4>
            <p className="text-sm text-muted-foreground">
              Reduce PDF file size for email attachments, web uploads, or storage optimization. Our compression
              maintains visual quality while significantly reducing file size.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Merging</h4>
            <p className="text-sm text-muted-foreground">
              Combine multiple PDF files into a single document. Perfect for creating reports, presentations, or
              organizing related documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
