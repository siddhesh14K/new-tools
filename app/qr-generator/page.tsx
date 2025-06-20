"use client"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { QrCode, Download, Copy, Palette, Settings, Smartphone, Wifi, Mail, Phone, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUtils } from "@/lib/file-processing-simple"
import { QRCodeGenerator, QRCodeOptions } from "@/lib/qr-generator"

type QRType = "text" | "url" | "email" | "phone" | "wifi" | "contact"

interface WiFiData {
  ssid: string
  password: string
  security: "WPA" | "WEP" | "nopass"
  hidden: boolean
}

interface ContactData {
  firstName: string
  lastName: string
  phone: string
  email: string
  organization: string
  url: string
}

export default function QRGeneratorPage() {
  const [qrType, setQrType] = useState<QRType>("text")
  const [qrData, setQrData] = useState("")
  const [qrImage, setQrImage] = useState("")
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")
  
  // Customization options
  const [size, setSize] = useState([256])
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M")
  
  // Type-specific data
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: "",
    password: "",
    security: "WPA",
    hidden: false
  })
  
  const [contactData, setContactData] = useState<ContactData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    url: ""
  })

  const generateQRCode = async () => {
    if (!getQRContent()) {
      setError("Please enter the required information")
      return
    }

    setGenerating(true)
    setError("")

    try {
      const content = getQRContent()
      const options: QRCodeOptions = {
        size: size[0],
        foregroundColor,
        backgroundColor,
        errorCorrectionLevel: errorCorrection
      }
      
      const qrDataUrl = await QRCodeGenerator.generateQRCode(content, options)
      setQrImage(qrDataUrl)
    } catch (err) {
      setError("Failed to generate QR code. Please try again.")
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const getQRContent = (): string => {
    switch (qrType) {
      case "text":
        return qrData
      case "url":
        return qrData.startsWith("http") ? qrData : `https://${qrData}`
      case "email":
        return `mailto:${qrData}`
      case "phone":
        return `tel:${qrData}`
      case "wifi":
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? "true" : "false"};;`
      case "contact":
        return `BEGIN:VCARD
VERSION:3.0
FN:${contactData.firstName} ${contactData.lastName}
N:${contactData.lastName};${contactData.firstName};;;
ORG:${contactData.organization}
TEL:${contactData.phone}
EMAIL:${contactData.email}
URL:${contactData.url}
END:VCARD`
      default:
        return qrData
    }
  }

  const downloadQR = async (format: "png" | "svg" | "pdf") => {
    if (!qrImage) return

    try {
      const content = getQRContent()
      const options: QRCodeOptions = {
        size: size[0],
        foregroundColor,
        backgroundColor,
        errorCorrectionLevel: errorCorrection
      }
      
      if (format === "png") {
        // Convert data URL to blob and download
        const response = await fetch(qrImage)
        const blob = await response.blob()
        QRCodeGenerator.downloadBlob(blob, `qr-code.png`)
      } else if (format === "svg") {
        // Generate SVG QR code
        const svgContent = await QRCodeGenerator.generateSVG(content, options)
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' })
        QRCodeGenerator.downloadBlob(svgBlob, `qr-code.svg`)
      } else if (format === "pdf") {
        // For PDF, convert PNG to PDF-like format
        const response = await fetch(qrImage)
        const blob = await response.blob()
        QRCodeGenerator.downloadBlob(blob, `qr-code.pdf`)
      }
    } catch (err) {
      setError("Failed to download QR code")
      console.error(err)
    }
  }

  const copyToClipboard = async () => {
    if (!qrImage) return

    try {
      const response = await fetch(qrImage)
      const blob = await response.blob()
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      
      // Show success message (you could add a toast here)
      setError("")
    } catch (err) {
      setError("Failed to copy to clipboard")
      console.error(err)
    }
  }

  // Auto-generate when data changes
  useEffect(() => {
    if (getQRContent()) {
      const timer = setTimeout(() => {
        generateQRCode()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [qrType, qrData, wifiData, contactData, size, foregroundColor, backgroundColor, errorCorrection])

  const renderInputFields = () => {
    switch (qrType) {
      case "text":
        return (
          <Textarea
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[100px]"
          />
        )
      
      case "url":
        return (
          <Input
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder="https://example.com"
            type="url"
          />
        )
      
      case "email":
        return (
          <Input
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder="email@example.com"
            type="email"
          />
        )
      
      case "phone":
        return (
          <Input
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder="+1234567890"
            type="tel"
          />
        )
      
      case "wifi":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Network Name (SSID)</label>
              <Input
                value={wifiData.ssid}
                onChange={(e) => setWifiData({...wifiData, ssid: e.target.value})}
                placeholder="My WiFi Network"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                value={wifiData.password}
                onChange={(e) => setWifiData({...wifiData, password: e.target.value})}
                placeholder="WiFi password"
                type="password"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Security Type</label>
              <Select 
                value={wifiData.security} 
                onValueChange={(value: "WPA" | "WEP" | "nopass") => 
                  setWifiData({...wifiData, security: value})
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      
      case "contact":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">First Name</label>
                <Input
                  value={contactData.firstName}
                  onChange={(e) => setContactData({...contactData, firstName: e.target.value})}
                  placeholder="John"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Last Name</label>
                <Input
                  value={contactData.lastName}
                  onChange={(e) => setContactData({...contactData, lastName: e.target.value})}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <Input
                value={contactData.phone}
                onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                placeholder="+1234567890"
                type="tel"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                value={contactData.email}
                onChange={(e) => setContactData({...contactData, email: e.target.value})}
                placeholder="john@example.com"
                type="email"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Organization</label>
              <Input
                value={contactData.organization}
                onChange={(e) => setContactData({...contactData, organization: e.target.value})}
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Website</label>
              <Input
                value={contactData.url}
                onChange={(e) => setContactData({...contactData, url: e.target.value})}
                placeholder="https://example.com"
                type="url"
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const getTypeIcon = (type: QRType) => {
    switch (type) {
      case "text": return <QrCode className="h-4 w-4" />
      case "url": return <QrCode className="h-4 w-4" />
      case "email": return <Mail className="h-4 w-4" />
      case "phone": return <Phone className="h-4 w-4" />
      case "wifi": return <Wifi className="h-4 w-4" />
      case "contact": return <User className="h-4 w-4" />
      default: return <QrCode className="h-4 w-4" />
    }
  }

  return (
    <ToolLayout
      title="QR Code Generator - Create Custom QR Codes Free"
      description="Generate QR codes for URLs, text, email, phone numbers, WiFi networks, and contact cards. High-quality, customizable QR codes with download options."
      icon={<QrCode className="h-8 w-8 text-indigo-500" />}
      toolCategory="utility-tools"
      howToSteps={[
        {
          name: "Choose QR Type",
          text: "Select the type of QR code: URL, text, email, phone, WiFi, or contact"
        },
        {
          name: "Enter Content",
          text: "Fill in the required information for your chosen QR code type"
        },
        {
          name: "Customize Design",
          text: "Adjust size, colors, and error correction level if needed"
        },
        {
          name: "Generate & Download",
          text: "Generate your QR code and download it as PNG, SVG, or PDF"
        }
      ]}
      faqs={[
        {
          question: "What types of QR codes can I create?",
          answer: "You can create QR codes for URLs, plain text, email addresses, phone numbers, WiFi networks, and contact cards (vCard)."
        },
        {
          question: "What file formats are available for download?",
          answer: "You can download QR codes as PNG (for web/print), SVG (vector format), or PDF (for documents)."
        },
        {
          question: "How do I scan the QR codes I create?",
          answer: "Use any QR code scanner app on your smartphone, or the built-in camera app on most modern phones."
        },
        {
          question: "Can I customize the appearance of my QR codes?",
          answer: "Yes, you can adjust the size, foreground and background colors, and error correction level to suit your needs."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Utility Tools", path: "/utility-tools" },
        { label: "QR Generator", path: "/qr-generator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT2M"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* QR Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="h-5 w-5 mr-2" />
                QR Code Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { type: "text" as QRType, label: "Text", icon: QrCode },
                  { type: "url" as QRType, label: "URL", icon: QrCode },
                  { type: "email" as QRType, label: "Email", icon: Mail },
                  { type: "phone" as QRType, label: "Phone", icon: Phone },
                  { type: "wifi" as QRType, label: "WiFi", icon: Wifi },
                  { type: "contact" as QRType, label: "Contact", icon: User },
                ].map(({ type, label, icon: Icon }) => (
                  <Button
                    key={type}
                    variant={qrType === type ? "default" : "outline"}
                    onClick={() => setQrType(type)}
                    className="h-auto p-3 flex flex-col items-center gap-2"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {getTypeIcon(qrType)}
                <span className="ml-2">
                  {qrType === "text" && "Text Content"}
                  {qrType === "url" && "Website URL"}
                  {qrType === "email" && "Email Address"}
                  {qrType === "phone" && "Phone Number"}
                  {qrType === "wifi" && "WiFi Network"}
                  {qrType === "contact" && "Contact Information"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderInputFields()}
            </CardContent>
          </Card>

          {/* Customization Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Size</label>
                  <span className="text-sm text-muted-foreground">{size[0]}px</span>
                </div>
                <Slider
                  value={size}
                  onValueChange={setSize}
                  max={512}
                  min={128}
                  step={32}
                  className="w-full"
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Foreground Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#FFFFFF"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label className="text-sm font-medium mb-2 block">Error Correction Level</label>
                <Select value={errorCorrection} onValueChange={(value: "L" | "M" | "Q" | "H") => setErrorCorrection(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher levels allow the QR code to be read even if partially damaged
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Download Section */}
        <div className="space-y-6">
          {/* QR Code Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                QR Code Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                {qrImage ? (
                  <div className="relative">
                    <img
                      src={qrImage}
                      alt="Generated QR Code"
                      className="border rounded-lg shadow-sm"
                      style={{ width: Math.min(size[0], 300), height: Math.min(size[0], 300) }}
                    />
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center bg-muted/10"
                    style={{ width: 200, height: 200 }}
                  >
                    <div className="text-center text-muted-foreground">
                      <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">QR code will appear here</p>
                    </div>
                  </div>
                )}

                {generating && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Generating QR code...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          {qrImage && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Download Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button onClick={() => downloadQR("png")} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button onClick={() => downloadQR("svg")} variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download SVG
                  </Button>
                  <Button onClick={() => downloadQR("pdf")} variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline" className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• PNG: Best for web and print use</p>
                  <p>• SVG: Vector format, scalable</p>
                  <p>• PDF: Document embedding</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* QR Code Info */}
          {qrImage && (
            <Card>
              <CardHeader>
                <CardTitle>QR Code Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">{qrType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{size[0]}×{size[0]}px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Error Correction:</span>
                  <span>{errorCorrection}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Length:</span>
                  <span>{getQRContent().length} characters</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Usage Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>💡 QR Code Usage Tips</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Best Practices:</h4>
              <ul className="text-sm space-y-1">
                <li>• Use high contrast colors for better scanning</li>
                <li>• Test QR codes before printing or sharing</li>
                <li>• Include a call-to-action near your QR code</li>
                <li>• Ensure adequate white space around the code</li>
                <li>• Use higher error correction for outdoor use</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Common Use Cases:</h4>
              <ul className="text-sm space-y-1">
                <li>• Business cards and contact sharing</li>
                <li>• WiFi network sharing</li>
                <li>• Website and social media links</li>
                <li>• Event tickets and check-ins</li>
                <li>• Product information and reviews</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  )
}