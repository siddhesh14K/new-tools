import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://freetools.online"),
  title: {
    default: "Free Online Tools 2024 - 100+ PDF, Image, Text, Video, SEO Tools | FreeTools.online",
    template: "%s | FreeTools.online - Free Online Tools 2024",
  },
  description:
    "🚀 100+ Free Online Tools 2024! PDF compressor, image editor, text converter, video tools, SEO analyzer, QR generator, password creator, unit converter, color picker, hash generator, JSON formatter, Base64 encoder, word counter, date calculator & more. Fast, secure, mobile-friendly tools for students, developers, designers, marketers. No registration required!",
  keywords: [
    // Primary Keywords
    "free online tools 2024",
    "online tools free",
    "web tools online",
    "free internet tools",
    "online utilities free",

    // PDF Tools
    "PDF compressor online free",
    "compress PDF without losing quality",
    "PDF merger online",
    "PDF splitter free",
    "PDF to Word converter",
    "PDF editor online",

    // Image Tools
    "image compressor online",
    "compress images free",
    "image resizer online",
    "photo editor online",
    "background remover free",
    "image converter online",
    "JPEG compressor",
    "PNG optimizer",

    // Text Tools
    "word counter online",
    "character counter free",
    "text case converter",
    "Lorem ipsum generator",
    "text formatter online",
    "duplicate text remover",

    // Developer Tools
    "JSON formatter online",
    "JSON validator free",
    "Base64 encoder decoder",
    "hash generator online",
    "MD5 generator",
    "SHA256 generator",
    "URL encoder decoder",
    "HTML encoder",

    // SEO Tools
    "SEO analyzer free",
    "keyword density checker",
    "meta tag generator",
    "robots.txt generator",
    "sitemap generator",
    "backlink checker",

    // Utility Tools
    "QR code generator free",
    "password generator secure",
    "random password creator",
    "unit converter online",
    "currency converter",
    "color picker tool",
    "hex color picker",

    // Calculator Tools
    "percentage calculator",
    "date calculator",
    "age calculator",
    "BMI calculator",
    "loan calculator",
    "tip calculator",

    // Video Tools
    "video compressor online",
    "video converter free",
    "video trimmer online",
    "MP4 compressor",

    // Long-tail Keywords
    "best free online tools 2024",
    "free tools for students",
    "free tools for developers",
    "free tools for designers",
    "free tools for marketers",
    "online tools no registration",
    "mobile friendly online tools",
    "secure online tools",
    "fast online tools",
    "professional online tools",
  ].join(", "),
  authors: [{ name: "FreeTools.online Team" }],
  creator: "FreeTools.online",
  publisher: "FreeTools.online",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freetools.online",
    siteName: "FreeTools.online - Free Online Tools 2024",
    title: "🚀 100+ Free Online Tools 2024 - PDF, Image, Text, Video, SEO Tools",
    description:
      "Discover 100+ free online tools for PDF compression, image editing, text conversion, video processing, SEO analysis & more. Fast, secure, mobile-friendly. No registration required!",
    images: [
      {
        url: "/og-image-tools.jpg",
        width: 1200,
        height: 630,
        alt: "FreeTools.online - 100+ Free Online Tools 2024",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🚀 100+ Free Online Tools 2024 - PDF, Image, Text, Video, SEO Tools",
    description:
      "Discover 100+ free online tools for PDF, image, text, video, SEO & more. Fast, secure, mobile-friendly!",
    images: ["/twitter-card-tools.jpg"],
    creator: "@freetoolsonline",
    site: "@freetoolsonline",
  },
  verification: {
    google: "GM14aJf8c1KTG5kPAEAKwsZ5KeckqJKORY3tN68r5Hs",
    yandex: "verification_code_here",
    bing: "verification_code_here",
  },
  alternates: {
    canonical: "https://freetools.online",
    languages: {
      "en-US": "https://freetools.online",
      "es-ES": "https://freetools.online/es",
      "fr-FR": "https://freetools.online/fr",
      "de-DE": "https://freetools.online/de",
    },
  },
  category: "Technology",
  classification: "Online Tools",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FreeTools.online - Free Online Tools 2024",
  description:
    "100+ free online tools for PDF compression, image editing, text conversion, video processing, SEO analysis and more.",
  url: "https://freetools.online",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://freetools.online/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "FreeTools.online",
    url: "https://freetools.online",
    logo: {
      "@type": "ImageObject",
      url: "https://freetools.online/logo.png",
      width: 512,
      height: 512,
    },
    sameAs: [
      "https://twitter.com/freetoolsonline",
      "https://facebook.com/freetoolsonline",
      "https://linkedin.com/company/freetoolsonline",
      "https://github.com/freetoolsonline",
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Free Online Tools Collection",
    description: "Comprehensive collection of 100+ free online tools",
    numberOfItems: 100,
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        name: "PDF Compressor",
        description: "Compress PDF files online for free without losing quality",
        url: "https://freetools.online/pdf-compressor",
        applicationCategory: "Utility",
        operatingSystem: "Web Browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Image Compressor",
        description: "Compress images online without losing quality",
        url: "https://freetools.online/image-compressor",
        applicationCategory: "Utility",
        operatingSystem: "Web Browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="canonical" href="https://freetools.online" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="google-site-verification" content="GM14aJf8c1KTG5kPAEAKwsZ5KeckqJKORY3tN68r5Hs" />
        <meta name="msvalidate.01" content="bing_verification_code" />
        <meta name="yandex-verification" content="yandex_verification_code" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Suspense>{children}</Suspense>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
