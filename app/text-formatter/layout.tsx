import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text Formatter - Format and Clean Text Online Free | FreeTools.online",
  description:
    "Format, clean, and organize text online for free. Remove extra spaces, line breaks, special characters, sort lines, add line numbers and more. No registration required.",
  keywords: "text formatter, clean text, format text, remove extra spaces, text cleaner, organize text, line numbers",
  alternates: {
    canonical: "https://freetools.online/text-formatter",
  },
  openGraph: {
    title: "Text Formatter - Format and Clean Text Online Free",
    description:
      "Format, clean, and organize text with multiple formatting options. Perfect for writers and developers.",
    url: "https://freetools.online/text-formatter",
    type: "website",
  },
}

export default function TextFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
