"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { ToolLayout } from "@/components/tool-layout"
import { Badge } from "@/components/ui/badge"
import { Globe, Share2, Search, Twitter, Facebook, Code } from "lucide-react"

interface MetaTags {
  title: string
  description: string
  keywords: string
  author: string
  viewport: string
  charset: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  ogType: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterSite: string
  canonical: string
  robots: string
}

export default function MetaTagGenerator() {
  const [metaTags, setMetaTags] = useState<MetaTags>({
    title: "",
    description: "",
    keywords: "",
    author: "",
    viewport: "width=device-width, initial-scale=1.0",
    charset: "UTF-8",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    twitterSite: "",
    canonical: "",
    robots: "index, follow",
  })

  const [generatedTags, setGeneratedTags] = useState("")

  const handleInputChange = (field: keyof MetaTags, value: string) => {
    setMetaTags((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-fill related fields
    if (field === "title" && !metaTags.ogTitle) {
      setMetaTags((prev) => ({ ...prev, ogTitle: value, twitterTitle: value }))
    }
    if (field === "description" && !metaTags.ogDescription) {
      setMetaTags((prev) => ({ ...prev, ogDescription: value, twitterDescription: value }))
    }
  }

  const generateMetaTags = () => {
    const tags: string[] = []

    // Basic Meta Tags
    if (metaTags.title) tags.push(`<title>${metaTags.title}</title>`)
    if (metaTags.description) tags.push(`<meta name="description" content="${metaTags.description}">`)
    if (metaTags.keywords) tags.push(`<meta name="keywords" content="${metaTags.keywords}">`)
    if (metaTags.author) tags.push(`<meta name="author" content="${metaTags.author}">`)
    tags.push(`<meta name="viewport" content="${metaTags.viewport}">`)
    tags.push(`<meta charset="${metaTags.charset}">`)
    if (metaTags.canonical) tags.push(`<link rel="canonical" href="${metaTags.canonical}">`)
    tags.push(`<meta name="robots" content="${metaTags.robots}">`)

    // Open Graph Tags
    tags.push("")
    tags.push("<!-- Open Graph / Facebook -->")
    tags.push(`<meta property="og:type" content="${metaTags.ogType}">`)
    if (metaTags.ogUrl) tags.push(`<meta property="og:url" content="${metaTags.ogUrl}">`)
    if (metaTags.ogTitle) tags.push(`<meta property="og:title" content="${metaTags.ogTitle}">`)
    if (metaTags.ogDescription) tags.push(`<meta property="og:description" content="${metaTags.ogDescription}">`)
    if (metaTags.ogImage) tags.push(`<meta property="og:image" content="${metaTags.ogImage}">`)

    // Twitter Tags
    tags.push("")
    tags.push("<!-- Twitter -->")
    tags.push(`<meta property="twitter:card" content="${metaTags.twitterCard}">`)
    if (metaTags.twitterSite) tags.push(`<meta property="twitter:site" content="${metaTags.twitterSite}">`)
    if (metaTags.twitterTitle) tags.push(`<meta property="twitter:title" content="${metaTags.twitterTitle}">`)
    if (metaTags.twitterDescription)
      tags.push(`<meta property="twitter:description" content="${metaTags.twitterDescription}">`)
    if (metaTags.twitterImage) tags.push(`<meta property="twitter:image" content="${metaTags.twitterImage}">`)

    setGeneratedTags(tags.join("\n"))
  }

  const loadTemplate = (type: "blog" | "ecommerce" | "business") => {
    const templates = {
      blog: {
        title: "Your Blog Post Title - Your Blog Name",
        description:
          "Read our latest blog post about [topic]. Get insights, tips, and expert advice on [subject]. Updated regularly with fresh content.",
        keywords: "blog, article, tips, guide, tutorial, advice",
        ogType: "article",
        robots: "index, follow",
      },
      ecommerce: {
        title: "Product Name - Buy Online | Your Store",
        description:
          "Buy [Product Name] online. Best prices, free shipping, excellent customer service. Shop now and save on [product category].",
        keywords: "buy, shop, online store, product, ecommerce, shopping",
        ogType: "product",
        robots: "index, follow",
      },
      business: {
        title: "Your Business Name - Professional Services",
        description:
          "Professional [service type] services. Contact us for expert solutions, competitive prices, and excellent customer service.",
        keywords: "business, services, professional, company, contact",
        ogType: "website",
        robots: "index, follow",
      },
    }

    const template = templates[type]
    setMetaTags((prev) => ({
      ...prev,
      title: template.title,
      description: template.description,
      keywords: template.keywords,
      ogTitle: template.title,
      ogDescription: template.description,
      ogType: template.ogType,
      twitterTitle: template.title,
      twitterDescription: template.description,
      robots: template.robots,
    }))
  }

  return (
    <ToolLayout 
      title="Meta Tag Generator - Generate HTML Meta Tags for SEO"
      description="Generate comprehensive HTML meta tags for SEO optimization. Create Open Graph, Twitter Cards, and essential meta tags for better search rankings."
      icon={<Code className="h-8 w-8 text-blue-500" />}
      toolCategory="seo-tools"
      howToSteps={[
        {
          name: "Enter Website Details",
          text: "Fill in your website title, description, URL, and other basic information"
        },
        {
          name: "Add Social Media Info",
          text: "Configure Open Graph and Twitter Card settings for social sharing"
        },
        {
          name: "Generate Meta Tags",
          text: "Click 'Generate Meta Tags' to create your HTML meta tags"
        },
        {
          name: "Copy and Use",
          text: "Copy the generated meta tags and paste them in your HTML <head> section"
        }
      ]}
      faqs={[
        {
          question: "What are meta tags and why are they important?",
          answer: "Meta tags provide information about your webpage to search engines and social media platforms. They're crucial for SEO and how your content appears when shared."
        },
        {
          question: "Which meta tags are most important for SEO?",
          answer: "The most important are title, description, viewport, Open Graph tags, and Twitter Card tags. These directly impact search rankings and social sharing."
        },
        {
          question: "How do I add these meta tags to my website?",
          answer: "Copy the generated meta tags and paste them inside the <head> section of your HTML document, before the closing </head> tag."
        },
        {
          question: "Do I need different meta tags for each page?",
          answer: "Yes, each page should have unique title and description meta tags that accurately describe that specific page's content."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "SEO Tools", path: "/seo-tools" },
        { label: "Meta Tag Generator", path: "/meta-tag-generator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT3M"
    >
      <div className="space-y-6">
        {/* Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Quick Templates
            </CardTitle>
            <CardDescription>Start with a pre-configured template for common website types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={() => loadTemplate("blog")}>
                Blog Template
              </Button>
              <Button variant="outline" onClick={() => loadTemplate("ecommerce")}>
                E-commerce Template
              </Button>
              <Button variant="outline" onClick={() => loadTemplate("business")}>
                Business Template
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Meta Tags</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Basic SEO Meta Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={metaTags.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Your Page Title - Brand Name"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">{metaTags.title.length}/60 characters (recommended)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description *</Label>
                  <Textarea
                    id="description"
                    value={metaTags.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of your page content..."
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {metaTags.description.length}/160 characters (recommended)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={metaTags.keywords}
                    onChange={(e) => handleInputChange("keywords", e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={metaTags.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="Author Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical">Canonical URL</Label>
                  <Input
                    id="canonical"
                    value={metaTags.canonical}
                    onChange={(e) => handleInputChange("canonical", e.target.value)}
                    placeholder="https://yourdomain.com/page"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Facebook className="h-5 w-5" />
                  Open Graph (Facebook)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">OG Title</Label>
                  <Input
                    id="ogTitle"
                    value={metaTags.ogTitle}
                    onChange={(e) => handleInputChange("ogTitle", e.target.value)}
                    placeholder="Title for social media sharing"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogDescription">OG Description</Label>
                  <Textarea
                    id="ogDescription"
                    value={metaTags.ogDescription}
                    onChange={(e) => handleInputChange("ogDescription", e.target.value)}
                    placeholder="Description for social media sharing"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">OG Image URL</Label>
                  <Input
                    id="ogImage"
                    value={metaTags.ogImage}
                    onChange={(e) => handleInputChange("ogImage", e.target.value)}
                    placeholder="https://yourdomain.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogUrl">OG URL</Label>
                  <Input
                    id="ogUrl"
                    value={metaTags.ogUrl}
                    onChange={(e) => handleInputChange("ogUrl", e.target.value)}
                    placeholder="https://yourdomain.com/page"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Twitter className="h-5 w-5" />
                  Twitter Cards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitterTitle">Twitter Title</Label>
                  <Input
                    id="twitterTitle"
                    value={metaTags.twitterTitle}
                    onChange={(e) => handleInputChange("twitterTitle", e.target.value)}
                    placeholder="Title for Twitter sharing"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterDescription">Twitter Description</Label>
                  <Textarea
                    id="twitterDescription"
                    value={metaTags.twitterDescription}
                    onChange={(e) => handleInputChange("twitterDescription", e.target.value)}
                    placeholder="Description for Twitter sharing"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterImage">Twitter Image URL</Label>
                  <Input
                    id="twitterImage"
                    value={metaTags.twitterImage}
                    onChange={(e) => handleInputChange("twitterImage", e.target.value)}
                    placeholder="https://yourdomain.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterSite">Twitter Site Handle</Label>
                  <Input
                    id="twitterSite"
                    value={metaTags.twitterSite}
                    onChange={(e) => handleInputChange("twitterSite", e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="viewport">Viewport</Label>
                  <Input
                    id="viewport"
                    value={metaTags.viewport}
                    onChange={(e) => handleInputChange("viewport", e.target.value)}
                    placeholder="width=device-width, initial-scale=1.0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="charset">Character Set</Label>
                  <Input
                    id="charset"
                    value={metaTags.charset}
                    onChange={(e) => handleInputChange("charset", e.target.value)}
                    placeholder="UTF-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="robots">Robots</Label>
                  <Input
                    id="robots"
                    value={metaTags.robots}
                    onChange={(e) => handleInputChange("robots", e.target.value)}
                    placeholder="index, follow"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogType">Content Type</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={metaTags.ogType}
                    onChange={(e) => handleInputChange("ogType", e.target.value)}
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="profile">Profile</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button onClick={generateMetaTags} className="w-full" size="lg">
          Generate Meta Tags
        </Button>

        {generatedTags && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Generated Meta Tags
              </CardTitle>
              <CardDescription>Copy and paste these meta tags into your HTML &lt;head&gt; section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                  <code>{generatedTags}</code>
                </pre>
                <div className="absolute top-2 right-2">
                  <CopyButton text={generatedTags} />
                </div>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                <Badge variant="secondary">SEO Optimized</Badge>
                <Badge variant="secondary">Social Media Ready</Badge>
                <Badge variant="secondary">Mobile Friendly</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  )
}
