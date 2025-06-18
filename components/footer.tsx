import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin, Heart, ExternalLink } from "lucide-react"

const toolCategories = [
  {
    title: "PDF Tools",
    tools: [
      { name: "PDF Compressor", href: "/pdf-compressor" },
      { name: "PDF Merger", href: "/pdf-merger" },
      { name: "PDF Splitter", href: "/pdf-splitter" },
      { name: "PDF to Word", href: "/pdf-to-word" },
    ],
  },
  {
    title: "Image Tools",
    tools: [
      { name: "Image Compressor", href: "/image-compressor" },
      { name: "Image Resizer", href: "/image-resizer" },
      { name: "Background Remover", href: "/background-remover" },
      { name: "Image Converter", href: "/image-converter" },
    ],
  },
  {
    title: "Text Tools",
    tools: [
      { name: "Word Counter", href: "/word-counter" },
      { name: "Case Converter", href: "/case-converter" },
      { name: "Text Formatter", href: "/text-formatter" },
      { name: "Lorem Generator", href: "/lorem-generator" },
    ],
  },
  {
    title: "Developer Tools",
    tools: [
      { name: "JSON Formatter", href: "/json-formatter" },
      { name: "Base64 Encoder", href: "/base64-encoder" },
      { name: "Hash Generator", href: "/hash-generator" },
      { name: "QR Generator", href: "/qr-generator" },
    ],
  },
]

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Sitemap", href: "/sitemap.xml" },
]

const resourceLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "API Documentation", href: "/api-docs" },
  { name: "Help Center", href: "/help" },
  { name: "Feature Requests", href: "/feature-requests" },
  { name: "Bug Reports", href: "/bug-reports" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground rounded-lg p-2">
                <span className="text-xl font-bold">FT</span>
              </div>
              <span className="text-xl font-bold">FreeTools.online</span>
            </Link>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              The ultimate collection of 100+ free online tools for PDF compression, image editing, text conversion, and
              more. Trusted by millions of users worldwide since 2024.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" type="email" className="text-sm" />
                <Button size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Get notified about new tools and updates</p>
            </div>
          </div>

          {/* Tool Categories */}
          {toolCategories.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3 text-sm">{category.title}</h3>
              <ul className="space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <li key={toolIndex}>
                    <Link
                      href={tool.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Secondary Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Contact Info</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:siddheshdeshmukh66@gmail.com" className="hover:text-primary transition-colors">
                  siddheshdeshmukh66@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-sm">Follow Us</h4>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© {currentYear} FreeTools.online. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for the community
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <Link href="/status" className="text-muted-foreground hover:text-primary transition-colors">
              System Status
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">
              Changelog
            </Link>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://github.com/freetoolsonline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center"
            >
              Open Source <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>10M+ Tools Used</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>500K+ Happy Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>100+ Free Tools</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
