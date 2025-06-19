"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Breadcrumb } from "@/components/breadcrumb"
import { EnhancedBreadcrumb } from "./enhanced-breadcrumb"
import { HowToSchema } from "./how-to-schema"
import { FAQ } from "./faq"
import { Analytics } from "./analytics"
import type { Metadata } from "next"

interface ToolLayoutProps {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
  keywords?: string
  toolCategory: string
  howToSteps: Array<{ name: string; text: string; image?: string }>
  faqs: Array<{ question: string; answer: string }>
  breadcrumbs: Array<{ label: string; path: string }>
  lastUpdated: string
  estimatedTime?: string
}

export function ToolLayout({
  title,
  description,
  icon,
  children,
  keywords,
  toolCategory,
  howToSteps,
  faqs,
  breadcrumbs,
  lastUpdated,
  estimatedTime,
}: ToolLayoutProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: title,
            applicationCategory: "WebApplication",
            operatingSystem: "Any",
            dateModified: lastUpdated,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <EnhancedBreadcrumb items={breadcrumbs} />

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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="text-sm text-muted-foreground mt-2">
            Last Updated: {lastUpdated}
          </div>
        </header>

        {/* Tool Content */}
        <div className="mb-12">{children}</div>

        <FAQ category={toolCategory} questions={faqs} />

        <HowToSchema
          name={title}
          description={description}
          steps={howToSteps}
          totalTime={estimatedTime}
          toolCategory={toolCategory}
        />

        <Analytics />
      </div>
    </>
  )
}
