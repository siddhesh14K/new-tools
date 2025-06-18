"use client"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

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

  const howToUse = [
    "Type or paste your text in the input area",
    "View real-time statistics as you type",
    "Get word count, character count, and reading time",
    "Perfect for essays, articles, and social media posts",
  ]

  const statCards = [
    { label: "Words", value: stats.words, color: "text-blue-500" },
    { label: "Characters", value: stats.characters, color: "text-green-500" },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces, color: "text-purple-500" },
    { label: "Sentences", value: stats.sentences, color: "text-orange-500" },
    { label: "Paragraphs", value: stats.paragraphs, color: "text-red-500" },
    { label: "Reading Time", value: `${stats.readingTime} min`, color: "text-indigo-500" },
  ]

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, and analyze text in real-time"
      icon={<Calculator className="h-8 w-8 text-green-500" />}
      howToUse={howToUse}
    >
      <div className="space-y-4">
        {/* Text Input */}
        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-medium mb-2">Enter your text</label>
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
