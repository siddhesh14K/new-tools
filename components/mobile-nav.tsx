"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  X,
  FileText,
  ImageIcon,
  Type,
  Code,
  Calculator,
  Shield,
  Palette,
  Globe,
  ChevronRight,
  Home,
  Info,
  Mail,
  HelpCircle,
} from "lucide-react"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const toolCategories = [
  {
    title: "PDF Tools",
    icon: FileText,
    color: "text-red-500",
    tools: [
      { name: "PDF Compressor", href: "/pdf-compressor", description: "Reduce PDF file size" },
      { name: "PDF Merger", href: "/pdf-merger", description: "Combine multiple PDFs" },
      { name: "PDF Splitter", href: "/pdf-splitter", description: "Split PDF pages" },
      { name: "PDF to Word", href: "/pdf-to-word", description: "Convert PDF to DOC" },
      { name: "PDF Password Remover", href: "/pdf-password-remover", description: "Remove PDF passwords" },
    ],
  },
  {
    title: "Image Tools",
    icon: ImageIcon,
    color: "text-blue-500",
    tools: [
      { name: "Image Compressor", href: "/image-compressor", description: "Compress images" },
      { name: "Image Resizer", href: "/image-resizer", description: "Resize images" },
      { name: "Background Remover", href: "/background-remover", description: "Remove backgrounds" },
      { name: "Image Converter", href: "/image-converter", description: "Convert formats" },
      { name: "Photo Editor", href: "/photo-editor", description: "Edit photos online" },
    ],
  },
  {
    title: "Text Tools",
    icon: Type,
    color: "text-green-500",
    tools: [
      { name: "Word Counter", href: "/word-counter", description: "Count words & characters" },
      { name: "Case Converter", href: "/case-converter", description: "Change text case" },
      { name: "Text Formatter", href: "/text-formatter", description: "Format text" },
      { name: "Lorem Generator", href: "/lorem-generator", description: "Generate placeholder text" },
      { name: "Duplicate Remover", href: "/duplicate-remover", description: "Remove duplicate lines" },
    ],
  },
  {
    title: "Developer Tools",
    icon: Code,
    color: "text-purple-500",
    tools: [
      { name: "JSON Formatter", href: "/json-formatter", description: "Format & validate JSON" },
      { name: "Base64 Encoder", href: "/base64-encoder", description: "Encode/decode Base64" },
      { name: "Hash Generator", href: "/hash-generator", description: "Generate hashes" },
      { name: "QR Generator", href: "/qr-generator", description: "Create QR codes" },
      { name: "URL Encoder", href: "/url-encoder", description: "Encode URLs" },
    ],
  },
  {
    title: "Calculators",
    icon: Calculator,
    color: "text-orange-500",
    tools: [
      { name: "Unit Converter", href: "/unit-converter", description: "Convert units" },
      { name: "Date Calculator", href: "/date-calculator", description: "Calculate dates" },
      { name: "Percentage Calculator", href: "/percentage-calculator", description: "Calculate percentages" },
      { name: "Age Calculator", href: "/age-calculator", description: "Calculate age" },
      { name: "BMI Calculator", href: "/bmi-calculator", description: "Calculate BMI" },
    ],
  },
  {
    title: "Security Tools",
    icon: Shield,
    color: "text-red-600",
    tools: [
      { name: "Password Generator", href: "/password-generator", description: "Generate secure passwords" },
      { name: "Password Strength Checker", href: "/password-checker", description: "Check password strength" },
      { name: "Random Generator", href: "/random-generator", description: "Generate random data" },
    ],
  },
  {
    title: "Design Tools",
    icon: Palette,
    color: "text-pink-500",
    tools: [
      { name: "Color Picker", href: "/color-picker", description: "Pick & convert colors" },
      { name: "Gradient Generator", href: "/gradient-generator", description: "Create gradients" },
      { name: "CSS Generator", href: "/css-generator", description: "Generate CSS code" },
    ],
  },
  {
    title: "Web Tools",
    icon: Globe,
    color: "text-cyan-500",
    tools: [
      { name: "URL Shortener", href: "/url-shortener", description: "Shorten long URLs" },
      { name: "Meta Tag Generator", href: "/meta-tag-generator", description: "Generate meta tags" },
      { name: "Robots.txt Generator", href: "/robots-generator", description: "Create robots.txt" },
    ],
  },
]

const quickLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Close mobile nav when route changes
  useEffect(() => {
    if (isOpen) {
      const handleRouteChange = () => onClose()
      // Listen for route changes (simplified)
      window.addEventListener("popstate", handleRouteChange)
      return () => window.removeEventListener("popstate", handleRouteChange)
    }
  }, [isOpen, onClose])

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategory(expandedCategory === categoryTitle ? null : categoryTitle)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:w-80 p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-left">
              <Link href="/" onClick={onClose} className="flex items-center space-x-2">
                <div className="bg-primary text-primary-foreground rounded-lg p-2">
                  <span className="text-lg font-bold">FT</span>
                </div>
                <span className="text-lg font-bold">FreeTools.online</span>
              </Link>
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">Quick Links</h3>
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tool Categories */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                Tool Categories
              </h3>
              <div className="space-y-2">
                {toolCategories.map((category) => (
                  <div key={category.title}>
                    <button
                      onClick={() => toggleCategory(category.title)}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className={`h-5 w-5 ${category.color}`} />
                        <span className="font-medium">{category.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.tools.length}
                        </Badge>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedCategory === category.title ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {expandedCategory === category.title && (
                      <div className="ml-8 mt-2 space-y-1">
                        {category.tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={onClose}
                            className="block p-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div className="font-medium text-sm">{tool.name}</div>
                            <div className="text-xs text-muted-foreground">{tool.description}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Popular Tools */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                🔥 Popular Tools
              </h3>
              <div className="space-y-1">
                <Link
                  href="/pdf-compressor"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-red-500" />
                    <span className="font-medium">PDF Compressor</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Hot
                  </Badge>
                </Link>
                <Link
                  href="/image-compressor"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Image Compressor</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                </Link>
                <Link
                  href="/word-counter"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Type className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Word Counter</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Trending
                  </Badge>
                </Link>
              </div>
            </div>

            <Separator />

            {/* Footer Info */}
            <div className="text-center text-xs text-muted-foreground space-y-2 pb-4">
              <p>© 2024 FreeTools.online</p>
              <p>100+ Free Online Tools</p>
              <p>No Registration Required</p>
              <div className="flex justify-center space-x-4 mt-3">
                <Link href="/privacy" onClick={onClose} className="hover:text-primary">
                  Privacy
                </Link>
                <Link href="/terms" onClick={onClose} className="hover:text-primary">
                  Terms
                </Link>
                <Link href="/contact" onClick={onClose} className="hover:text-primary">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
