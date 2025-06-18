import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href === "#" ? undefined : `https://freetools.online${item.href}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {item.href === "#" ? (
              <span className="text-foreground">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
