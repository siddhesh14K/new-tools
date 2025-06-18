import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, TrendingUp, FileText, Code } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "How to Compress PDF Files Without Losing Quality in 2024",
    excerpt:
      "Learn the best techniques and tools to reduce PDF file size while maintaining document quality. Complete guide with step-by-step instructions.",
    category: "PDF Tools",
    categoryColor: "bg-red-100 text-red-700",
    readTime: "5 min read",
    publishDate: "Dec 15, 2024",
    image: "/blog/pdf-compression-guide.jpg",
    href: "/blog/compress-pdf-without-losing-quality",
    trending: true,
    icon: FileText,
  },
  {
    id: 2,
    title: "10 Best Image Compression Tools for Web Developers",
    excerpt:
      "Optimize your website's loading speed with these powerful image compression tools. Compare features, quality, and performance.",
    category: "Image Tools",
    categoryColor: "bg-blue-100 text-blue-700",
    readTime: "8 min read",
    publishDate: "Dec 12, 2024",
    image: "/blog/image-compression-tools.jpg",
    href: "/blog/best-image-compression-tools",
    trending: false,
    icon: Image,
  },
  {
    id: 3,
    title: "JSON Formatting Best Practices for Developers",
    excerpt:
      "Master JSON formatting with these essential tips and tricks. Learn about validation, beautification, and common formatting mistakes to avoid.",
    category: "Developer Tools",
    categoryColor: "bg-purple-100 text-purple-700",
    readTime: "6 min read",
    publishDate: "Dec 10, 2024",
    image: "/blog/json-formatting-guide.jpg",
    href: "/blog/json-formatting-best-practices",
    trending: false,
    icon: Code,
  },
  {
    id: 4,
    title: "Complete Guide to Online Privacy: Protecting Your Data",
    excerpt:
      "Essential tips for maintaining privacy while using online tools. Learn about data protection, secure browsing, and privacy-first tools.",
    category: "Security",
    categoryColor: "bg-green-100 text-green-700",
    readTime: "10 min read",
    publishDate: "Dec 8, 2024",
    image: "/blog/online-privacy-guide.jpg",
    href: "/blog/online-privacy-protection-guide",
    trending: true,
    icon: FileText,
  },
  {
    id: 5,
    title: "Mobile-First Design: Optimizing Tools for Touch Devices",
    excerpt:
      "Discover how modern online tools are designed for mobile users. Learn about touch-friendly interfaces and responsive design principles.",
    category: "Design",
    categoryColor: "bg-orange-100 text-orange-700",
    readTime: "7 min read",
    publishDate: "Dec 5, 2024",
    image: "/blog/mobile-first-design.jpg",
    href: "/blog/mobile-first-design-principles",
    trending: false,
    icon: Image,
  },
  {
    id: 6,
    title: "The Future of Online Tools: AI Integration and Automation",
    excerpt:
      "Explore how artificial intelligence is revolutionizing online tools. From automated image editing to smart text processing.",
    category: "Technology",
    categoryColor: "bg-indigo-100 text-indigo-700",
    readTime: "12 min read",
    publishDate: "Dec 3, 2024",
    image: "/blog/ai-online-tools.jpg",
    href: "/blog/future-of-online-tools-ai",
    trending: true,
    icon: Code,
  },
]

const categories = [
  { name: "PDF Tools", count: 15, href: "/blog/category/pdf-tools" },
  { name: "Image Tools", count: 12, href: "/blog/category/image-tools" },
  { name: "Developer Tools", count: 18, href: "/blog/category/developer-tools" },
  { name: "Security", count: 8, href: "/blog/category/security" },
  { name: "Tutorials", count: 25, href: "/blog/category/tutorials" },
  { name: "Tips & Tricks", count: 20, href: "/blog/category/tips-tricks" },
]

export function BlogSection() {
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1, 4)
  const trendingPosts = blogPosts.filter((post) => post.trending)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest tips, tutorials, and insights about online tools, productivity, and digital
            workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-primary" />
                Featured Article
              </h3>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <featuredPost.icon className="h-16 w-16 text-primary/60" />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={featuredPost.categoryColor}>{featuredPost.category}</Badge>
                        {featuredPost.trending && (
                          <Badge variant="destructive" className="text-xs">
                            🔥 Trending
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl md:text-2xl leading-tight">
                        <Link href={featuredPost.href} className="hover:text-primary transition-colors">
                          {featuredPost.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {featuredPost.publishDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed mb-4">
                        {featuredPost.excerpt}
                      </CardDescription>
                      <Link href={featuredPost.href}>
                        <Button className="gap-2">
                          Read Full Article
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Posts Grid */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Recent Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <post.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        {post.trending && (
                          <Badge variant="destructive" className="text-xs">
                            🔥
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        <Link href={post.href} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed mb-3 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link href="/blog">
                <Button variant="outline" size="lg" className="gap-2">
                  View All Articles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Trending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                        <Link href={post.href} className="block hover:text-primary transition-colors">
                          <h4 className="font-medium text-sm leading-tight mb-2">{post.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {post.publishDate}
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                  <CardDescription>Get the latest tips and tutorials delivered to your inbox.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button size="sm" className="w-full">
                      Subscribe
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
