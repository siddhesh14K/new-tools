"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const allTools = [
  {
    name: "PDF Compressor",
    href: "/pdf-compressor",
    category: "PDF Tools",
    description: "Compress PDF files up to 90%",
  },
  { name: "PDF Merger", href: "/pdf-merger", category: "PDF Tools", description: "Combine multiple PDF files" },
  { name: "PDF Splitter", href: "/pdf-splitter", category: "PDF Tools", description: "Split PDF into pages" },
  {
    name: "Image Compressor",
    href: "/image-compressor",
    category: "Image Tools",
    description: "Compress images without quality loss",
  },
  {
    name: "Image Resizer",
    href: "/image-resizer",
    category: "Image Tools",
    description: "Resize images to any dimension",
  },
  {
    name: "Background Remover",
    href: "/background-remover",
    category: "Image Tools",
    description: "Remove image backgrounds with AI",
  },
  { name: "Word Counter", href: "/word-counter", category: "Text Tools", description: "Count words and characters" },
  { name: "Case Converter", href: "/case-converter", category: "Text Tools", description: "Convert text case formats" },
  { name: "Text Formatter", href: "/text-formatter", category: "Text Tools", description: "Format and clean text" },
  {
    name: "Lorem Generator",
    href: "/lorem-generator",
    category: "Text Tools",
    description: "Generate Lorem Ipsum text",
  },
  {
    name: "JSON Formatter",
    href: "/json-formatter",
    category: "Developer Tools",
    description: "Format and validate JSON",
  },
  { name: "Base64 Encoder", href: "/base64-encoder", category: "Developer Tools", description: "Encode/decode Base64" },
  {
    name: "Hash Generator",
    href: "/hash-generator",
    category: "Security Tools",
    description: "Generate MD5, SHA hashes",
  },
  {
    name: "Password Generator",
    href: "/password-generator",
    category: "Security Tools",
    description: "Generate secure passwords",
  },
  { name: "QR Generator", href: "/qr-generator", category: "Utility Tools", description: "Create QR codes instantly" },
  { name: "Color Picker", href: "/color-picker", category: "Design Tools", description: "Pick and convert colors" },
  { name: "URL Shortener", href: "/url-shortener", category: "Utility Tools", description: "Shorten long URLs" },
  {
    name: "Unit Converter",
    href: "/unit-converter",
    category: "Calculator Tools",
    description: "Convert units and measurements",
  },
  {
    name: "Date Calculator",
    href: "/date-calculator",
    category: "Calculator Tools",
    description: "Calculate dates and time",
  },
  {
    name: "Percentage Calculator",
    href: "/percentage-calculator",
    category: "Calculator Tools",
    description: "Calculate percentages",
  },
  {
    name: "Meta Tag Generator",
    href: "/meta-tag-generator",
    category: "SEO Tools",
    description: "Generate SEO meta tags",
  },
  { name: "SEO Analyzer", href: "/seo-analyzer", category: "SEO Tools", description: "Analyze website SEO" },
]

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredTools, setFilteredTools] = useState(allTools)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredTools(allTools)
    } else {
      const filtered = allTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase()) ||
          tool.category.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredTools(filtered)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToolClick = () => {
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 h-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {filteredTools.length > 0 ? (
              <div className="py-2">
                {filteredTools.slice(0, 8).map((tool, index) => (
                  <Link key={tool.href} href={tool.href} onClick={handleToolClick}>
                    <div className="px-4 py-3 hover:bg-muted cursor-pointer border-b last:border-b-0">
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{tool.description}</div>
                      <div className="text-xs text-primary mt-1">{tool.category}</div>
                    </div>
                  </Link>
                ))}
                {filteredTools.length > 8 && (
                  <div className="px-4 py-2 text-xs text-muted-foreground text-center border-t">
                    +{filteredTools.length - 8} more tools found
                  </div>
                )}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tools found for "{query}"</p>
                <p className="text-xs mt-1">Try searching for PDF, Image, Text, or other keywords</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
