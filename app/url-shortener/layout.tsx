import type React from "react"
export const metadata = {
  title: "URL Shortener - Free Link Shortener Tool | Mobile Tools",
  description:
    "Shorten long URLs instantly with our free URL shortener tool. Create custom short links, track clicks, and manage your URLs easily. No registration required.",
  keywords: "url shortener, link shortener, short url, custom links, click tracking, free url shortener",
  openGraph: {
    title: "Free URL Shortener Tool - Create Short Links Instantly",
    description:
      "Shorten long URLs and create custom short links with click tracking. Fast, free, and secure URL shortener tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free URL Shortener Tool - Create Short Links",
    description: "Shorten URLs instantly with our free tool. Custom links and click tracking included.",
  },
}

export default function URLShortenerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
