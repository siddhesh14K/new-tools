import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
      },
    ],
    sitemap: "https://freetools.site/sitemap.xml",
    host: "https://freetools.site",
  };
}
