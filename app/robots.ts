import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
return {
rules: [
{
userAgent: "*",
allow: "/",
disallow: [
"/api/",
"/admin/",
"/_next/",
"/*.json$",
"/*.xml$",
]
},
{
userAgent: "Googlebot",
allow: ["/*.json$", "/*.xml$"],
}
],
sitemap: "https://freetools.site/sitemap.xml",
host: "https://freetools.site",
}
}
