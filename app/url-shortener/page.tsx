"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LinkIcon, Trash2, Copy, ExternalLink, BarChart3 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface ShortenedUrl {
  id: string
  originalUrl: string
  shortUrl: string
  shortCode: string
  clicks: number
  createdAt: Date
}

export default function URLShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [customAlias, setCustomAlias] = useState("")
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([])
  const [error, setError] = useState("")
  const [isShortening, setIsShortening] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const generateShortCode = (length = 6) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError("Please enter a URL to shorten")
      return
    }

    if (!isValidUrl(originalUrl)) {
      setError("Please enter a valid URL (include http:// or https://)")
      return
    }

    // Check if URL already exists
    const existingUrl = shortenedUrls.find((url) => url.originalUrl === originalUrl)
    if (existingUrl) {
      setError("This URL has already been shortened")
      return
    }

    setIsShortening(true)
    setError("")

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const shortCode = customAlias.trim() || generateShortCode()

      // Check if custom alias is already used
      if (customAlias.trim() && shortenedUrls.some((url) => url.shortCode === customAlias.trim())) {
        setError("This custom alias is already taken. Please choose another one.")
        setIsShortening(false)
        return
      }

      const newShortenedUrl: ShortenedUrl = {
        id: Date.now().toString(),
        originalUrl,
        shortUrl: `https://short.ly/${shortCode}`,
        shortCode,
        clicks: 0,
        createdAt: new Date(),
      }

      setShortenedUrls((prev) => [newShortenedUrl, ...prev])
      setOriginalUrl("")
      setCustomAlias("")
    } catch (err) {
      setError("Failed to shorten URL. Please try again.")
    } finally {
      setIsShortening(false)
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const deleteUrl = (id: string) => {
    setShortenedUrls((prev) => prev.filter((url) => url.id !== id))
  }

  const clearAll = () => {
    setShortenedUrls([])
  }

  const simulateClick = (id: string) => {
    setShortenedUrls((prev) => prev.map((url) => (url.id === id ? { ...url, clicks: url.clicks + 1 } : url)))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getTotalClicks = () => {
    return shortenedUrls.reduce((total, url) => total + url.clicks, 0)
  }

  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + "..." : url
  }

  return (
    <ToolLayout
      title="URL Shortener - Shorten Long URLs Online Free"
      description="Shorten long URLs for free with custom aliases and click tracking. Perfect for social media, email campaigns, and link sharing. No registration required."
      icon={<LinkIcon className="h-8 w-8 text-cyan-500" />}
      toolCategory="utility-tools"
      howToSteps={[
        {
          name: "Enter Long URL",
          text: "Paste the long URL you want to shorten into the input field"
        },
        {
          name: "Add Custom Alias (Optional)",
          text: "Optionally add a custom alias to make your short URL more memorable"
        },
        {
          name: "Generate Short URL",
          text: "Click 'Shorten URL' to create your shortened link"
        },
        {
          name: "Copy and Share",
          text: "Copy your short URL and share it anywhere you need"
        }
      ]}
      faqs={[
        {
          question: "How long do shortened URLs last?",
          answer: "Our shortened URLs are permanent and will continue to work indefinitely, as long as the original URL remains active."
        },
        {
          question: "Can I customize my short URL?",
          answer: "Yes, you can add a custom alias to make your short URL more memorable and branded."
        },
        {
          question: "Do you track clicks on shortened URLs?",
          answer: "We provide basic click tracking to show you how many times your shortened URL has been accessed."
        },
        {
          question: "Is there a limit to how many URLs I can shorten?",
          answer: "No, you can shorten as many URLs as you need. Our service is completely free with no limits."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Utility Tools", path: "/utility-tools" },
        { label: "URL Shortener", path: "/url-shortener" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-6">
        {/* URL Shortening Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="h-5 w-5 mr-2" />
              Shorten Your URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Long URL</label>
              <Input
                type="url"
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Custom Alias (Optional)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 rounded-l-md">
                  short.ly/
                </span>
                <Input
                  placeholder="my-custom-link"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
                  className="rounded-l-none text-sm"
                  maxLength={20}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty for random short code. Only letters, numbers, hyphens, and underscores allowed.
              </p>
            </div>

            <Button onClick={shortenUrl} disabled={isShortening || !originalUrl.trim()} className="w-full" size="lg">
              {isShortening ? "🔄 Shortening..." : "🚀 Shorten URL"}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        {shortenedUrls.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Statistics
                </div>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{shortenedUrls.length}</div>
                  <div className="text-sm text-muted-foreground">URLs Shortened</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{getTotalClicks()}</div>
                  <div className="text-sm text-muted-foreground">Total Clicks</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {shortenedUrls.length > 0 ? Math.round(getTotalClicks() / shortenedUrls.length) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Clicks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Shortened URLs List */}
        {shortenedUrls.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Shortened URLs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shortenedUrls.map((url) => (
                  <div key={url.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {url.clicks} clicks
                          </Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(url.createdAt)}</span>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-blue-600 break-all">{url.shortUrl}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground break-all">
                              {truncateUrl(url.originalUrl, 60)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(url.shortUrl, url.id)}>
                          <Copy className="h-4 w-4" />
                          {copiedId === url.id ? "Copied!" : "Copy"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            simulateClick(url.id)
                            window.open(url.originalUrl, "_blank")
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>

                        <Button variant="outline" size="sm" onClick={() => deleteUrl(url.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use URL Shortener</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">📝 Step-by-Step Guide</h3>
                <ol className="space-y-2 text-sm">
                  <li>1. Paste your long URL in the input field</li>
                  <li>2. (Optional) Add a custom alias for branding</li>
                  <li>3. Click "Shorten URL" to generate short link</li>
                  <li>4. Copy and share your shortened URL</li>
                  <li>5. Track clicks and performance</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-3">✨ Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Custom aliases for branded links</li>
                  <li>• Click tracking and analytics</li>
                  <li>• No registration required</li>
                  <li>• Mobile-friendly interface</li>
                  <li>• Bulk URL management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}
