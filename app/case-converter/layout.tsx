import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Converter - Text Case Changer Online | FreeTools.online",
  description:
    "Convert text to different cases online: uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more. Free text case converter tool.",
  keywords:
    "case converter, text case changer, uppercase converter, lowercase converter, camelCase, snake_case, kebab-case, title case",
  alternates: {
    canonical: "https://freetools.online/case-converter",
  },
  openGraph: {
    title: "Case Converter - Text Case Changer Online",
    description: "Convert text to different cases: uppercase, lowercase, camelCase, snake_case and more.",
    url: "https://freetools.online/case-converter",
    type: "website",
  },
}

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
