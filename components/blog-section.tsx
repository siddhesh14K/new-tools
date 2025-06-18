import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"

const blogPosts = [
  {
    title: "How to Compress PDF Files for Email Attachments",
    description: "Learn the best techniques to reduce PDF file sizes while maintaining quality for email sharing.",
    href: "/blog/how-to-compress-pdf-files",
    date: "2024-01-15",
    author: "FreeTools Team",
    readTime: "5 min read",
  },
  {
    title: "Best Image Compression Techniques for Web",
    description: "Optimize your images for faster website loading with these proven compression methods.",
    href: "/blog/best-image-compression-techniques",
    date: "2024-01-12",
    author: "FreeTools Team",
    readTime: "7 min read",
  },
  {
    title: "Password Security: Creating Strong Passwords in 2024",
    description: "Essential guide to creating and managing secure passwords to protect your online accounts.",
    href: "/blog/password-security-best-practices",
    date: "2024-01-10",
    author: "FreeTools Team",
    readTime: "6 min read",
  },
]

export function BlogSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Latest Tutorials & Guides</h2>
            <p className="text-lg text-muted-foreground">
              Learn how to make the most of our tools with step-by-step guides
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link key={index} href={post.href}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
