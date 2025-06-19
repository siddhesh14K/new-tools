import type { MetadataRoute } from "next"

const tools = [
  // PDF Tools
  { slug: "pdf-compressor", priority: 0.9, changeFreq: "weekly" as const },
  { slug: "pdf-merger", priority: 0.8, changeFreq: "weekly" as const },
  { slug: "pdf-splitter", priority: 0.8, changeFreq: "weekly" as const },

  // Image Tools
  { slug: "image-compressor", priority: 0.9, changeFreq: "weekly" as const },
  { slug: "image-resizer", priority: 0.8, changeFreq: "weekly" as const },
  { slug: "background-remover", priority: 0.9, changeFreq: "weekly" as const },

  // Text Tools
  { slug: "word-counter", priority: 0.8, changeFreq: "weekly" as const },
  { slug: "case-converter", priority: 0.7, changeFreq: "weekly" as const },
  { slug: "text-formatter", priority: 0.7, changeFreq: "weekly" as const },
  { slug: "lorem-generator", priority: 0.6, changeFreq: "weekly" as const },

  // Developer Tools
  { slug: "base64-encoder", priority: 0.7, changeFreq: "weekly" as const },
  { slug: "json-formatter", priority: 0.8, changeFreq: "weekly" as const },
  { slug: "hash-generator", priority: 0.7, changeFreq: "weekly" as const },

  // Utility Tools
  { slug: "password-generator", priority: 0.8, changeFreq: "weekly" as const },
  { slug: "qr-generator", priority: 0.8, changeFreq: "weekly" as const },
  { slug: "color-picker", priority: 0.7, changeFreq: "weekly" as const },
  { slug: "url-shortener", priority: 0.8, changeFreq: "weekly" as const },

  // Calculator Tools
  { slug: "unit-converter", priority: 0.7, changeFreq: "weekly" as const },
  { slug: "date-calculator", priority: 0.7, changeFreq: "weekly" as const },
  { slug: "percentage-calculator", priority: 0.7, changeFreq: "weekly" as const },

  // SEO Tools
  { slug: "meta-tag-generator", priority: 0.8, changeFreq: "weekly" as const },
  { slug: "seo-analyzer", priority: 0.8, changeFreq: "weekly" as const },
]

const blogPosts = [
  { slug: "how-to-compress-pdf-files-without-losing-quality-2024", priority: 0.7 },
  { slug: "ultimate-guide-free-online-tools-2024", priority: 0.8 },
]

// Category pages
const categoryPages = [
  { slug: "pdf-tools", priority: 0.9, changeFreq: "weekly" as const },
  { slug: "image-tools", priority: 0.9, changeFreq: "weekly" as const },
  { slug: "text-tools", priority: 0.9, changeFreq: "weekly" as const },
  { slug: "developer-tools", priority: 0.9, changeFreq: "weekly" as const },
]

// Static pages
const staticPages = [
  { slug: "", priority: 1.0, changeFreq: "daily" as const }, // Homepage
  { slug: "blog", priority: 0.9, changeFreq: "daily" as const },
  { slug: "contact", priority: 0.5, changeFreq: "monthly" as const },
  { slug: "privacy-policy", priority: 0.3, changeFreq: "monthly" as const },
  { slug: "terms-of-service", priority: 0.3, changeFreq: "monthly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freetools.site" // Replace with your actual domain

  // Generate tool URLs
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: tool.changeFreq,
    priority: tool.priority,
  }))

  // Generate blog post URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: post.priority,
  }))

  // Generate category page URLs
  const categoryUrls = categoryPages.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: category.changeFreq,
    priority: category.priority,
  }))

  // Generate static page URLs
  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  // Combine all URLs
  return [...staticUrls, ...toolUrls, ...categoryUrls, ...blogUrls]
}
