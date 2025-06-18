import type { Metadata } from "next"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "Privacy Policy - FreeTools.online | Your Data Protection Rights",
  description:
    "Learn how FreeTools.online protects your privacy. We process data locally, don't store files, and respect your privacy rights.",
  robots: "index, follow",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <div className="prose max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Information We Collect</h2>
        <h3>1.1 Personal Information</h3>
        <p>We collect minimal personal information only when you voluntarily provide it through our contact form:</p>
        <ul>
          <li>Email address (for contact purposes only)</li>
          <li>Name (optional, for personalized responses)</li>
          <li>Message content (to respond to your inquiry)</li>
        </ul>

        <h3>1.2 Automatically Collected Information</h3>
        <p>We automatically collect certain information when you visit our website:</p>
        <ul>
          <li>IP address (for security and analytics)</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
        </ul>

        <h3>1.3 File Processing</h3>
        <p>
          <strong>Important:</strong> All file processing (PDF compression, image editing, etc.) happens entirely in
          your browser. We do NOT upload, store, or access your files on our servers.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use collected information for:</p>
        <ul>
          <li>Providing and improving our tools and services</li>
          <li>Responding to your inquiries and support requests</li>
          <li>Analyzing website usage to improve user experience</li>
          <li>Ensuring website security and preventing abuse</li>
          <li>Complying with legal obligations</li>
        </ul>

        <h2>3. Google AdSense and Analytics</h2>
        <h3>3.1 Google AdSense</h3>
        <p>
          We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on
          your prior visits to our website or other websites. You can opt out of personalized advertising by visiting
          Google's Ads Settings.
        </p>

        <h3>3.2 Google Analytics</h3>
        <p>
          We use Google Analytics to understand how visitors use our website. This service may collect information such
          as your IP address, browser type, and pages visited. You can opt out by installing the Google Analytics
          opt-out browser add-on.
        </p>

        <h2>4. Cookies and Tracking</h2>
        <p>We use cookies for:</p>
        <ul>
          <li>Essential website functionality</li>
          <li>Analytics and performance monitoring</li>
          <li>Advertising (through Google AdSense)</li>
          <li>User preferences and settings</li>
        </ul>
        <p>You can control cookies through your browser settings.</p>

        <h2>5. Data Security</h2>
        <p>We implement appropriate security measures to protect your information:</p>
        <ul>
          <li>SSL encryption for all data transmission</li>
          <li>Regular security updates and monitoring</li>
          <li>Limited access to personal information</li>
          <li>Secure hosting infrastructure</li>
        </ul>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your information</li>
          <li>Data portability</li>
        </ul>

        <h2>7. Third-Party Services</h2>
        <p>We may use third-party services that have their own privacy policies:</p>
        <ul>
          <li>Google AdSense and Analytics</li>
          <li>Content Delivery Networks (CDNs)</li>
          <li>Hosting providers</li>
        </ul>

        <h2>8. Children's Privacy</h2>
        <p>
          Our website is not intended for children under 13. We do not knowingly collect personal information from
          children under 13.
        </p>

        <h2>9. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your own. We ensure appropriate
          safeguards are in place for such transfers.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new
          policy on this page with an updated date.
        </p>

        <h2>11. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us:</p>
        <ul>
          <li>Email: siddheshdeshmukh66@gmail.com</li>
          <li>
            Website: <a href="/contact">Contact Form</a>
          </li>
        </ul>

        <div className="bg-muted p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">🔒 Privacy-First Approach</h3>
          <p className="text-sm">
            Unlike many online tools, we process all your files locally in your browser. This means your documents,
            images, and data never leave your device, ensuring maximum privacy and security.
          </p>
        </div>
      </div>
    </div>
  )
}
