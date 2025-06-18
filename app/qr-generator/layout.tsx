import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free QR Code Generator - Create Custom QR Codes Online | FreeTools.online",
  description:
    "Generate QR codes for URLs, text, email, phone numbers, and WiFi networks. Free online QR code generator with customizable size and error correction.",
  keywords:
    "QR code generator, create QR code, QR code maker, free QR generator, custom QR codes, WiFi QR code, URL QR code",
  alternates: {
    canonical: "https://freetools.online/qr-generator",
  },
  openGraph: {
    title: "Free QR Code Generator - Create Custom QR Codes Online",
    description: "Generate QR codes for URLs, text, email, phone numbers, and WiFi networks. Free and easy to use.",
    url: "https://freetools.online/qr-generator",
    type: "website",
  },
}

export default function QRGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
