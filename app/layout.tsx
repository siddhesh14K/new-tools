import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mobile Tools - Essential Utilities for Your Phone",
  description:
    "Premium mobile-optimized tools including JSON formatter, word counter, date calculator, unit converter, and Base64 encoder. Fast, accurate, and easy to use.",
  keywords: "mobile tools, JSON formatter, word counter, date calculator, unit converter, Base64 encoder, utilities",
  authors: [{ name: "Mobile Tools" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            {children}
            <Navigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
