import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | FreeTools.online",
  description: "Terms of service for FreeTools.online - Read our terms and conditions for using our free online tools.",
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using FreeTools.online, you accept and agree to be bound by the terms and provision of this
          agreement.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily use FreeTools.online for personal and commercial purposes. This is the
          grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to reverse engineer any software contained on the website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
        </ul>

        <h2>Service Availability</h2>
        <p>
          We strive to keep our tools available 24/7, but we cannot guarantee uninterrupted service. We reserve the
          right to modify, suspend, or discontinue any part of our service at any time.
        </p>

        <h2>User Responsibilities</h2>
        <p>You agree to:</p>
        <ul>
          <li>Use our tools only for lawful purposes</li>
          <li>Not upload or process any illegal, harmful, or copyrighted content</li>
          <li>Not attempt to overload or disrupt our services</li>
          <li>Respect the intellectual property rights of others</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          The materials on FreeTools.online are provided on an 'as is' basis. FreeTools.online makes no warranties,
          expressed or implied, and hereby disclaims and negates all other warranties including without limitation,
          implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
          intellectual property or other violation of rights.
        </p>

        <h2>Limitations</h2>
        <p>
          In no event shall FreeTools.online or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on FreeTools.online, even if FreeTools.online or an authorized representative has been
          notified orally or in writing of the possibility of such damage.
        </p>

        <h2>Contact Information</h2>
        <p>If you have any questions about these Terms of Service, please contact us at legal@freetools.online</p>
      </div>
    </div>
  )
}
