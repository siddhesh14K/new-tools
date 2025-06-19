interface HowToStep {
  name: string
  text: string
  image?: string
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  toolCategory: string
}

export function HowToSchema({ name, description, steps, totalTime, toolCategory }: HowToSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime || "PT5M",
    "supply": [{
      "@type": "HowToSupply",
      "name": `File to ${toolCategory.toLowerCase()}`
    }],
    "tool": [{
      "@type": "HowToTool",
      "name": "Web Browser"
    }],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        "image": {
          "@type": "ImageObject",
          "url": `https://freetools.site${step.image}`
        }
      })
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
