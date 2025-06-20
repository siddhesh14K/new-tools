"use client";
import { usePathname } from "next/navigation";
import { getCanonicalUrl, getAlternateLanguageUrls } from "@/lib/metadata";
import { EnhancedSchema } from "./enhanced-schema";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  toolName?: string;
  category?: string;
}

export function AdvancedSEO({ title, description, keywords, toolName, category }: SEOProps) {
  const pathname = usePathname();
  const baseUrl = "https://freetools.online";
  const currentUrl = `${baseUrl}${pathname}`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FreeTools.online",
    url: baseUrl,
    logo: `${baseUrl}/placeholder-logo.svg`,
    sameAs: [
      "https://twitter.com/freetools_online",
      "https://www.facebook.com/freetoolsonline",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const toolSchema = toolName
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: toolName,
        applicationCategory: "WebApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "25870",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Organization",
          name: "FreeTools.online",
        },
        datePublished: "2024-01-01",
        description: description,
        url: currentUrl,
        screenshot: `${baseUrl}/screenshots/${toolName.toLowerCase().replace(/\s+/g, "-")}.jpg`,
        softwareVersion: "2.1",
        downloadUrl: currentUrl,
        featureList: [
          "No registration required",
          "100% free to use",
          "Privacy-focused processing",
          "Mobile-friendly interface",
          "Instant results",
          "Real-time processing",
        ],
      }
    : null;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: category || "Tools", href: `/${category?.toLowerCase().replace(/\s+/g, "-") || "tools"}` },
    ...(toolName ? [{ name: toolName, href: pathname }] : []),
  ];

  const howToSchema = toolName
    ? {
        name: `How to use ${toolName}`,
        description: `A step-by-step guide to using our free ${toolName} online.`,
        totalTime: "PT1M",
        step: [
          {
            name: "Step 1: Input Data",
            text: "Upload your file or paste your data into the input field.",
          },
          {
            name: "Step 2: Configure Options",
            text: "Adjust the settings to meet your specific needs.",
          },
          {
            name: "Step 3: Process & Download",
            text: "Click the 'Process' button and download your results instantly.",
          },
        ],
      }
    : null;

  const canonicalUrl = getCanonicalUrl(pathname);
  const alternateUrls = getAlternateLanguageUrls(pathname);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl.toString()} />
      {Object.entries(alternateUrls).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <EnhancedSchema
        schema={organizationSchema}
        breadcrumbs={breadcrumbs}
        howTo={howToSchema}
      />
      <EnhancedSchema schema={websiteSchema} />
      {toolSchema && <EnhancedSchema schema={toolSchema} />}
    </>
  );
}
