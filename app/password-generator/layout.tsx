import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Secure Password Generator - Create Strong Passwords Online | FreeTools.online",
  description:
    "Generate strong, secure passwords with our free online password generator. Customizable length, character sets, and real-time strength analysis. No registration required.",
  keywords:
    "password generator, secure password, strong password, random password generator, password creator, online password tool",
  alternates: {
    canonical: "https://freetools.online/password-generator",
  },
  openGraph: {
    title: "Secure Password Generator - Create Strong Passwords Online",
    description:
      "Generate strong, secure passwords with customizable options. Create unbreakable passwords for your accounts.",
    url: "https://freetools.online/password-generator",
    type: "website",
  },
}

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
