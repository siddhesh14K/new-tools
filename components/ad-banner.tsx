"use client"

import { useEffect, useState } from "react"

interface AdBannerProps {
  slot: string
  format?: string
  responsive?: boolean
}

export function AdBanner({ slot, format = "auto", responsive = true }: AdBannerProps) {
  const [isProduction, setIsProduction] = useState(false)

  useEffect(() => {
    // Only show ads in production with proper AdSense setup
    setIsProduction(process.env.NODE_ENV === "production" && !!process.env.NEXT_PUBLIC_ADSENSE_ID)
  }, [])

  // Don't render ads in development or without proper setup
  if (!isProduction) {
    return (
      <div className="ad-container my-8 bg-muted/20 border-2 border-dashed border-muted-foreground/20">
        <div className="text-center text-muted-foreground p-8">
          <p className="text-sm">Advertisement Space</p>
          <p className="text-xs mt-1">Ads will appear here in production</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ad-container my-8">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}
