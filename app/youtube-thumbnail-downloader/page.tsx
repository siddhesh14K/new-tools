"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Youtube, Image as ImageIcon, Copy, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ThumbnailQuality {
  name: string
  url: string
  size: string
  quality: string
}

export default function YouTubeThumbnailDownloaderPage() {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoId, setVideoId] = useState("")
  const [thumbnails, setThumbnails] = useState<ThumbnailQuality[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")

  const extractVideoId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return ""
  }

  const generateThumbnails = async () => {
    if (!videoUrl.trim()) {
      setError("Please enter a YouTube video URL or ID")
      return
    }

    setLoading(true)
    setError("")

    try {
      const id = extractVideoId(videoUrl.trim())
      if (!id) {
        setError("Invalid YouTube URL. Please enter a valid YouTube video URL or ID")
        setLoading(false)
        return
      }

      setVideoId(id)

      // Generate all thumbnail qualities
      const thumbnailQualities: ThumbnailQuality[] = [
        {
          name: "Maximum Quality",
          url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
          size: "1280x720",
          quality: "HD"
        },
        {
          name: "Standard Quality", 
          url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
          size: "640x480",
          quality: "SD"
        },
        {
          name: "High Quality",
          url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          size: "480x360",
          quality: "HQ"
        },
        {
          name: "Medium Quality",
          url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          size: "320x180",
          quality: "MQ"
        },
        {
          name: "Default Quality",
          url: `https://img.youtube.com/vi/${id}/default.jpg`,
          size: "120x90",
          quality: "Default"
        }
      ]

      setThumbnails(thumbnailQualities)
      
      // Try to get video title (simplified approach)
      setVideoTitle(`Video ID: ${id}`)

    } catch (err) {
      setError("Failed to generate thumbnails. Please check the URL and try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const downloadThumbnail = async (thumbnail: ThumbnailQuality) => {
    try {
      const response = await fetch(thumbnail.url)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `youtube-thumbnail-${videoId}-${thumbnail.quality.toLowerCase()}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError("Failed to download thumbnail")
    }
  }

  const copyThumbnailUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  const openInNewTab = (url: string) => {
    window.open(url, '_blank')
  }

  const clearAll = () => {
    setVideoUrl("")
    setVideoId("")
    setThumbnails([])
    setError("")
    setVideoTitle("")
  }

  return (
    <ToolLayout
      title="YouTube Thumbnail Downloader - Download HD YouTube Thumbnails Free"
      description="Download YouTube video thumbnails in HD quality for free. Get maximum resolution thumbnails from any YouTube video instantly. No registration required."
      icon={<Youtube className="h-8 w-8 text-red-600" />}
      keywords="youtube thumbnail downloader, download youtube thumbnail, youtube thumbnail extractor, HD youtube thumbnails, youtube video thumbnail"
      toolCategory="social-media-tools"
      howToSteps={[
        {
          name: "Enter YouTube URL",
          text: "Paste the YouTube video URL or video ID into the input field"
        },
        {
          name: "Generate Thumbnails",
          text: "Click 'Get Thumbnails' to extract all available thumbnail qualities"
        },
        {
          name: "Choose Quality",
          text: "Select from HD, Standard, High, Medium, or Default quality thumbnails"
        },
        {
          name: "Download or Copy",
          text: "Download the thumbnail or copy the direct URL to use elsewhere"
        }
      ]}
      faqs={[
        {
          question: "What thumbnail qualities are available?",
          answer: "We provide 5 different qualities: Maximum (1280x720 HD), Standard (640x480), High (480x360), Medium (320x180), and Default (120x90)."
        },
        {
          question: "Can I download thumbnails from any YouTube video?",
          answer: "Yes, you can download thumbnails from any public YouTube video using the video URL or video ID."
        },
        {
          question: "Is it legal to download YouTube thumbnails?",
          answer: "YouTube thumbnails are publicly accessible images. However, respect copyright and use them according to YouTube's terms of service."
        },
        {
          question: "Do I need to install any software?",
          answer: "No, this is a web-based tool that works directly in your browser. No downloads or installations required."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Social Media Tools", path: "/social-media-tools" },
        { label: "YouTube Thumbnail Downloader", path: "/youtube-thumbnail-downloader" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Youtube className="h-5 w-5 mr-2 text-red-600" />
              YouTube Video URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID or just VIDEO_ID"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={generateThumbnails} disabled={loading}>
                {loading ? "Loading..." : "Get Thumbnails"}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Supported formats:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
                <li>https://youtu.be/VIDEO_ID</li>
                <li>https://www.youtube.com/embed/VIDEO_ID</li>
                <li>Just the VIDEO_ID (11 characters)</li>
              </ul>
            </div>

            {thumbnails.length > 0 && (
              <Button onClick={clearAll} variant="outline" size="sm">
                Clear All
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Thumbnails Display */}
        {thumbnails.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Available Thumbnails
                {videoTitle && <span className="ml-2 text-sm font-normal text-muted-foreground">({videoTitle})</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                      <img
                        src={thumbnail.url}
                        alt={`${thumbnail.name} thumbnail`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                        <ImageIcon className="h-8 w-8" />
                        <span className="ml-2">Not Available</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold">{thumbnail.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {thumbnail.size} • {thumbnail.quality}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => downloadThumbnail(thumbnail)}
                          size="sm"
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          onClick={() => copyThumbnailUrl(thumbnail.url)}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => openInNewTab(thumbnail.url)}
                          variant="outline"
                          size="sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="prose max-w-none mt-12 bg-muted/30 rounded-2xl p-8">
          <h2>🎬 Free YouTube Thumbnail Downloader 2024</h2>
          <p>
            Download high-quality YouTube video thumbnails instantly with our free online tool. 
            Get HD thumbnails in multiple resolutions for your projects, presentations, or content creation.
          </p>

          <h3>🎯 Why Download YouTube Thumbnails?</h3>
          <ul>
            <li><strong>Content Creation:</strong> Use thumbnails for video previews and social media</li>
            <li><strong>Presentations:</strong> Add visual elements to your slides and documents</li>
            <li><strong>Research:</strong> Analyze thumbnail designs and trends</li>
            <li><strong>Backup:</strong> Save thumbnails before videos are deleted</li>
            <li><strong>Design Inspiration:</strong> Study successful thumbnail designs</li>
          </ul>

          <h3>📊 Available Thumbnail Qualities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-lg mb-2">🎯 Quality Options</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Maximum:</strong> 1280x720 (HD)</li>
                <li>• <strong>Standard:</strong> 640x480 (SD)</li>
                <li>• <strong>High:</strong> 480x360 (HQ)</li>
                <li>• <strong>Medium:</strong> 320x180 (MQ)</li>
                <li>• <strong>Default:</strong> 120x90 (Thumbnail)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-lg mb-2">✨ Features</h4>
              <ul className="text-sm space-y-1">
                <li>• Instant thumbnail extraction</li>
                <li>• Multiple quality options</li>
                <li>• Direct download links</li>
                <li>• Copy URL functionality</li>
                <li>• No registration required</li>
              </ul>
            </div>
          </div>

          <h3>🚀 How to Use YouTube Thumbnails</h3>
          <ol>
            <li><strong>Social Media:</strong> Share video previews on Instagram, Twitter, Facebook</li>
            <li><strong>Blog Posts:</strong> Add visual elements to your articles</li>
            <li><strong>Presentations:</strong> Include in PowerPoint or Google Slides</li>
            <li><strong>Video Editing:</strong> Use as placeholder or reference images</li>
            <li><strong>Design Projects:</strong> Incorporate into graphics and layouts</li>
          </ol>

          <h3>💡 Pro Tips for Content Creators</h3>
          <ul>
            <li>Study successful thumbnails in your niche for inspiration</li>
            <li>Download thumbnails from trending videos to analyze design patterns</li>
            <li>Use HD quality thumbnails for professional presentations</li>
            <li>Save thumbnails before videos are deleted or made private</li>
            <li>Compare thumbnail styles across different channels</li>
          </ul>

          <h3>🔒 Legal and Ethical Use</h3>
          <p>
            While YouTube thumbnails are publicly accessible, always respect copyright and intellectual property rights. 
            Use thumbnails responsibly and in accordance with YouTube's terms of service and fair use guidelines.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}