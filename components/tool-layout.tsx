"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import type { ReactNode } from "react"

interface ToolLayoutProps {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
  howToUse?: string[]
}

export function ToolLayout({ title, description, icon, children, howToUse }: ToolLayoutProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="container mx-auto px-4 py-6 pb-24 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="touch-target">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="touch-target"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Tool Header */}
      <div className="text-center mb-6 animate-fade-in">
        <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          {icon}
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Tool Content */}
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {children}
      </div>

      {/* How to Use Section */}
      {howToUse && (
        <Card className="mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="text-lg">How to Use</CardTitle>
            <CardDescription>Step-by-step guide</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {howToUse.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
