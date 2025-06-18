"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { SearchBar } from "@/components/search-bar"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "PDF Tools", href: "/pdf-tools" },
    { name: "Image Tools", href: "/image-tools" },
    { name: "Text Tools", href: "/text-tools" },
    { name: "Developer Tools", href: "/developer-tools" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FT</span>
            </div>
            <span className="font-bold text-xl">FreeTools</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search Bar - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t bg-background px-4 py-3">
        <SearchBar />
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} navigation={navigation} />
    </header>
  )
}
