"use client"

export function EnhancedSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FreeTools.online",
    url: "https://freetools.online",
    logo: "https://freetools.online/logo.png",
    description: "100+ free online tools for PDF compression, image editing, text processing, and more",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-0123",
      contactType: "customer service",
      email: "siddheshdeshmukh66@gmail.com",
      availableLanguage: "English",
    },
    sameAs: [
      "https://twitter.com/freetoolsonline",
      "https://facebook.com/freetoolsonline",
      "https://linkedin.com/company/freetoolsonline",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free online tools with no registration required",
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are your online tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our tools are 100% free with no hidden costs, registration requirements, or premium plans.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store my files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all processing happens directly in your browser. We never upload, store, or access your files.",
        },
      },
      {
        "@type": "Question",
        name: "How do I compress a PDF file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use our PDF Compressor tool - simply upload your PDF, choose compression level, and download the compressed file. No registration required.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
