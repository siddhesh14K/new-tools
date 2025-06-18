"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Breadcrumb } from "@/components/breadcrumb"
import type { ReactNode } from "react"

interface ToolLayoutProps {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
  keywords?: string
}

export function ToolLayout({ title, description, icon, children, keywords }: ToolLayoutProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: title, href: "#" },
  ]

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    url: typeof window !== "undefined" ? window.location.href : "",
    applicationCategory: "Utility",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "FreeTools.online",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="touch-target">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>

        {/* Tool Header */}
        <header className="text-center mb-8">
          <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            {icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
        </header>

        {/* Tool Content */}
        <div className="mb-12">{children}</div>
      </div>
    </>
  )
}
