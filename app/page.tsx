import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Calculator, Calendar, Scale, Code, Smartphone, Zap, Shield } from "lucide-react"

const tools = [
  {
    name: "JSON Formatter",
    description: "Format, validate and beautify JSON data instantly",
    icon: FileText,
    href: "/json-formatter",
    color: "text-blue-500",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, and analyze text",
    icon: Calculator,
    href: "/word-counter",
    color: "text-green-500",
  },
  {
    name: "Date Calculator",
    description: "Calculate days between dates accurately",
    icon: Calendar,
    href: "/date-calculator",
    color: "text-purple-500",
  },
  {
    name: "Unit Converter",
    description: "Convert between different units instantly",
    icon: Scale,
    href: "/unit-converter",
    color: "text-orange-500",
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: Code,
    href: "/base64-encoder",
    color: "text-red-500",
  },
]

const features = [
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Optimized for one-handed use on all devices",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant results with client-side processing",
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "All processing happens locally on your device",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 pb-24 max-w-md">
      {/* Hero Section */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Mobile Tools
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Essential utilities designed for your mobile device. Fast, accurate, and easy to use.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Choose Your Tool</h2>
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="animate-fade-in hover:shadow-lg transition-all duration-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-background border rounded-lg p-2">
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={tool.href}>
                <Button className="w-full touch-target font-semibold">Open Tool</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About Section */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Why Mobile Tools?</h2>
        <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mobile Tools is designed specifically for mobile users who need quick, reliable utilities on the go. Each
            tool is optimized for touch interaction and provides instant results without requiring an internet
            connection.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All processing happens locally on your device, ensuring your data stays private and secure. No registration
            required, no data collection, just pure functionality when you need it.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you're a developer, student, or professional, these tools are designed to make your mobile workflow
            more efficient.
          </p>
        </div>
      </div>
    </div>
  )
}
