"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clipboard, Check, Trash2, AlertCircle, LinkIcon } from "lucide-react"
import { nanoid } from "nanoid"

interface ShortenedUrl {
  id: string
  originalUrl: string
  shortCode: string
  createdAt: number
  clicks: number
}

export default function UrlShortener() {
  const [url, setUrl] = useState("")
  const [customAlias, setCustomAlias] = useState("")
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load saved URLs from localStorage
  useEffect(() => {
    const savedUrls = localStorage.getItem("shortenedUrls")
    if (savedUrls) {
      try {
        setShortenedUrls(JSON.parse(savedUrls))
      } catch (e) {
        console.error("Failed to parse saved URLs", e)
      }
    }
  }, [])

  // Save URLs to localStorage when they change
  useEffect(() => {
    localStorage.setItem("shortenedUrls", JSON.stringify(shortenedUrls))
  }, [shortenedUrls])

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString)
      return true
    } catch (e) {
      return false
    }
  }

  const shortenUrl = () => {
    // Reset states
    setError(null)
    setCopied(null)

    // Validate URL
    if (!url) {
      setError("Please enter a URL")
      return
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    // Generate short code or use custom alias
    const shortCode = customAlias || nanoid(6)

    // Check if custom alias is already in use
    if (customAlias && shortenedUrls.some((item) => item.shortCode === customAlias)) {
      setError("This custom alias is already in use")
      setIsLoading(false)
      return
    }

    // Create new shortened URL
    const newUrl: ShortenedUrl = {
      id: nanoid(),
      originalUrl: url,
      shortCode,
      createdAt: Date.now(),
      clicks: 0,
    }

    // Add to list
    setShortenedUrls((prev) => [newUrl, ...prev])

    // Reset form
    setUrl("")
    setCustomAlias("")

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const copyToClipboard = (shortCode: string) => {
    const shortUrl = `${window.location.origin}/s/${shortCode}`
    navigator.clipboard.writeText(shortUrl)
    setCopied(shortCode)
    setTimeout(() => setCopied(null), 2000)
  }

  const deleteUrl = (id: string) => {
    setShortenedUrls((prev) => prev.filter((item) => item.id !== id))
  }

  const clearAllUrls = () => {
    setShortenedUrls([])
  }

  const incrementClicks = (id: string) => {
    setShortenedUrls((prev) => prev.map((item) => (item.id === id ? { ...item, clicks: item.clicks + 1 } : item)))
  }

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">URL Shortener</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Create short, memorable links that redirect to your original URL.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shorten a URL</CardTitle>
            <CardDescription>Enter a long URL to create a shorter, more manageable link.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium mb-1">
                  Long URL
                </label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/very/long/url/that/needs/shortening"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="alias" className="block text-sm font-medium mb-1">
                  Custom Alias (Optional)
                </label>
                <Input
                  id="alias"
                  type="text"
                  placeholder="my-custom-link"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to generate a random code</p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={shortenUrl} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </CardFooter>
        </Card>

        {shortenedUrls.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Shortened URLs</h2>
              <Button variant="outline" size="sm" onClick={clearAllUrls}>
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              {shortenedUrls.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" title={item.originalUrl}>
                          {item.originalUrl}
                        </p>
                        <div className="flex items-center mt-1">
                          <LinkIcon className="h-4 w-4 mr-1 text-blue-500" />
                          <p className="text-blue-500 font-medium">
                            {window.location.origin}/s/{item.shortCode}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(item.shortCode)}>
                          {copied === item.shortCode ? (
                            <Check className="h-4 w-4 mr-1" />
                          ) : (
                            <Clipboard className="h-4 w-4 mr-1" />
                          )}
                          {copied === item.shortCode ? "Copied" : "Copy"}
                        </Button>

                        <Button variant="outline" size="sm" onClick={() => deleteUrl(item.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                      <span>Created: {formatDate(item.createdAt)}</span>
                      <span>Clicks: {item.clicks}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">How to Use URL Shortener</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Enter the long URL you want to shorten</li>
            <li>Optionally add a custom alias (or let us generate one)</li>
            <li>Click "Shorten URL" to create your short link</li>
            <li>Copy the shortened URL and share it anywhere</li>
            <li>Track how many times your link has been clicked</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
