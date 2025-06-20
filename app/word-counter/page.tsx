"use client"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WordCounterPage() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  })

  useEffect(() => {
    const calculateStats = () => {
      const characters = text.length
      const charactersNoSpaces = text.replace(/\s/g, "").length
      const words = text.trim() ? text.trim().split(/\s+/).length : 0
      const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0
      const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0
      const readingTime = Math.ceil(words / 200) // Average reading speed: 200 words per minute

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime,
      })
    }

    calculateStats()
  }, [text])

  const statCards = [
    { label: "Words", value: stats.words, color: "text-blue-500" },
    { label: "Characters", value: stats.characters, color: "text-green-500" },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces, color: "text-purple-500" },
    { label: "Sentences", value: stats.sentences, color: "text-orange-500" },
    { label: "Paragraphs", value: stats.paragraphs, color: "text-red-500" },
    { label: "Reading Time", value: `${stats.readingTime} min`, color: "text-indigo-500" },
  ]

  // Add download function
  const downloadStats = () => {
    if (!text) return

    const content = [
      "TEXT ANALYSIS REPORT",
      "=".repeat(25),
      "",
      "STATISTICS:",
      `• Words: ${stats.words}`,
      `• Characters: ${stats.characters}`,
      `• Characters (no spaces): ${stats.charactersNoSpaces}`,
      `• Sentences: ${stats.sentences}`,
      `• Paragraphs: ${stats.paragraphs}`,
      `• Reading Time: ${stats.readingTime} minutes`,
      "",
      "ANALYSIS:",
      `• Average words per sentence: ${stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}`,
      `• Average characters per word: ${stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0}`,
      `• Text density: ${stats.characters > 0 ? Math.round((stats.charactersNoSpaces / stats.characters) * 100) : 0}% (excluding spaces)`,
      "",
      "ORIGINAL TEXT:",
      "-".repeat(15),
      text,
      "",
      `Analysis performed on: ${new Date().toLocaleString()}`,
      "Powered by FreeTools.online",
    ].join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `text-analysis-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Word Counter - Count Words & Characters Online Free"
      description="Count words, characters, and analyze text in real-time. Perfect for essays, articles, social media posts, and content creation."
      icon={<Calculator className="h-8 w-8 text-green-500" />}
      toolCategory="text-tools"
      howToSteps={[
        {
          name: "Enter Your Text",
          text: "Type or paste your text in the input area"
        },
        {
          name: "View Statistics",
          text: "See real-time word count, character count, and other statistics"
        },
        {
          name: "Analyze Text",
          text: "Review detailed analysis including reading time and text density"
        },
        {
          name: "Download Report",
          text: "Download a detailed analysis report of your text"
        }
      ]}
      faqs={[
        {
          question: "How is reading time calculated?",
          answer: "Reading time is calculated based on an average reading speed of 200 words per minute, which is the standard for adult readers."
        },
        {
          question: "What counts as a word?",
          answer: "Words are counted as sequences of characters separated by spaces. Numbers, abbreviations, and contractions each count as one word."
        },
        {
          question: "How are sentences counted?",
          answer: "Sentences are counted by identifying text segments that end with periods, exclamation marks, or question marks."
        },
        {
          question: "Can I analyze very long texts?",
          answer: "Yes, there's no limit to the text length you can analyze. The tool works efficiently with documents of any size."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Text Tools", path: "/text-tools" },
        { label: "Word Counter", path: "/word-counter" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-4">
        {/* Text Input */}
        <Card>
          <CardContent className="p-4">
            {/* Add download button after the text input */}
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Enter your text</label>
              {text && (
                <Button onClick={downloadStats} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              )}
            </div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="min-h-[150px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        {text && (
          <Card className="animate-fade-in">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Text Analysis</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  • Average words per sentence: {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}
                </p>
                <p>
                  • Average characters per word:{" "}
                  {stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0}
                </p>
                <p>
                  • Text density:{" "}
                  {stats.characters > 0 ? Math.round((stats.charactersNoSpaces / stats.characters) * 100) : 0}%
                  (excluding spaces)
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  )
}
