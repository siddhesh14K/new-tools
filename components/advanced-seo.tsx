"use client"

import { usePathname } from "next/navigation"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  toolName?: string
  category?: string
}

export function AdvancedSEO({ title, description, keywords, toolName, category }: SEOProps) {
  const pathname = usePathname()
  const baseUrl = "https://freetools.online"
  const currentUrl = `${baseUrl}${pathname}`

  // Tool-specific schema
  const toolSchema = toolName
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: toolName,
        applicationCategory: "WebApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "15420",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Organization",
          name: "FreeTools.online",
        },
        datePublished: "2024-01-01",
        description: description,
        url: currentUrl,
        screenshot: `${baseUrl}/screenshots/${toolName.toLowerCase().replace(/\s+/g, "-")}.jpg`,
        softwareVersion: "2.0",
        downloadUrl: currentUrl,
        featureList: [
          "No registration required",
          "100% free to use",
          "Privacy-focused processing",
          "Mobile-friendly interface",
          "Instant results",
        ],
      }
    : null

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category || "Tools",
        item: `${baseUrl}/${category?.toLowerCase().replace(/\s+/g, "-") || "tools"}`,
      },
      ...(toolName
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: toolName,
              item: currentUrl,
            },
          ]
        : []),
    ],
  }

  // How-to schema for tools
  const howToSchema = toolName
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use ${toolName}`,
        description: `Step-by-step guide to use our free ${toolName} online`,
        image: `${baseUrl}/screenshots/${toolName.toLowerCase().replace(/\s+/g, "-")}.jpg`,
        totalTime: "PT2M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: "0",
        },
        supply: [
          {
            "@type": "HowToSupply",
            name: "Internet connection",
          },
          {
            "@type": "HowToSupply",
            name: "Web browser",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: toolName,
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Upload or input your data",
            text: "Select your file or enter the data you want to process",
            image: `${baseUrl}/steps/step1.jpg`,
          },
          {
            "@type": "HowToStep",
            name: "Configure settings",
            text: "Adjust any settings or options as needed",
            image: `${baseUrl}/steps/step2.jpg`,
          },
          {
            "@type": "HowToStep",
            name: "Process and download",
            text: "Click the process button and download your result",
            image: `${baseUrl}/steps/step3.jpg`,
          },
        ],
      }
    : null

  return (
    <>
      {/* Enhanced Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="revisit-after" content="1 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />

      {/* Rich Snippets */}
      <meta name="article:author" content="FreeTools.online" />
      <meta name="article:publisher" content="https://freetools.online" />
      <meta name="article:section" content={category || "Tools"} />

      {/* Schema Markup */}
      {toolSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
    </>
  )
}
