import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free PDF Compressor - Reduce PDF File Size Online | FreeTools.online",
  description:
    "Compress PDF files online for free. Reduce PDF size without losing quality. Perfect for email attachments, web uploads, and storage. No registration required.",
  keywords:
    "PDF compressor, compress PDF online, reduce PDF size, PDF file size reducer, free PDF compression, online PDF tools",
  alternates: {
    canonical: "https://freetools.online/pdf-compressor",
  },
  openGraph: {
    title: "Free PDF Compressor - Reduce PDF File Size Online",
    description:
      "Compress PDF files online for free. Reduce PDF size without losing quality. Perfect for email attachments and web uploads.",
    url: "https://freetools.online/pdf-compressor",
    type: "website",
  },
}

export default function PDFCompressorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
