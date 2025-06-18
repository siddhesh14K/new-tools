import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Background Remover - Remove Image Background Online Free | FreeTools.online",
  description:
    "Remove image backgrounds automatically using AI technology. Perfect for product photos, portraits, and graphics. No registration required, works on all devices.",
  keywords: "background remover, remove image background, AI background removal, transparent background, photo editor",
  alternates: {
    canonical: "https://freetools.online/background-remover",
  },
  openGraph: {
    title: "AI Background Remover - Remove Image Background Online Free",
    description: "Remove image backgrounds automatically using AI. Perfect for product photos and portraits.",
    url: "https://freetools.online/background-remover",
    type: "website",
  },
}

export default function BackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
