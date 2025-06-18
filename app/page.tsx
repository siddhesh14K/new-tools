import { HeroSection } from "@/components/hero-section"
import { ToolsGrid } from "@/components/tools-grid"
import { FeaturesSection } from "@/components/features-section"
import { BlogSection } from "@/components/blog-section"
import { FAQSection } from "@/components/faq-section"
import { Breadcrumb } from "@/components/breadcrumb"
import { TrendingTools } from "@/components/trending-tools"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { CategorySection } from "@/components/category-section"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Online Tools 2024 - 100+ PDF, Image, Text, Video, SEO Tools",
  description:
    "Discover 100+ free online tools for PDF compression, image editing, text conversion, video processing, SEO analysis and more. Fast, secure, mobile-friendly tools.",
  url: "https://freetools.online",
  mainEntity: {
    "@type": "ItemList",
    name: "Free Online Tools Collection 2024",
    description: "Comprehensive collection of 100+ free online tools for professionals, students, and developers",
    numberOfItems: 100,
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        name: "PDF Compressor Online Free",
        description: "Compress PDF files online for free without losing quality. Reduce PDF size up to 90%.",
        url: "https://freetools.online/pdf-compressor",
        applicationCategory: "Utility",
        operatingSystem: "Web Browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "15420",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "Image Compressor Online",
        description: "Compress images online without losing quality. Support JPG, PNG, WebP formats.",
        url: "https://freetools.online/image-compressor",
        applicationCategory: "Utility",
        operatingSystem: "Web Browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "12350",
        },
      },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://freetools.online",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb items={[{ label: "Free Online Tools 2024", href: "/" }]} />

        <HeroSection />

        <StatsSection />

        <TrendingTools />

        <CategorySection />

        <section className="mb-16" id="tools">
          <h2 className="text-3xl font-bold text-center mb-4">🚀 100+ Free Online Tools 2024</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-4xl mx-auto">
            Access the most comprehensive collection of free online tools for PDF compression, image editing, text
            conversion, video processing, SEO analysis, and more. All tools work directly in your browser - no
            downloads, no registration, completely free forever!
          </p>
          <ToolsGrid />
        </section>

        <FeaturesSection />

        <TestimonialsSection />

        <BlogSection />

        <FAQSection />

        {/* SEO Content Section */}
        <section className="prose max-w-none mt-16">
          <h2>Why Choose FreeTools.online for Your Daily Tasks?</h2>
          <p>
            FreeTools.online is the ultimate destination for free online tools in 2024. Whether you're a student,
            developer, designer, marketer, or business professional, our comprehensive collection of 100+ tools will
            help you accomplish any task quickly and efficiently.
          </p>

          <h3>🎯 Most Popular Free Online Tools</h3>
          <ul>
            <li>
              <strong>PDF Compressor:</strong> Reduce PDF file size by up to 90% without quality loss
            </li>
            <li>
              <strong>Image Compressor:</strong> Optimize images for web and email with smart compression
            </li>
            <li>
              <strong>Word Counter:</strong> Count words, characters, and analyze text in real-time
            </li>
            <li>
              <strong>QR Code Generator:</strong> Create custom QR codes for any purpose
            </li>
            <li>
              <strong>Password Generator:</strong> Generate ultra-secure passwords with custom options
            </li>
            <li>
              <strong>JSON Formatter:</strong> Format, validate, and beautify JSON data instantly
            </li>
            <li>
              <strong>Color Picker:</strong> Pick colors and convert between HEX, RGB, HSL formats
            </li>
            <li>
              <strong>Unit Converter:</strong> Convert between any units of measurement
            </li>
          </ul>

          <h3>🔥 Trending Tools Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div>
              <h4 className="font-bold text-lg mb-2">📄 PDF Tools</h4>
              <ul className="text-sm space-y-1">
                <li>• PDF Compressor - Reduce file size</li>
                <li>• PDF Merger - Combine multiple PDFs</li>
                <li>• PDF Splitter - Split PDF pages</li>
                <li>• PDF to Word - Convert PDF to DOC</li>
                <li>• PDF Password Remover</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">🖼️ Image Tools</h4>
              <ul className="text-sm space-y-1">
                <li>• Image Compressor - Optimize images</li>
                <li>• Image Resizer - Change dimensions</li>
                <li>• Background Remover - AI-powered</li>
                <li>• Image Converter - Change formats</li>
                <li>• Photo Editor - Basic editing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">📝 Text Tools</h4>
              <ul className="text-sm space-y-1">
                <li>• Word Counter - Count words & chars</li>
                <li>• Case Converter - Change text case</li>
                <li>• Text Formatter - Clean up text</li>
                <li>• Lorem Ipsum Generator</li>
                <li>• Duplicate Text Remover</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">🔧 Developer Tools</h4>
              <ul className="text-sm space-y-1">
                <li>• JSON Formatter - Format & validate</li>
                <li>• Base64 Encoder - Encode/decode</li>
                <li>• Hash Generator - MD5, SHA256</li>
                <li>• URL Encoder - Encode URLs</li>
                <li>• HTML Encoder - Escape HTML</li>
              </ul>
            </div>
          </div>

          <h3>🚀 Why Our Tools Are Better</h3>
          <ul>
            <li>
              <strong>100% Free Forever:</strong> No hidden costs, no premium plans, no limitations
            </li>
            <li>
              <strong>No Registration Required:</strong> Start using tools immediately
            </li>
            <li>
              <strong>Privacy First:</strong> All processing happens in your browser
            </li>
            <li>
              <strong>Mobile Optimized:</strong> Perfect on phones, tablets, and desktops
            </li>
            <li>
              <strong>Lightning Fast:</strong> Instant results with optimized algorithms
            </li>
            <li>
              <strong>Professional Quality:</strong> Enterprise-grade tools for everyone
            </li>
            <li>
              <strong>Regular Updates:</strong> New tools added every month
            </li>
            <li>
              <strong>24/7 Available:</strong> Access tools anytime, anywhere
            </li>
          </ul>

          <h3>💼 Perfect for Professionals</h3>
          <p>
            Our tools are trusted by millions of professionals worldwide including students, teachers, developers,
            designers, marketers, content creators, and business owners. Save time and money with our comprehensive
            suite of online utilities.
          </p>

          <h3>🌟 Latest Features in 2024</h3>
          <ul>
            <li>AI-powered image background removal</li>
            <li>Advanced PDF compression algorithms</li>
            <li>Real-time collaboration features</li>
            <li>Batch processing for multiple files</li>
            <li>Cloud storage integration</li>
            <li>API access for developers</li>
            <li>Mobile app companion</li>
            <li>Dark mode support</li>
          </ul>
        </section>
      </div>
    </>
  )
}
