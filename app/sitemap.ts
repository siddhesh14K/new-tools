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
  { slug: "best-free-image-compression-tools-for-websites", priority: 0.7 },
  { slug: "password-generator-create-unbreakable-passwords", priority: 0.6 },
  { slug: "qr-code-generator-complete-business-guide", priority: 0.6 },
  { slug: "json-formatter-developer-complete-guide", priority: 0.6 },
  { slug: "background-remover-ai-vs-manual-comparison", priority: 0.6 },
  { slug: "url-shortener-marketing-strategy-guide", priority: 0.6 },
  { slug: "meta-tags-seo-optimization-guide-2024", priority: 0.7 },
  { slug: "text-formatting-best-practices-writers", priority: 0.5 },
  { slug: "color-picker-web-design-guide", priority: 0.5 },
]

const categories = [
  { slug: "pdf-tools", priority: 0.8 },
  { slug: "image-tools", priority: 0.8 },
  { slug: "text-tools", priority: 0.7 },
  { slug: "developer-tools", priority: 0.7 },
  { slug: "calculator-tools", priority: 0.7 },
  { slug: "seo-tools", priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freetools.online"
  const currentDate = new Date()

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },

    // Main pages
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // Category pages
    ...categories.map((category) => ({
      url: `${baseUrl}/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: category.priority,
    })),

    // Tool pages
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool.slug}`,
      lastModified: currentDate,
      changeFrequency: tool.changeFreq,
      priority: tool.priority,
    })),

    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: post.priority,
    })),
  ]
}
