import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Color Picker & Palette Generator - HEX, RGB, HSL Colors | FreeTools.online",
  description:
    "Professional color picker tool with palette generator. Get color codes in HEX, RGB, HSL, HSV, and CMYK formats. Perfect for designers and developers.",
  keywords:
    "color picker, color palette generator, hex color picker, rgb color picker, hsl colors, color converter, design tools",
  alternates: {
    canonical: "https://freetools.online/color-picker",
  },
  openGraph: {
    title: "Color Picker & Palette Generator - Professional Color Tools",
    description:
      "Pick colors, generate palettes, and get color codes in multiple formats. Perfect for designers and developers.",
    url: "https://freetools.online/color-picker",
    type: "website",
  },
}

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
