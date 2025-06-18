import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Clock } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "Contact Us - Free Online Tools | Get Support & Feedback",
  description:
    "Contact FreeTools.online for support, feedback, or business inquiries. We're here to help you with our free online tools and services.",
  keywords: "contact, support, feedback, help, free online tools, customer service",
  openGraph: {
    title: "Contact Us - Free Online Tools",
    description: "Get in touch with our team for support, feedback, or business inquiries.",
    url: "https://freetools.online/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions, feedback, or need support? We'd love to hear from you! Get in touch with our team and we'll
          respond as quickly as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
            <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" action="mailto:siddheshdeshmukh66@gmail.com" method="post" encType="text/plain">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <Input id="firstName" name="firstName" type="text" required placeholder="Enter your first name" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <Input id="lastName" name="lastName" type="text" required placeholder="Enter your last name" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email address" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <Input id="subject" name="subject" type="text" required placeholder="What's this about?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <p className="text-muted-foreground">Reach out to us through any of these channels</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">Send us an email anytime</p>
                  <a href="mailto:siddheshdeshmukh66@gmail.com" className="text-primary hover:underline font-medium">
                    siddheshdeshmukh66@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Response Time</h3>
                  <p className="text-muted-foreground">We typically respond within</p>
                  <p className="font-medium">24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Support</h3>
                  <p className="text-muted-foreground">Available worldwide</p>
                  <p className="font-medium">24/7 Online Support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Are your tools really free?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! All our tools are 100% free to use with no hidden costs or premium plans.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you store my files?</h4>
                <p className="text-sm text-muted-foreground">
                  No, all processing happens in your browser. We never store or access your files.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I use these tools for commercial purposes?</h4>
                <p className="text-sm text-muted-foreground">
                  Our tools are free for both personal and commercial use.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Contact Options */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Other Ways to Connect</h2>
        <p className="text-muted-foreground mb-8">Follow us for updates, tips, and new tool announcements</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="lg">
            Follow on Twitter
          </Button>
          <Button variant="outline" size="lg">
            Join our Newsletter
          </Button>
        </div>
      </div>
    </div>
  )
}
