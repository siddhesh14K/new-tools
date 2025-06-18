"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/copy-button"
import { Type, Download, RefreshCw } from "lucide-react"

export default function LoremGeneratorPage() {
  const [generatedText, setGeneratedText] = useState("")
  const [count, setCount] = useState("5")
  const [type, setType] = useState("paragraphs")
  const [startWithLorem, setStartWithLorem] = useState(true)

  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
    "at",
    "vero",
    "eos",
    "accusamus",
    "accusantium",
    "doloremque",
    "laudantium",
    "totam",
    "rem",
    "aperiam",
    "eaque",
    "ipsa",
    "quae",
    "ab",
    "illo",
    "inventore",
    "veritatis",
    "et",
    "quasi",
    "architecto",
    "beatae",
    "vitae",
    "dicta",
    "sunt",
    "explicabo",
    "nemo",
    "ipsam",
    "voluptatem",
    "quia",
    "voluptas",
    "aspernatur",
    "aut",
    "odit",
    "fugit",
    "sed",
    "quia",
    "consequuntur",
    "magni",
    "dolores",
    "ratione",
    "sequi",
    "nesciunt",
    "neque",
    "porro",
    "quisquam",
    "dolorem",
    "adipisci",
    "numquam",
    "eius",
    "modi",
    "tempora",
    "incidunt",
    "magnam",
    "quaerat",
    "voluptatem",
    "aliquam",
    "quaerat",
  ]

  const generateWords = (wordCount: number): string => {
    const words = []
    for (let i = 0; i < wordCount; i++) {
      if (i === 0 && startWithLorem) {
        words.push("Lorem")
      } else if (i === 1 && startWithLorem) {
        words.push("ipsum")
      } else {
        const randomIndex = Math.floor(Math.random() * loremWords.length)
        words.push(loremWords[randomIndex])
      }
    }
    return words.join(" ")
  }

  const generateSentence = (): string => {
    const sentenceLength = Math.floor(Math.random() * 15) + 8 // 8-22 words
    const sentence = generateWords(sentenceLength)
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + "."
  }

  const generateParagraph = (): string => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3 // 3-7 sentences
    const sentences = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }
    return sentences.join(" ")
  }

  const generateText = () => {
    const numCount = Number.parseInt(count) || 1
    let result = ""

    switch (type) {
      case "words":
        result = generateWords(numCount)
        break
      case "sentences":
        const sentences = []
        for (let i = 0; i < numCount; i++) {
          sentences.push(generateSentence())
        }
        result = sentences.join(" ")
        break
      case "paragraphs":
        const paragraphs = []
        for (let i = 0; i < numCount; i++) {
          paragraphs.push(generateParagraph())
        }
        result = paragraphs.join("\n\n")
        break
      case "lists":
        const listItems = []
        for (let i = 0; i < numCount; i++) {
          listItems.push(`• ${generateSentence()}`)
        }
        result = listItems.join("\n")
        break
    }

    setGeneratedText(result)
  }

  const downloadText = () => {
    if (!generatedText) return

    const blob = new Blob([generatedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lorem-ipsum-${type}-${count}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyAsHTML = () => {
    if (!generatedText) return

    let htmlText = ""
    switch (type) {
      case "paragraphs":
        const paragraphs = generatedText.split("\n\n")
        htmlText = paragraphs.map((p) => `<p>${p}</p>`).join("\n")
        break
      case "lists":
        const items = generatedText.split("\n").map((item) => `<li>${item.replace("• ", "")}</li>`)
        htmlText = `<ul>\n${items.join("\n")}\n</ul>`
        break
      default:
        htmlText = `<p>${generatedText}</p>`
    }

    navigator.clipboard.writeText(htmlText)
  }

  // Generate initial text
  useState(() => {
    generateText()
  })

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate Lorem Ipsum placeholder text for your designs and layouts. Create words, sentences, paragraphs, and lists instantly."
      icon={<Type className="h-8 w-8 text-purple-500" />}
    >
      <div className="space-y-6">
        {/* Generator Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Generator Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Generate</label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="5"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="lists">List Items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={generateText} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="startWithLorem"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="startWithLorem" className="text-sm">
                Start with "Lorem ipsum"
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Generated Text */}
        {generatedText && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated Lorem Ipsum
                <div className="flex gap-2">
                  <CopyButton text={generatedText} />
                  <Button onClick={copyAsHTML} variant="outline" size="sm">
                    Copy HTML
                  </Button>
                  <Button onClick={downloadText} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={generatedText} readOnly className="min-h-[300px] font-serif text-base leading-relaxed" />
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <strong>Characters:</strong> {generatedText.length}
                  </div>
                  <div>
                    <strong>Words:</strong> {generatedText.split(/\s+/).length}
                  </div>
                  <div>
                    <strong>Sentences:</strong> {generatedText.split(/[.!?]+/).filter((s) => s.trim()).length}
                  </div>
                  <div>
                    <strong>Paragraphs:</strong> {generatedText.split(/\n\s*\n/).filter((p) => p.trim()).length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Presets */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCount("50")
                  setType("words")
                  setTimeout(generateText, 100)
                }}
              >
                50 Words
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCount("5")
                  setType("sentences")
                  setTimeout(generateText, 100)
                }}
              >
                5 Sentences
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCount("3")
                  setType("paragraphs")
                  setTimeout(generateText, 100)
                }}
              >
                3 Paragraphs
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCount("10")
                  setType("lists")
                  setTimeout(generateText, 100)
                }}
              >
                10 List Items
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content */}
        <div className="prose max-w-none mt-12">
          <h2>About Lorem Ipsum</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book.
          </p>

          <h3>Why Use Lorem Ipsum?</h3>
          <ul>
            <li>
              <strong>Focus on Design:</strong> Prevents content from distracting from visual design
            </li>
            <li>
              <strong>Standard Practice:</strong> Widely recognized placeholder text in the industry
            </li>
            <li>
              <strong>Neutral Content:</strong> Doesn't favor any particular language or meaning
            </li>
            <li>
              <strong>Proper Length:</strong> Provides realistic text length for layouts
            </li>
          </ul>

          <h3>Use Cases</h3>
          <ul>
            <li>Website mockups and wireframes</li>
            <li>Print design layouts</li>
            <li>Content management system testing</li>
            <li>Typography and font testing</li>
            <li>Template and theme development</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
