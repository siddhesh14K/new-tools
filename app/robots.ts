import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://new-tools-ochre.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/sitemap.xml", "/robots.txt"],
        disallow: ["/api/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/sitemap.xml", "/robots.txt"],
        disallow: ["/api/"],
        crawlDelay: 2,
      },
      {
        userAgent: "Yandex",
        allow: ["/", "/sitemap.xml", "/robots.txt"],
        disallow: ["/api/"],
        crawlDelay: 5,
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
