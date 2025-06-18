"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  isOpen: boolean
  navigation: Array<{ name: string; href: string }>
}

export function MobileNav({ isOpen, navigation }: MobileNavProps) {
  if (!isOpen) return null

  return (
    <div className="md:hidden border-t bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
