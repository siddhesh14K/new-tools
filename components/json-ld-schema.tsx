export function JsonLdSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FreeTools.online",
          "applicationCategory": "Utility",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1000"
          },
          "creator": {
            "@type": "Organization",
            "name": "FreeTools.online",
            "url": "https://freetools.site"
          },
          "hasPart": [
            {
              "@type": "SoftwareApplication",
              "name": "PDF Tools",
              "applicationCategory": "Utility",
              "featureList": [
                "PDF Compression",
                "PDF Merging",
                "PDF Splitting"
              ]
            },
            {
              "@type": "SoftwareApplication",
              "name": "Image Tools",
              "applicationCategory": "Utility",
              "featureList": [
                "Image Compression",
                "Image Resizing",
                "Background Removal"
              ]
            }
          ]
        })
      }}
    />
  )
}
