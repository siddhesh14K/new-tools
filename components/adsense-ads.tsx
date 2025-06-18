"use client"

import type React from "react"

import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface AdSenseAdProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export function AdSenseAd({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
  className = "",
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your AdSense publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

// Responsive Banner Ad
export function ResponsiveBannerAd({ className = "" }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1234567890" // Replace with your ad slot ID
      adFormat="auto"
      fullWidthResponsive={true}
      className={`my-8 ${className}`}
      style={{ display: "block", minHeight: "250px" }}
    />
  )
}

// Square Ad
export function SquareAd({ className = "" }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="0987654321" // Replace with your ad slot ID
      adFormat="auto"
      fullWidthResponsive={false}
      className={`my-4 ${className}`}
      style={{ display: "block", width: "300px", height: "250px" }}
    />
  )
}

// In-Article Ad
export function InArticleAd({ className = "" }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1122334455" // Replace with your ad slot ID
      adFormat="fluid"
      fullWidthResponsive={true}
      className={`my-6 ${className}`}
      style={{ display: "block", textAlign: "center" }}
    />
  )
}
