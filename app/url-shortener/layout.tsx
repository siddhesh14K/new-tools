import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "URL Shortener - Create Short Links Instantly | Free Online Tools",
  description:
    "Free online URL shortener tool. Create short, memorable links that redirect to your original URL. No registration required.",
  keywords: "URL shortener, link shortener, short URL, tiny URL, URL redirect, free URL shortener, custom URL",
  openGraph: {
    title: "URL Shortener - Create Short Links Instantly | Free Online Tools",
    description:
      "Free online URL shortener tool. Create short, memorable links that redirect to your original URL. No registration required.",
    type: "website",
  },
}

export default function URLShortenerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
