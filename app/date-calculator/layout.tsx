import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Date Calculator - Days Between Dates - Mobile Tools",
  description:
    "Calculate the exact difference between two dates. Get results in days, weeks, months, and years with our mobile-optimized date calculator.",
  keywords: "date calculator, days between dates, date difference, mobile date tool, calculate dates",
}

export default function DateCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
