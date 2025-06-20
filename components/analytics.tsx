"use client"

import Script from "next/script"

export function Analytics() {
  const isProduction = process.env.NODE_ENV === "production"
  const gaId = "G-3MQDPMCDQG" // Your actual GA4 measurement ID

  return (
    <>
      {/* Google Analytics - loads in both development and production for testing */}
      <>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3MQDPMCDQG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3MQDPMCDQG');
          `}
        </Script>
      </>
    </>
  )
}
