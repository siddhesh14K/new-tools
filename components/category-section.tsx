import type React from "react"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ImageIcon as Image, Type, Code, Calculator, Key } from "lucide-react"

interface Category {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  toolCount: number
}

const categories: Category[] = [
  {
    id: "pdf-tools",
    title: "PDF Tools",
    description: "Compress, merge, and manipulate PDF files",
    icon: <FileText className="h-12 w-12" />,
    href: "/pdf-tools",
    toolCount: 3,
  },
  {
    id: "image-tools",
    title: "Image Tools",
    description: "Optimize and edit your images",
    icon: <Image className="h-12 w-12" />,
    href: "/image-tools",
    toolCount: 3,
  },
  {
    id: "text-tools",
    title: "Text Tools",
    description: "Format and analyze text content",
    icon: <Type className="h-12 w-12" />,
    href: "/text-tools",
    toolCount: 4,
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    description: "Utilities for web developers",
    icon: <Code className="h-12 w-12" />,
    href: "/developer-tools",
    toolCount: 3,
  },
  {
    id: "calculators",
    title: "Calculators",
    description: "Perform various calculations",
    icon: <Calculator className="h-12 w-12" />,
    href: "/calculators",
    toolCount: 3,
  },
  {
    id: "security-tools",
    title: "Security Tools",
    description: "Password and hash generators",
    icon: <Key className="h-12 w-12" />,
    href: "/security-tools",
    toolCount: 2,
  },
]

export function CategorySection() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Browse Tools by Category</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect tool for your task by exploring our categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={category.href} key={category.id} className="block">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">{category.icon}</div>
                  <CardTitle className="mt-4">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className="text-sm text-gray-500">{category.toolCount} tools available</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
