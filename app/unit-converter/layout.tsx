import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Unit Converter - Weight, Length, Temperature - Mobile Tools",
  description:
    "Convert between different units instantly. Support for weight (kg, lb), length (m, ft), temperature (°C, °F), and volume conversions on mobile.",
  keywords: "unit converter, kg to lb, meter to feet, celsius to fahrenheit, mobile converter",
}

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
