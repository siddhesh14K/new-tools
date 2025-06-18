"use client"

import Script from "next/script"

export function Analytics() {
  const isProduction = process.env.NODE_ENV === "production"
  const gaId = "G-5YHCPX8DEH" // Your actual GA4 measurement ID

  return (
    <>
      {/* Google Analytics - only in production */}
      {isProduction && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-5YHCPX8DEH" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5YHCPX8DEH');
            `}
          </Script>
        </>
      )}
    </>
  )
}
