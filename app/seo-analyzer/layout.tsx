import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEO Analyzer - Free Website SEO Analysis Tool | FreeTools.online",
  description:
    "Analyze your website's SEO performance for free. Check meta tags, content structure, page speed, mobile optimization, and get actionable recommendations to improve search rankings.",
  keywords:
    "SEO analyzer, website SEO analysis, SEO audit tool, meta tag checker, SEO score, website optimization, search engine optimization",
  alternates: {
    canonical: "https://freetools.online/seo-analyzer",
  },
  openGraph: {
    title: "SEO Analyzer - Free Website SEO Analysis Tool",
    description:
      "Get a comprehensive SEO analysis of any website with actionable recommendations to improve search rankings.",
    url: "https://freetools.online/seo-analyzer",
    type: "website",
  },
}

export default function SEOAnalyzerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
