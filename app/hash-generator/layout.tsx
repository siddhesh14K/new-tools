import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-256, SHA-512 Online Tool | FreeTools.online",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-512, CRC32 hashes and Base64 encoding online. Free cryptographic hash generator for text and files.",
  keywords:
    "hash generator, MD5 generator, SHA-256 generator, SHA-512 generator, CRC32 checksum, Base64 encoder, cryptographic hash",
  alternates: {
    canonical: "https://freetools.online/hash-generator",
  },
  openGraph: {
    title: "Hash Generator - MD5, SHA-256, SHA-512 Online Tool",
    description: "Generate secure cryptographic hashes for text and files. Support for multiple hash algorithms.",
    url: "https://freetools.online/hash-generator",
    type: "website",
  },
}

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
