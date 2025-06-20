import { ToolLayout } from "@/components/tool-layout"
import { ToolsGrid } from "@/components/tools-grid"
import { Youtube, Instagram, Twitter, Facebook, Share2, Download, Users, TrendingUp } from "lucide-react"

const socialMediaTools = [
  {
    title: "YouTube Thumbnail Downloader",
    description: "Download HD YouTube video thumbnails in multiple resolutions instantly",
    href: "/youtube-thumbnail-downloader",
    icon: Youtube,
    category: "Social Media",
    color: "text-red-600",
    featured: true,
    keywords: ["youtube", "thumbnail", "download", "HD", "video"]
  },
  {
    title: "Instagram Story Viewer",
    description: "View and download Instagram stories anonymously without logging in",
    href: "/instagram-story-viewer",
    icon: Instagram,
    category: "Social Media",
    color: "text-pink-500",
    featured: true,
    keywords: ["instagram", "story", "viewer", "anonymous", "download"]
  },
  {
    title: "Social Media Post Scheduler",
    description: "Plan and schedule your social media posts across multiple platforms",
    href: "/social-media-scheduler",
    icon: Share2,
    category: "Social Media",
    color: "text-blue-500",
    keywords: ["schedule", "post", "social media", "planning", "automation"]
  },
  {
    title: "Hashtag Generator",
    description: "Generate trending hashtags for Instagram, Twitter, and other platforms",
    href: "/hashtag-generator",
    icon: TrendingUp,
    category: "Social Media",
    color: "text-green-500",
    keywords: ["hashtag", "trending", "instagram", "twitter", "generator"]
  },
  {
    title: "Social Media Analytics",
    description: "Track and analyze your social media performance and engagement",
    href: "/social-media-analytics",
    icon: Users,
    category: "Social Media",
    color: "text-purple-500",
    keywords: ["analytics", "engagement", "performance", "tracking", "metrics"]
  },
  {
    title: "Video Downloader",
    description: "Download videos from YouTube, Instagram, TikTok, and other platforms",
    href: "/video-downloader",
    icon: Download,
    category: "Social Media",
    color: "text-indigo-500",
    keywords: ["video", "download", "youtube", "instagram", "tiktok"]
  }
]

export default function SocialMediaToolsPage() {
  return (
    <ToolLayout
      title="Free Social Media Tools 2024 - YouTube, Instagram, Twitter Tools"
      description="Essential social media tools for content creators, marketers, and influencers. Download thumbnails, view stories, generate hashtags, and analyze performance."
      icon={<Share2 className="h-8 w-8 text-pink-500" />}
      toolCategory="social-media-tools"
      howToSteps={[
        {
          name: "Choose Your Tool",
          text: "Browse our collection of social media tools and select the one you need"
        },
        {
          name: "Enter Content URL",
          text: "Paste the social media URL or enter the content you want to process"
        },
        {
          name: "Process & Download",
          text: "Let the tool process your request and download or view the results"
        },
        {
          name: "Share & Engage",
          text: "Use the processed content for your social media strategy"
        }
      ]}
      faqs={[
        {
          question: "Are these social media tools free to use?",
          answer: "Yes, all our social media tools are completely free to use with no registration required. They work entirely in your browser."
        },
        {
          question: "Can I download content from private accounts?",
          answer: "No, our tools only work with publicly available content. We respect privacy settings and terms of service of social media platforms."
        },
        {
          question: "Is it legal to download social media content?",
          answer: "Downloading public content for personal use is generally acceptable, but always respect copyright and platform terms of service."
        },
        {
          question: "Do you store downloaded content?",
          answer: "No, all processing happens locally in your browser. We don't store, transmit, or have access to any downloaded content."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Social Media Tools", path: "/social-media-tools" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <ToolsGrid tools={socialMediaTools} />
    </ToolLayout>
  )
}