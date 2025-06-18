import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Word Counter & Text Analyzer - Mobile Tools",
  description:
    "Count words, characters, sentences and paragraphs in real-time. Perfect for essays, articles, and social media posts on mobile.",
  keywords: "word counter, character counter, text analyzer, mobile word count, essay counter",
}

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
