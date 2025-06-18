import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, Download, Star } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "5M+",
    label: "Happy Users",
    description: "Trusted by millions worldwide",
    color: "text-blue-500",
  },
  {
    icon: FileText,
    value: "100+",
    label: "Free Tools",
    description: "Comprehensive tool collection",
    color: "text-green-500",
  },
  {
    icon: Download,
    value: "50M+",
    label: "Files Processed",
    description: "Processed this month",
    color: "text-purple-500",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "User Rating",
    description: "Based on 25K+ reviews",
    color: "text-yellow-500",
  },
]

export function StatsSection() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
