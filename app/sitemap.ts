import { MetadataRoute } from "next";
import { glob } from "glob";
import fs from "fs";

// It's best practice to set your website's domain in an environment variable.
// Example: NEXT_PUBLIC_SITE_URL=https://freetools.online
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freetools.online";

/**
 * Determines the SEO priority of a URL. More important pages get a higher value.
 * @param path - The URL path (e.g., '/about', '/blog/my-post').
 * @returns A priority value between 0.0 and 1.0.
 */
const getPriority = (path: string): number => {
  if (path === "/") return 1.0;
  if (path === "/blog" || path.endsWith("-tools")) return 0.9; // Blog index and tool categories are important
  if (path.startsWith("/blog/")) return 0.8; // Individual blog posts
  if (path.split("/").filter(Boolean).length === 1) return 0.85; // Individual tool pages
  if (["/privacy-policy", "/terms-of-service", "/contact"].includes(path)) return 0.3; // Legal/static pages
  return 0.7; // Default for any other pages
};

/**
 * Estimates how frequently a page's content might change.
 * This gives search engines a hint on how often to re-crawl the page.
 * @param path - The URL path.
 * @returns A change frequency string ('daily', 'weekly', 'monthly', 'yearly').
 */
const getChangeFrequency = (path: string): "daily" | "weekly" | "monthly" | "yearly" => {
  if (path === "/") return "daily";
  if (path === "/blog" || path.endsWith("-tools")) return "weekly";
  if (path.startsWith("/blog/")) return "monthly";
  if (["/privacy-policy", "/terms-of-service", "/contact"].includes(path)) return "yearly";
  return "monthly"; // Individual tools and other pages don't change frequently
};

/**
 * Generates the sitemap.xml for the website.
 *
 * --- Your Brilliant SEO Idea ---
 * A sitemap is a roadmap of your website for search engines like Google. It helps them
 * discover and index all your important pages efficiently.
 *
 * To rank high on Google, your FOCUS should be on KEYWORDS within your CONTENT:
 * 1.  Page Titles: <title>Your Primary Keyword - Brand</title>
 * 2.  Headings: <h1>, <h2> with relevant keywords.
 * 3.  Content Body: Write high-quality, original content about your topics.
 *
 * Your current URL structure (e.g., /image-compressor, /pdf-merger) is ALREADY
 * EXCELLENT for SEO because the URLs themselves are powerful keywords. This sitemap's
 * job is to make sure Google finds every single one of those valuable pages.
 * This updated file improves the logic to better guide search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = glob.sync("app/**/page.tsx", {
    ignore: ["app/api/**", "app/**/layout.tsx", "app/**/loading.tsx", "app/**/error.tsx"],
  });

  const urls = pages.map((page) => {
    // Convert file path to a URL path
    const urlPath = page.replace(/^app/, "").replace(/\/page\.tsx$/, "") || "/";

    const lastModified = fs.statSync(page).mtime;

    return {
      url: `${baseUrl}${urlPath}`,
      lastModified,
      changeFrequency: getChangeFrequency(urlPath),
      priority: getPriority(urlPath),
    };
  });

  return urls;
}
