import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON Formatter & Beautifier - Mobile Tools",
  description:
    "Format, validate and beautify JSON data instantly on your mobile device. Free online JSON formatter with syntax highlighting and error detection.",
  keywords: "JSON formatter, JSON beautifier, JSON validator, mobile JSON tool, format JSON online",
}

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
