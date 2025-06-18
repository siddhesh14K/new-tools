import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, QrCode } from "lucide-react"

export const metadata: Metadata = {
  title: "Developer Tools - Free Online Web Development Utilities",
  description:
    "Free online developer tools including JSON formatter, Base64 encoder/decoder, QR code generator, and more. No registration required.",
  keywords:
    "developer tools, JSON formatter, Base64 encoder, QR code generator, web development tools, free online tools",
}

interface Tool {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  features: string[]
}

const developerTools: Tool[] = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON data with syntax highlighting",
    icon: <Code className="h-8 w-8" />,
    href: "/json-formatter",
    features: ["Syntax highlighting", "Error detection", "Tree view", "Minify/Beautify", "Copy formatted JSON"],
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder",
    description: "Encode and decode text and files to/from Base64 format",
    icon: <Code className="h-8 w-8" />,
    href: "/base64-encoder",
    features: [
      "Text encoding/decoding",
      "File encoding/decoding",
      "URL-safe Base64",
      "Copy results",
      "Batch processing",
    ],
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes for URLs, text, and contact information",
    icon: <QrCode className="h-8 w-8" />,
    href: "/qr-generator",
    features: ["Custom colors", "Adjustable size", "Error correction", "Logo embedding", "Download as PNG/SVG"],
  },
]

export default function DeveloperToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
          Free online utilities to help with web development and programming tasks
        </p>

        <div className="grid gap-8">
          {developerTools.map((tool) => (
            <Link href={tool.href} key={tool.id} className="block">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">{tool.icon}</div>
                    <div>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription className="mt-1">{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">Features:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 text-green-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="text-primary">
                    Try it now
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Why Use Our Developer Tools?</h2>
          <div className="grid gap-4">
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-primary mt-1 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-medium">100% Free & No Registration</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  All tools are completely free to use with no account required.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-primary mt-1 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-medium">Privacy First</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  All processing happens in your browser. Your data never leaves your device.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-primary mt-1 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-medium">Fast & Reliable</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our tools are optimized for speed and work reliably across all modern browsers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
