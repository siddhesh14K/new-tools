import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { JsonLdSchema } from "@/components/json-ld-schema"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://freetools.site"),
  title: {
    default: "Free Online Tools 2024 - 100+ PDF, Image, Text, Video, SEO Tools | FreeTools.online",
    template: "%s | FreeTools.online - Free Online Tools 2024",
  },
  description:
    "🚀 100+ Free Online Tools 2024! PDF compressor, image editor, text converter, video tools, SEO analyzer, QR generator, password creator, unit converter, color picker, hash generator, JSON formatter, Base64 encoder, word counter, date calculator & more. Fast, secure, mobile-friendly tools for students, developers, designers, marketers. No registration required!",
  applicationName: "FreeTools.online",
  authors: [{ name: "FreeTools.online Team" }],
  creator: "FreeTools.online",
  publisher: "FreeTools.online",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: true,
    url: true,
  },
  openGraph: {
    type: "website",
    siteName: "FreeTools.online",
    title: "Free Online Tools 2024 - 100+ PDF, Image, Text, Video, SEO Tools",
    description: "🚀 100+ Free Online Tools for PDF, Image, Text, Video & SEO. Fast, secure, and free - no registration required!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FreeTools.online - Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools 2024",
    description: "100+ Free Online Tools for PDF, Image, Text, Video & SEO",
    images: ["/twitter-image.png"],
    creator: "@freetools",
  },
  verification: {
    google: "your-google-verification-code"
  },
  category: "Technology",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FreeTools.online",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Suspense>
            <main className="min-h-screen">
              {children}
            </main>
          </Suspense>
          <Footer />
          <Analytics />
          <JsonLdSchema />
        </ThemeProvider>
      </body>
    </html>
  )
}
