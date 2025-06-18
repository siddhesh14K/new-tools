import type React from "react"
export const metadata = {
  title: "Meta Tag Generator - Create SEO Meta Tags | Mobile Tools",
  description:
    "Generate comprehensive HTML meta tags for SEO optimization. Create Open Graph tags, Twitter Cards, and structured data for better search rankings.",
  keywords: "meta tag generator, SEO tags, Open Graph, Twitter Cards, HTML meta tags, SEO optimization",
  openGraph: {
    title: "Free Meta Tag Generator - SEO Optimization Tool",
    description:
      "Create comprehensive HTML meta tags for better SEO. Generate Open Graph tags, Twitter Cards, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Tag Generator - SEO Tool",
    description: "Generate HTML meta tags for SEO optimization and social media sharing.",
  },
}

export default function MetaTagGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
