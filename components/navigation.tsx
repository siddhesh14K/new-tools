"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Calculator, Calendar, Scale, Code } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/json-formatter", icon: FileText, label: "JSON" },
  { href: "/word-counter", icon: Calculator, label: "Words" },
  { href: "/date-calculator", icon: Calendar, label: "Dates" },
  { href: "/unit-converter", icon: Scale, label: "Units" },
  { href: "/base64-encoder", icon: Code, label: "Base64" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 touch-target min-w-[60px]",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
