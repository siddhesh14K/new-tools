import type { MetadataRoute } from "next";

const baseUrl = "https://new-tools-ochre.vercel.app"; // match actual deployed domain

const tools = [
  { slug: "pdf-compressor", priority: 0.9, changeFreq: "weekly" as const },
  // ... all other tools
];

const blogPosts = [
  { slug: "how-to-compress-pdf-files-without-losing-quality-2024", priority: 0.7 },
  { slug: "ultimate-guide-free-online-tools-2024", priority: 0.8 },
];

const categoryPages = [
  { slug: "pdf-tools", priority: 0.9, changeFreq: "weekly" as const },
  // ... other categories
];

const staticPages = [
  { slug: "", priority: 1.0, changeFreq: "daily" as const },
  { slug: "blog", priority: 0.9, changeFreq: "daily" as const },
  { slug: "contact", priority: 0.5, changeFreq: "monthly" as const },
  { slug: "privacy-policy", priority: 0.3, changeFreq: "monthly" as const },
  { slug: "terms-of-service", priority: 0.3, changeFreq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: tool.changeFreq,
    priority: tool.priority,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: post.priority,
  }));

  const categoryUrls = categoryPages.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: category.changeFreq,
    priority: category.priority,
  }));

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  return [...staticUrls, ...toolUrls, ...categoryUrls, ...blogUrls];
}
