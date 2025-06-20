"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, User, Building, Phone, Globe, Copy, Download, Eye, Palette } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

interface SignatureData {
  fullName: string
  jobTitle: string
  company: string
  email: string
  phone: string
  website: string
  address: string
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
  profileImage: string
  companyLogo: string
  disclaimer: string
}

interface TemplateStyle {
  id: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
}

export default function EmailSignatureGeneratorPage() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    profileImage: "",
    companyLogo: "",
    disclaimer: ""
  })

  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [primaryColor, setPrimaryColor] = useState("#2563eb")
  const [secondaryColor, setSecondaryColor] = useState("#64748b")
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif")

  const templates: TemplateStyle[] = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design",
      primaryColor: "#2563eb",
      secondaryColor: "#64748b",
      fontFamily: "Arial, sans-serif"
    },
    {
      id: "classic",
      name: "Classic Business",
      description: "Traditional corporate style",
      primaryColor: "#1f2937",
      secondaryColor: "#6b7280",
      fontFamily: "Times New Roman, serif"
    },
    {
      id: "creative",
      name: "Creative Design",
      description: "Colorful and artistic layout",
      primaryColor: "#7c3aed",
      secondaryColor: "#a855f7",
      fontFamily: "Helvetica, sans-serif"
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Simple and elegant",
      primaryColor: "#000000",
      secondaryColor: "#666666",
      fontFamily: "Arial, sans-serif"
    }
  ]

  const generateSignatureHTML = () => {
    const template = templates.find(t => t.id === selectedTemplate) || templates[0]
    
    const socialLinks = [
      { platform: "linkedin", url: signatureData.linkedin, icon: "📧" },
      { platform: "twitter", url: signatureData.twitter, icon: "🐦" },
      { platform: "facebook", url: signatureData.facebook, icon: "📘" },
      { platform: "instagram", url: signatureData.instagram, icon: "📷" }
    ].filter(social => social.url)

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 14px; line-height: 1.4; color: #333;">
  <tr>
    <td style="padding-right: 20px; vertical-align: top;">
      ${signatureData.profileImage ? `<img src="${signatureData.profileImage}" alt="${signatureData.fullName}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` : ''}
    </td>
    <td style="vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom: 5px;">
            <strong style="font-size: 18px; color: ${primaryColor};">${signatureData.fullName}</strong>
          </td>
        </tr>
        ${signatureData.jobTitle ? `
        <tr>
          <td style="padding-bottom: 3px;">
            <span style="color: ${secondaryColor}; font-style: italic;">${signatureData.jobTitle}</span>
          </td>
        </tr>
        ` : ''}
        ${signatureData.company ? `
        <tr>
          <td style="padding-bottom: 8px;">
            <strong style="color: ${primaryColor};">${signatureData.company}</strong>
          </td>
        </tr>
        ` : ''}
        ${signatureData.email ? `
        <tr>
          <td style="padding-bottom: 3px;">
            <span style="color: ${secondaryColor};">📧</span>
            <a href="mailto:${signatureData.email}" style="color: ${primaryColor}; text-decoration: none;">${signatureData.email}</a>
          </td>
        </tr>
        ` : ''}
        ${signatureData.phone ? `
        <tr>
          <td style="padding-bottom: 3px;">
            <span style="color: ${secondaryColor};">📞</span>
            <a href="tel:${signatureData.phone}" style="color: ${primaryColor}; text-decoration: none;">${signatureData.phone}</a>
          </td>
        </tr>
        ` : ''}
        ${signatureData.website ? `
        <tr>
          <td style="padding-bottom: 3px;">
            <span style="color: ${secondaryColor};">🌐</span>
            <a href="${signatureData.website}" style="color: ${primaryColor}; text-decoration: none;">${signatureData.website}</a>
          </td>
        </tr>
        ` : ''}
        ${signatureData.address ? `
        <tr>
          <td style="padding-bottom: 8px;">
            <span style="color: ${secondaryColor};">📍 ${signatureData.address}</span>
          </td>
        </tr>
        ` : ''}
        ${socialLinks.length > 0 ? `
        <tr>
          <td style="padding-top: 8px;">
            ${socialLinks.map(social => `
              <a href="${social.url}" style="margin-right: 10px; text-decoration: none; font-size: 16px;">${social.icon}</a>
            `).join('')}
          </td>
        </tr>
        ` : ''}
        ${signatureData.companyLogo ? `
        <tr>
          <td style="padding-top: 15px;">
            <img src="${signatureData.companyLogo}" alt="${signatureData.company} Logo" style="max-width: 150px; height: auto;">
          </td>
        </tr>
        ` : ''}
        ${signatureData.disclaimer ? `
        <tr>
          <td style="padding-top: 15px; border-top: 1px solid #e5e5e5;">
            <span style="font-size: 11px; color: #888; line-height: 1.3;">${signatureData.disclaimer}</span>
          </td>
        </tr>
        ` : ''}
      </table>
    </td>
  </tr>
</table>
    `.trim()
  }

  const copySignature = () => {
    const html = generateSignatureHTML()
    
    // Create a temporary div to copy HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    document.body.appendChild(tempDiv)
    
    // Select and copy
    const range = document.createRange()
    range.selectNodeContents(tempDiv)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    
    try {
      document.execCommand('copy')
      selection?.removeAllRanges()
      document.body.removeChild(tempDiv)
    } catch (err) {
      console.error('Failed to copy signature')
      document.body.removeChild(tempDiv)
    }
  }

  const downloadSignature = () => {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Signature - ${signatureData.fullName}</title>
</head>
<body>
    ${generateSignatureHTML()}
</body>
</html>
    `
    
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-signature-${signatureData.fullName.replace(/\s+/g, '-').toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const updateField = (field: keyof SignatureData, value: string) => {
    setSignatureData(prev => ({ ...prev, [field]: value }))
  }

  const selectTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setPrimaryColor(template.primaryColor)
      setSecondaryColor(template.secondaryColor)
      setFontFamily(template.fontFamily)
    }
  }

  return (
    <ToolLayout
      title="Email Signature Generator - Create Professional Email Signatures Free"
      description="Create professional email signatures with our free generator. Customize templates, add social links, logos, and contact information. Perfect for business and personal use."
      icon={<Mail className="h-8 w-8 text-blue-600" />}
      keywords="email signature generator, professional email signature, email signature template, business email signature, free email signature"
      toolCategory="business-tools"
      howToSteps={[
        {
          name: "Enter Your Information",
          text: "Fill in your personal and professional details like name, job title, and contact information"
        },
        {
          name: "Choose Template",
          text: "Select from professional templates and customize colors and fonts"
        },
        {
          name: "Add Social Links",
          text: "Include your social media profiles and company logo if desired"
        },
        {
          name: "Copy or Download",
          text: "Copy the signature to your email client or download as HTML file"
        }
      ]}
      faqs={[
        {
          question: "How do I add the signature to my email client?",
          answer: "Copy the generated signature and paste it into your email client's signature settings. Most email clients support HTML signatures."
        },
        {
          question: "Can I include images in my signature?",
          answer: "Yes, you can add profile pictures and company logos by providing image URLs. Make sure images are hosted online."
        },
        {
          question: "Will my signature work on mobile devices?",
          answer: "Yes, our signatures are designed to be responsive and work well on both desktop and mobile email clients."
        },
        {
          question: "Can I customize the colors and fonts?",
          answer: "Absolutely! You can choose from preset templates or customize colors and fonts to match your brand."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Business Tools", path: "/business-tools" },
        { label: "Email Signature Generator", path: "/email-signature-generator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT3M"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input
                        placeholder="John Doe"
                        value={signatureData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Job Title</label>
                      <Input
                        placeholder="Marketing Manager"
                        value={signatureData.jobTitle}
                        onChange={(e) => updateField('jobTitle', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Company</label>
                    <Input
                      placeholder="Acme Corporation"
                      value={signatureData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={signatureData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        value={signatureData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Website</label>
                    <Input
                      placeholder="https://www.company.com"
                      value={signatureData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Address</label>
                    <Input
                      placeholder="123 Business St, City, State 12345"
                      value={signatureData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Profile Image URL</label>
                    <Input
                      placeholder="https://example.com/profile.jpg"
                      value={signatureData.profileImage}
                      onChange={(e) => updateField('profileImage', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Company Logo URL</label>
                    <Input
                      placeholder="https://example.com/logo.png"
                      value={signatureData.companyLogo}
                      onChange={(e) => updateField('companyLogo', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Social Media & Legal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">LinkedIn Profile</label>
                    <Input
                      placeholder="https://linkedin.com/in/johndoe"
                      value={signatureData.linkedin}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Twitter Profile</label>
                    <Input
                      placeholder="https://twitter.com/johndoe"
                      value={signatureData.twitter}
                      onChange={(e) => updateField('twitter', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Facebook Profile</label>
                    <Input
                      placeholder="https://facebook.com/johndoe"
                      value={signatureData.facebook}
                      onChange={(e) => updateField('facebook', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Instagram Profile</label>
                    <Input
                      placeholder="https://instagram.com/johndoe"
                      value={signatureData.instagram}
                      onChange={(e) => updateField('instagram', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Legal Disclaimer</label>
                    <Textarea
                      placeholder="This email and any attachments are confidential and may be privileged..."
                      value={signatureData.disclaimer}
                      onChange={(e) => updateField('disclaimer', e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Design & Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Template Style</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => selectTemplate(template.id)}
                        >
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <Input
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          placeholder="#2563eb"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Secondary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <Input
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          placeholder="#64748b"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Family</label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                        <SelectItem value="Helvetica, sans-serif">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman, serif">Times New Roman</SelectItem>
                        <SelectItem value="Georgia, serif">Georgia</SelectItem>
                        <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                        <SelectItem value="Calibri, sans-serif">Calibri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Live Preview
                </span>
                <div className="flex gap-2">
                  <Button onClick={copySignature} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy HTML
                  </Button>
                  <Button onClick={downloadSignature} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-white min-h-[300px]">
                {signatureData.fullName ? (
                  <div dangerouslySetInnerHTML={{ __html: generateSignatureHTML() }} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter your information to see the signature preview</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>📧 How to Add to Email Clients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold">Gmail:</h4>
                  <p className="text-muted-foreground">Settings → General → Signature → Paste HTML</p>
                </div>
                <div>
                  <h4 className="font-semibold">Outlook:</h4>
                  <p className="text-muted-foreground">File → Options → Mail → Signatures → New → Paste HTML</p>
                </div>
                <div>
                  <h4 className="font-semibold">Apple Mail:</h4>
                  <p className="text-muted-foreground">Preferences → Signatures → Create New → Paste HTML</p>
                </div>
                <div>
                  <h4 className="font-semibold">Thunderbird:</h4>
                  <p className="text-muted-foreground">Account Settings → Signature Text → Enable HTML → Paste</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose max-w-none mt-12 bg-muted/30 rounded-2xl p-8">
        <h2>📧 Professional Email Signature Generator 2024</h2>
        <p>
          Create stunning, professional email signatures that make a lasting impression. Our free generator 
          helps you design custom signatures with your contact information, social links, and branding.
        </p>

        <h3>🎯 Why Use Professional Email Signatures?</h3>
        <ul>
          <li><strong>Brand Recognition:</strong> Consistent branding across all communications</li>
          <li><strong>Contact Information:</strong> Easy access to your details and social profiles</li>
          <li><strong>Professionalism:</strong> Shows attention to detail and business credibility</li>
          <li><strong>Marketing Tool:</strong> Promote your website, services, or latest offers</li>
          <li><strong>Legal Compliance:</strong> Include required disclaimers and legal text</li>
        </ul>

        <h3>✨ Features & Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold text-lg mb-2">🎨 Design Features</h4>
            <ul className="text-sm space-y-1">
              <li>• Multiple professional templates</li>
              <li>• Custom color schemes</li>
              <li>• Font family selection</li>
              <li>• Profile image support</li>
              <li>• Company logo integration</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold text-lg mb-2">📱 Compatibility</h4>
            <ul className="text-sm space-y-1">
              <li>• Works with all major email clients</li>
              <li>• Mobile-responsive design</li>
              <li>• HTML and plain text support</li>
              <li>• Cross-platform compatibility</li>
              <li>• Social media integration</li>
            </ul>
          </div>
        </div>

        <h3>💼 Best Practices for Email Signatures</h3>
        <ol>
          <li><strong>Keep it concise:</strong> Include only essential information</li>
          <li><strong>Use consistent branding:</strong> Match your company colors and fonts</li>
          <li><strong>Include social links:</strong> But limit to 3-4 most important platforms</li>
          <li><strong>Add a call-to-action:</strong> Promote your latest content or offers</li>
          <li><strong>Test across devices:</strong> Ensure it looks good on mobile and desktop</li>
          <li><strong>Update regularly:</strong> Keep information current and relevant</li>
        </ol>

        <h3>🚀 Advanced Tips</h3>
        <ul>
          <li>Use high-quality, web-optimized images for faster loading</li>
          <li>Include your time zone for international communications</li>
          <li>Add your pronouns to promote inclusivity</li>
          <li>Consider seasonal updates for holidays or special events</li>
          <li>Use tracking links to measure signature effectiveness</li>
        </ul>
      </div>
    </ToolLayout>
  )
}