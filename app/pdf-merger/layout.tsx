import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF Merger - Combine Multiple PDFs Online Free | FreeTools.online",
  description:
    "Merge multiple PDF files into one document online for free. Combine PDFs in any order, rearrange pages, no registration required. Fast and secure PDF merging tool.",
  keywords: "PDF merger, combine PDFs, merge PDF files online, PDF joiner, combine PDF documents, free PDF merger",
  alternates: {
    canonical: "https://freetools.online/pdf-merger",
  },
  openGraph: {
    title: "PDF Merger - Combine Multiple PDFs Online Free",
    description: "Merge multiple PDF files into one document online for free. Fast, secure, and easy to use.",
    url: "https://freetools.online/pdf-merger",
    type: "website",
  },
}

export default function PDFMergerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
