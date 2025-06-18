import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Placeholder Text Generator | FreeTools.online",
  description:
    "Generate Lorem Ipsum placeholder text for your designs. Create words, sentences, paragraphs, and lists instantly. Free Lorem Ipsum generator tool.",
  keywords:
    "lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum, text generator, design placeholder",
  alternates: {
    canonical: "https://freetools.online/lorem-generator",
  },
  openGraph: {
    title: "Lorem Ipsum Generator - Placeholder Text Generator",
    description:
      "Generate Lorem Ipsum placeholder text for your designs and layouts. Create words, sentences, paragraphs instantly.",
    url: "https://freetools.online/lorem-generator",
    type: "website",
  },
}

export default function LoremGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
