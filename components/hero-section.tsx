import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, Shield, Smartphone, Star, Users, Download } from "lucide-react"

export function HeroSection() {
  return (
    <section className="text-center py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 rounded-3xl" />

      <div className="relative max-w-5xl mx-auto">
        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-6 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>5M+ Users</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            <span>50M+ Files Processed</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          🚀 100+ Free Online Tools 2024
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
          The ultimate collection of <strong>free online tools</strong> for PDF compression, image editing, text
          conversion, video processing, SEO analysis, and more. <strong>No registration required</strong> - start using
          professional-grade tools instantly!
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            ✅ 100% Free Forever
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            🔒 Privacy Protected
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            ⚡ Lightning Fast
          </div>
          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
            📱 Mobile Friendly
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="#tools">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              🎯 Explore 100+ Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              📚 Read Tutorials
            </Button>
          </Link>
        </div>

        {/* Popular Tools Quick Access */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border">
          <h3 className="text-lg font-semibold mb-4">🔥 Most Popular Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/pdf-compressor"
              className="text-sm bg-white rounded-lg p-3 hover:shadow-md transition-shadow text-center"
            >
              📄 PDF Compressor
            </Link>
            <Link
              href="/image-compressor"
              className="text-sm bg-white rounded-lg p-3 hover:shadow-md transition-shadow text-center"
            >
              🖼️ Image Compressor
            </Link>
            <Link
              href="/qr-generator"
              className="text-sm bg-white rounded-lg p-3 hover:shadow-md transition-shadow text-center"
            >
              📱 QR Generator
            </Link>
            <Link
              href="/password-generator"
              className="text-sm bg-white rounded-lg p-3 hover:shadow-md transition-shadow text-center"
            >
              🔐 Password Generator
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">⚡ Lightning Fast</h3>
            <p className="text-muted-foreground">
              All processing happens in your browser for instant results. No waiting, no delays.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">🔒 100% Secure</h3>
            <p className="text-muted-foreground">
              Your files never leave your device. Complete privacy and security guaranteed.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">📱 Mobile Optimized</h3>
            <p className="text-muted-foreground">
              Perfect experience on phones, tablets, and desktops with touch-friendly interfaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
