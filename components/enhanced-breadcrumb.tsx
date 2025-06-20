"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import JsonLdSchema from "./json-ld-schema";
import { memo } from "react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface EnhancedBreadcrumbProps {
  items: BreadcrumbItem[];
}

function EnhancedBreadcrumbComponent({ items }: EnhancedBreadcrumbProps) {
  const baseUrl = "https://freetools.online";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLdSchema schema={breadcrumbSchema} />
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link href={item.href} className="hover:underline text-blue-600">
                {item.name}
              </Link>
              {index < items.length - 1 && (
                <svg
                  className="h-5 w-5 text-gray-400 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export const EnhancedBreadcrumb = memo(EnhancedBreadcrumbComponent);
