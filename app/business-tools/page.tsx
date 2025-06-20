import { ToolLayout } from "@/components/tool-layout"
import { ToolsGrid } from "@/components/tools-grid"
import { Mail, FileText, Calculator, Users, TrendingUp, Building, CreditCard, Clock } from "lucide-react"

const businessTools = [
  {
    title: "Email Signature Generator",
    description: "Create professional email signatures with contact info, social links, and branding",
    href: "/email-signature-generator",
    icon: Mail,
    category: "Business",
    color: "text-blue-600",
    featured: true,
    keywords: ["email", "signature", "professional", "business", "branding"]
  },
  {
    title: "Invoice Generator",
    description: "Generate professional invoices and receipts for your business instantly",
    href: "/invoice-generator",
    icon: FileText,
    category: "Business",
    color: "text-green-600",
    featured: true,
    keywords: ["invoice", "receipt", "billing", "business", "payment"]
  },
  {
    title: "Business Card Generator",
    description: "Design and create professional business cards with custom layouts",
    href: "/business-card-generator",
    icon: CreditCard,
    category: "Business",
    color: "text-purple-600",
    keywords: ["business card", "design", "professional", "networking", "contact"]
  },
  {
    title: "Meeting Scheduler",
    description: "Schedule meetings and appointments with automatic time zone conversion",
    href: "/meeting-scheduler",
    icon: Clock,
    category: "Business",
    color: "text-orange-600",
    keywords: ["meeting", "schedule", "appointment", "calendar", "timezone"]
  },
  {
    title: "Team Productivity Tracker",
    description: "Track team productivity, tasks, and project progress efficiently",
    href: "/productivity-tracker",
    icon: Users,
    category: "Business",
    color: "text-indigo-600",
    keywords: ["productivity", "team", "tracking", "tasks", "project"]
  },
  {
    title: "Business Analytics Dashboard",
    description: "Analyze business metrics, KPIs, and performance indicators",
    href: "/business-analytics",
    icon: TrendingUp,
    category: "Business",
    color: "text-emerald-600",
    keywords: ["analytics", "KPI", "metrics", "business", "dashboard"]
  },
  {
    title: "Company Profile Generator",
    description: "Create professional company profiles and business descriptions",
    href: "/company-profile-generator",
    icon: Building,
    category: "Business",
    color: "text-slate-600",
    keywords: ["company", "profile", "business", "description", "professional"]
  },
  {
    title: "ROI Calculator",
    description: "Calculate return on investment for business projects and campaigns",
    href: "/roi-calculator",
    icon: Calculator,
    category: "Business",
    color: "text-red-600",
    keywords: ["ROI", "calculator", "investment", "return", "business"]
  }
]

export default function BusinessToolsPage() {
  return (
    <ToolLayout
      title="Free Business Tools 2024 - Professional Business Solutions"
      description="Essential business tools for entrepreneurs, freelancers, and companies. Generate invoices, create email signatures, track productivity, and analyze performance."
      icon={<Building className="h-8 w-8 text-blue-600" />}
      toolCategory="business-tools"
      howToSteps={[
        {
          name: "Select Business Tool",
          text: "Choose the business tool that matches your current need"
        },
        {
          name: "Enter Business Data",
          text: "Input your business information, metrics, or requirements"
        },
        {
          name: "Generate Results",
          text: "Let the tool process and generate professional business documents"
        },
        {
          name: "Download & Use",
          text: "Download or copy the results for immediate business use"
        }
      ]}
      faqs={[
        {
          question: "Are these business tools suitable for small businesses?",
          answer: "Yes, our tools are designed for businesses of all sizes, from freelancers to large corporations. They're especially helpful for small businesses and startups."
        },
        {
          question: "Can I customize the generated business documents?",
          answer: "Absolutely! Most tools offer customization options for colors, fonts, layouts, and content to match your brand identity."
        },
        {
          question: "Do you store my business information?",
          answer: "No, all processing happens locally in your browser. We don't store, transmit, or have access to your business data."
        },
        {
          question: "Are the generated documents legally compliant?",
          answer: "Our templates follow general best practices, but you should always consult with legal professionals for specific compliance requirements in your jurisdiction."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Business Tools", path: "/business-tools" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT2M"
    >
      <ToolsGrid tools={businessTools} />
    </ToolLayout>
  )
}