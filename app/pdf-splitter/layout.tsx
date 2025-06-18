import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF Splitter - Split PDF Pages Online Free | FreeTools.online",
  description:
    "Split PDF files into individual pages or extract specific page ranges online for free. No registration required, secure processing, works on all devices.",
  keywords: "PDF splitter, split PDF pages, extract PDF pages, PDF page extractor, divide PDF, separate PDF pages",
  alternates: {
    canonical: "https://freetools.online/pdf-splitter",
  },
  openGraph: {
    title: "PDF Splitter - Split PDF Pages Online Free",
    description: "Split PDF files into individual pages or extract specific ranges. Fast, secure, and completely free.",
    url: "https://freetools.online/pdf-splitter",
    type: "website",
  },
}

export default function PDFSplitterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
