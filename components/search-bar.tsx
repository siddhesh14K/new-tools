"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import Link from "next/link"

interface Tool {
  id: string
  title: string
  description: string
  href: string
  category: string
}

const tools: Tool[] = [
  {
    id: "pdf-compressor",
    title: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    href: "/pdf-compressor",
    category: "PDF Tools",
  },
  {
    id: "pdf-merger",
    title: "PDF Merger",
    description: "Combine multiple PDF files into one document",
    href: "/pdf-merger",
    category: "PDF Tools",
  },
  {
    id: "pdf-splitter",
    title: "PDF Splitter",
    description: "Extract pages or split PDF into multiple files",
    href: "/pdf-splitter",
    category: "PDF Tools",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress images without losing quality",
    href: "/image-compressor",
    category: "Image Tools",
  },
  {
    id: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to specific dimensions",
    href: "/image-resizer",
    category: "Image Tools",
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "Remove background from images automatically",
    href: "/background-remover",
    category: "Image Tools",
  },
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, and paragraphs",
    href: "/word-counter",
    category: "Text Tools",
  },
  {
    id: "text-formatter",
    title: "Text Formatter",
    description: "Format and beautify text content",
    href: "/text-formatter",
    category: "Text Tools",
  },
  {
    id: "case-converter",
    title: "Case Converter",
    description: "Convert text between different cases",
    href: "/case-converter",
    category: "Text Tools",
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON data",
    href: "/json-formatter",
    category: "Developer Tools",
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    href: "/base64-encoder",
    category: "Developer Tools",
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert between different units of measurement",
    href: "/unit-converter",
    category: "Calculators",
  },
  {
    id: "date-calculator",
    title: "Date Calculator",
    description: "Calculate differences between dates",
    href: "/date-calculator",
    category: "Calculators",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate secure random passwords",
    href: "/password-generator",
    category: "Security Tools",
  },
  {
    id: "qr-generator",
    title: "QR Generator",
    description: "Create custom QR codes for any content",
    href: "/qr-generator",
    category: "Developer Tools",
  },
  {
    id: "color-picker",
    title: "Color Picker",
    description: "Select and convert between color formats",
    href: "/color-picker",
    category: "Design Tools",
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes",
    href: "/hash-generator",
    category: "Security Tools",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages, increases and decreases",
    href: "/percentage-calculator",
    category: "Calculators",
  },
  {
    id: "lorem-generator",
    title: "Lorem Generator",
    description: "Generate Lorem Ipsum placeholder text",
    href: "/lorem-generator",
    category: "Text Tools",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Create short links for long URLs",
    href: "/url-shortener",
    category: "Web Tools",
  },
  {
    id: "meta-tag-generator",
    title: "Meta Tag Generator",
    description: "Create meta tags for better SEO",
    href: "/meta-tag-generator",
    category: "SEO Tools",
  },
]

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Tool[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }

    const filteredResults = tools.filter((tool) => {
      const searchTerm = query.toLowerCase()
      return (
        tool.title.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.category.toLowerCase().includes(searchTerm)
      )
    })

    setResults(filteredResults)
    setIsOpen(true)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && results.length > 0) {
      router.push(results[0].href)
      setIsOpen(false)
      setQuery("")
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="search"
          placeholder="Search for tools... (e.g., PDF compressor, image resizer)"
          className="pl-10 pr-10 h-12 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={clearSearch}>
            <X className="h-5 w-5" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-background rounded-md shadow-lg border border-border max-h-[60vh] overflow-auto">
          <ul className="py-2">
            {results.map((tool) => (
              <li key={tool.id}>
                <Link
                  href={tool.href}
                  className="flex flex-col px-4 py-3 hover:bg-muted transition-colors"
                  onClick={() => {
                    setIsOpen(false)
                    setQuery("")
                  }}
                >
                  <span className="font-medium">{tool.title}</span>
                  <span className="text-sm text-muted-foreground">{tool.description}</span>
                  <span className="text-xs text-muted-foreground mt-1">{tool.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-background rounded-md shadow-lg border border-border p-4 text-center">
          <p className="text-muted-foreground">No tools found matching "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  )
}
