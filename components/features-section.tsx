import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Zap,
  Globe,
  Smartphone,
  Lock,
  Download,
  Clock,
  Users,
  Star,
  CheckCircle2,
  Infinity,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Privacy Protected",
    description: "All processing happens locally in your browser. Your files never leave your device.",
    color: "text-green-500",
    badge: "Secure",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized algorithms ensure instant results. No waiting, no delays.",
    color: "text-yellow-500",
    badge: "Fast",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Access from any device, any browser, anywhere in the world. No downloads required.",
    color: "text-blue-500",
    badge: "Universal",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect touch-friendly interface designed specifically for mobile devices.",
    color: "text-purple-500",
    badge: "Mobile",
  },
  {
    icon: Infinity,
    title: "Unlimited Usage",
    description: "No limits on file size, number of conversions, or daily usage. Use as much as you need.",
    color: "text-orange-500",
    badge: "Unlimited",
  },
  {
    icon: Heart,
    title: "Always Free",
    description: "No hidden costs, no premium plans, no subscriptions. Free forever for everyone.",
    color: "text-red-500",
    badge: "Free",
  },
]

const stats = [
  {
    icon: Users,
    number: "10M+",
    label: "Happy Users",
    description: "Trusted by millions worldwide",
  },
  {
    icon: Clock,
    number: "50M+",
    label: "Tools Used",
    description: "Files processed successfully",
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "User Rating",
    description: "Based on 50K+ reviews",
  },
  {
    icon: CheckCircle2,
    number: "99.9%",
    label: "Uptime",
    description: "Reliable service guarantee",
  },
]

const benefits = [
  "No registration or sign-up required",
  "No watermarks on processed files",
  "No file size limitations",
  "No daily usage limits",
  "Works offline after initial load",
  "Regular updates with new tools",
  "Professional-grade results",
  "24/7 availability",
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreeTools.online?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've built the most comprehensive collection of free online tools with a focus on privacy, speed, and ease
            of use. Here's what makes us different.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-3 rounded-lg bg-background shadow-sm ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Trusted by Millions Worldwide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits List */}
        <div className="bg-background rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center mb-8">Everything You Need, Nothing You Don't</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Join millions of users who trust FreeTools.online for their daily tasks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">No Downloads</div>
                  <div className="text-sm text-muted-foreground">Works in your browser</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-green-500/5 border-green-500/20">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-green-500" />
                <div className="text-left">
                  <div className="font-semibold">100% Secure</div>
                  <div className="text-sm text-muted-foreground">Your data stays private</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-blue-500/5 border-blue-500/20">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-semibold">Instant Results</div>
                  <div className="text-sm text-muted-foreground">No waiting required</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
