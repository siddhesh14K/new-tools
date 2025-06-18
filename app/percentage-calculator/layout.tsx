import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Online | FreeTools.online",
  description:
    "Calculate percentages, percentage increase/decrease, discounts, tips, and more. Free online percentage calculator with instant results.",
  keywords:
    "percentage calculator, calculate percentage, percentage increase, percentage decrease, discount calculator, tip calculator",
  alternates: {
    canonical: "https://freetools.online/percentage-calculator",
  },
  openGraph: {
    title: "Percentage Calculator - Calculate Percentages Online",
    description: "Calculate percentages, percentage increase/decrease, discounts, tips, and more with instant results.",
    url: "https://freetools.online/percentage-calculator",
    type: "website",
  },
}

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
