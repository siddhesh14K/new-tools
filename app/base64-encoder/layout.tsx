import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Mobile Tools",
  description:
    "Encode and decode Base64 strings securely on your mobile device. Support for text files and instant conversion with copy and download features.",
  keywords: "Base64 encoder, Base64 decoder, encode Base64, decode Base64, mobile Base64 tool",
}

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
