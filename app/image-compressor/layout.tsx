import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image Compressor - Reduce Image Size Online Free | FreeTools.online",
  description:
    "Compress images online without losing quality. Reduce JPG, PNG, WebP file sizes for web, email, and storage. Fast, free, and secure image compression.",
  keywords:
    "image compressor, compress images online, reduce image size, image optimizer, JPG compressor, PNG compressor, WebP compression",
  alternates: {
    canonical: "https://freetools.online/image-compressor",
  },
  openGraph: {
    title: "Image Compressor - Reduce Image Size Online Free",
    description: "Compress images online without losing quality. Fast, free, and secure image compression tool.",
    url: "https://freetools.online/image-compressor",
    type: "website",
  },
}

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
