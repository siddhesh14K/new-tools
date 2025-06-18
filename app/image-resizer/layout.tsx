import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image Resizer - Resize Images Online Free | FreeTools.online",
  description:
    "Resize images online for free. Change image dimensions for social media, web, print. Maintain aspect ratio or custom resize. Support JPG, PNG, WebP formats.",
  keywords:
    "image resizer, resize images online, change image size, image dimensions, social media image sizes, photo resizer",
  alternates: {
    canonical: "https://freetools.online/image-resizer",
  },
  openGraph: {
    title: "Image Resizer - Resize Images Online Free",
    description: "Resize images online for free. Perfect for social media, web, and print with preset sizes.",
    url: "https://freetools.online/image-resizer",
    type: "website",
  },
}

export default function ImageResizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
