import { Shield, Zap, Smartphone, Globe, Lock, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "All processing happens locally in your browser. Your files never leave your device.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant results with client-side processing. No waiting for uploads or downloads.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect touch-friendly interface designed specifically for mobile devices.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Compatible with all modern browsers and devices. No software installation needed.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "No registration, no data collection, no tracking. Your privacy is our priority.",
  },
  {
    icon: Users,
    title: "Free for Everyone",
    description: "All tools are completely free with no limits, no watermarks, no restrictions.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Free Online Tools?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
