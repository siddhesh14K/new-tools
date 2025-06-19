import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  path: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function EnhancedBreadcrumb({ items }: BreadcrumbProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": `https://freetools.site${item.path}`,
        "name": item.label
      }
    }))
  }

  return (
    <>
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        {items.map((item, index) => (
          <div key={item.path} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link 
                href={item.path}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
