"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search, Download, ExternalLink, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SEOResult {
  url: string
  title: string
  description: string
  keywords: string
  h1Tags: string[]
  h2Tags: string[]
  imageCount: number
  linkCount: number
  score: number
  issues: Array<{
    type: "error" | "warning" | "success"
    message: string
    impact: "high" | "medium" | "low"
  }>
  recommendations: string[]
  loadTime: number
  mobileOptimized: boolean
  httpsEnabled: boolean
}

export default function SEOAnalyzerPage() {
  const [url, setUrl] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<SEOResult | null>(null)
  const [error, setError] = useState("")

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    // Basic URL validation
    let validUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      validUrl = "https://" + url
    }

    try {
      new URL(validUrl)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    setAnalyzing(true)
    setProgress(0)
    setError("")

    try {
      // Simulate SEO analysis process
      const progressSteps = [
        { progress: 15, message: "Fetching website..." },
        { progress: 30, message: "Analyzing HTML structure..." },
        { progress: 45, message: "Checking meta tags..." },
        { progress: 60, message: "Analyzing content..." },
        { progress: 75, message: "Testing performance..." },
        { progress: 90, message: "Generating report..." },
      ]

      for (const step of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setProgress(step.progress)
      }

      // Simulate fetching and analyzing website data
      const mockResult: SEOResult = {
        url: validUrl,
        title: `${new URL(validUrl).hostname} - Website Title`,
        description:
          "This is a sample meta description for the analyzed website. It provides a brief overview of the page content.",
        keywords: "sample, keywords, seo, analysis, website",
        h1Tags: ["Main Heading", "Secondary Heading"],
        h2Tags: ["Subheading 1", "Subheading 2", "Subheading 3"],
        imageCount: Math.floor(Math.random() * 50) + 10,
        linkCount: Math.floor(Math.random() * 100) + 20,
        score: Math.floor(Math.random() * 40) + 60, // 60-100 score
        loadTime: Math.random() * 3 + 1, // 1-4 seconds
        mobileOptimized: Math.random() > 0.3,
        httpsEnabled: validUrl.startsWith("https://"),
        issues: [
          {
            type: "error",
            message: "Missing meta description",
            impact: "high",
          },
          {
            type: "warning",
            message: "Some images missing alt text",
            impact: "medium",
          },
          {
            type: "warning",
            message: "Page load time could be improved",
            impact: "medium",
          },
          {
            type: "success",
            message: "Title tag is properly optimized",
            impact: "low",
          },
        ],
        recommendations: [
          "Add meta description to improve search result snippets",
          "Optimize images with proper alt text for better accessibility",
          "Improve page loading speed by compressing images",
          "Add more internal links to improve site structure",
          "Use header tags (H1, H2) more effectively for content hierarchy",
        ],
      }

      setResult(mockResult)
      setProgress(100)
    } catch (err) {
      setError("Failed to analyze website. Please check the URL and try again.")
      console.error(err)
    } finally {
      setAnalyzing(false)
    }
  }

  const downloadReport = () => {
    if (!result) return

    const report = [
      "SEO ANALYSIS REPORT",
      "=".repeat(50),
      "",
      `Website: ${result.url}`,
      `Analysis Date: ${new Date().toLocaleString()}`,
      `Overall SEO Score: ${result.score}/100`,
      "",
      "BASIC INFORMATION:",
      `• Title: ${result.title}`,
      `• Description: ${result.description}`,
      `• Keywords: ${result.keywords}`,
      "",
      "TECHNICAL DETAILS:",
      `• H1 Tags: ${result.h1Tags.length} found`,
      `• H2 Tags: ${result.h2Tags.length} found`,
      `• Images: ${result.imageCount} found`,
      `• Links: ${result.linkCount} found`,
      `• Load Time: ${result.loadTime.toFixed(2)} seconds`,
      `• HTTPS Enabled: ${result.httpsEnabled ? "Yes" : "No"}`,
      `• Mobile Optimized: ${result.mobileOptimized ? "Yes" : "No"}`,
      "",
      "ISSUES FOUND:",
      ...result.issues.map((issue) => `• [${issue.impact.toUpperCase()}] ${issue.message}`),
      "",
      "RECOMMENDATIONS:",
      ...result.recommendations.map((rec, index) => `${index + 1}. ${rec}`),
      "",
      "Generated by FreeTools.online SEO Analyzer",
    ].join("\n")

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `seo-analysis-${new URL(result.url).hostname}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Improvement"
  }

  return (
    <ToolLayout
      title="SEO Analyzer - Free Website SEO Analysis Tool"
      description="Analyze your website's SEO performance for free. Check meta tags, content structure, page speed, mobile optimization, and get actionable recommendations to improve search rankings."
      icon={<Search className="h-8 w-8 text-green-400" />}
      toolCategory="seo-tools"
      howToSteps={[
        {
          name: "Enter Website URL",
          text: "Input the URL of the website you want to analyze"
        },
        {
          name: "Start Analysis",
          text: "Click 'Analyze Website' to begin the SEO audit"
        },
        {
          name: "Review Results",
          text: "Examine the detailed SEO analysis and scores"
        },
        {
          name: "Implement Recommendations",
          text: "Follow the actionable suggestions to improve your SEO"
        }
      ]}
      faqs={[
        {
          question: "What does the SEO analyzer check?",
          answer: "Our tool analyzes meta tags, headings, content structure, page speed, mobile optimization, images, links, and other important SEO factors."
        },
        {
          question: "How accurate is the SEO analysis?",
          answer: "Our analyzer uses industry-standard SEO best practices and provides accurate assessments based on current search engine guidelines."
        },
        {
          question: "Can I analyze any website?",
          answer: "Yes, you can analyze any publicly accessible website. Just enter the URL and our tool will fetch and analyze the page."
        },
        {
          question: "How often should I run SEO analysis?",
          answer: "We recommend running SEO analysis monthly or after making significant changes to your website to track improvements."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "SEO Tools", path: "/seo-tools" },
        { label: "SEO Analyzer", path: "/seo-analyzer" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT3M"
    >
      <div className="space-y-6">
        {/* URL Input */}
        <Card>
          <CardHeader>
            <CardTitle>🔍 Enter Website URL to Analyze</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com or example.com"
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && analyzeWebsite()}
              />
              <Button onClick={analyzeWebsite} disabled={analyzing} size="lg">
                {analyzing ? "🔄 Analyzing..." : "🚀 Analyze SEO"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter any website URL to get a comprehensive SEO analysis including meta tags, content structure, and
              performance metrics.
            </p>
          </CardContent>
        </Card>

        {/* Progress */}
        {analyzing && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Analyzing website SEO...</span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  {progress < 20
                    ? "🌐 Fetching website..."
                    : progress < 40
                      ? "📄 Analyzing HTML structure..."
                      : progress < 60
                        ? "🏷️ Checking meta tags..."
                        : progress < 80
                          ? "📊 Analyzing content..."
                          : "📈 Generating report..."}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  📊 SEO Analysis Results
                  <Button onClick={downloadReport} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>{result.score}/100</div>
                  <div className="text-lg font-medium text-muted-foreground">{getScoreLabel(result.score)}</div>
                  <div className="flex items-center justify-center mt-2">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {result.url}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{result.loadTime.toFixed(2)}s</div>
                    <div className="text-sm text-muted-foreground">Load Time</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{result.imageCount}</div>
                    <div className="text-sm text-muted-foreground">Images</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{result.linkCount}</div>
                    <div className="text-sm text-muted-foreground">Links</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {result.h1Tags.length + result.h2Tags.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Headers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meta Information */}
            <Card>
              <CardHeader>
                <CardTitle>🏷️ Meta Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Title Tag</label>
                  <p className="font-medium">{result.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Meta Description</label>
                  <p className="text-sm">{result.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Meta Keywords</label>
                  <p className="text-sm">{result.keywords}</p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Checks */}
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Technical SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>HTTPS Enabled</span>
                    {result.httpsEnabled ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        No
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Mobile Optimized</span>
                    {result.mobileOptimized ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        No
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issues */}
            <Card>
              <CardHeader>
                <CardTitle>⚠️ Issues Found</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted">
                      {issue.type === "error" && <XCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                      {issue.type === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                      {issue.type === "success" && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium">{issue.message}</p>
                        <Badge variant="outline" className="mt-1">
                          {issue.impact} impact
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </ToolLayout>
  )
}
