"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"
import { Type, Download } from "lucide-react"

export default function CaseConverterPage() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState<Record<string, string>>({})

  const convertText = (text: string) => {
    if (!text) {
      setResults({})
      return
    }

    const conversions = {
      uppercase: text.toUpperCase(),
      lowercase: text.toLowerCase(),
      titlecase: text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
      sentencecase: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
      camelcase: text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, ""),
      pascalcase: text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, ""),
      snakecase: text.toLowerCase().replace(/\s+/g, "_"),
      kebabcase: text.toLowerCase().replace(/\s+/g, "-"),
      dotcase: text.toLowerCase().replace(/\s+/g, "."),
      constantcase: text.toUpperCase().replace(/\s+/g, "_"),
      alternatingcase: text
        .split("")
        .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
        .join(""),
      inversecase: text
        .split("")
        .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
        .join(""),
    }

    setResults(conversions)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    convertText(value)
  }

  const downloadResult = (text: string, type: string) => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}-converted.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const caseTypes = [
    { key: "uppercase", label: "UPPERCASE", description: "ALL LETTERS IN CAPITAL" },
    { key: "lowercase", label: "lowercase", description: "all letters in small" },
    { key: "titlecase", label: "Title Case", description: "First Letter Of Each Word Capitalized" },
    { key: "sentencecase", label: "Sentence case", description: "First letter capitalized" },
    { key: "camelcase", label: "camelCase", description: "firstWordLowercaseRestCapitalized" },
    { key: "pascalcase", label: "PascalCase", description: "FirstLetterOfEachWordCapitalized" },
    { key: "snakecase", label: "snake_case", description: "words_separated_by_underscores" },
    { key: "kebabcase", label: "kebab-case", description: "words-separated-by-hyphens" },
    { key: "dotcase", label: "dot.case", description: "words.separated.by.dots" },
    { key: "constantcase", label: "CONSTANT_CASE", description: "UPPERCASE_WITH_UNDERSCORES" },
    { key: "alternatingcase", label: "aLtErNaTiNg CaSe", description: "alternating letter cases" },
    { key: "inversecase", label: "iNVERSE cASE", description: "opposite of original case" },
  ]

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text to different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more."
      icon={<Type className="h-8 w-8 text-blue-600" />}
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[120px]"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Characters: {input.length} | Words: {input.trim() ? input.trim().split(/\s+/).length : 0}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseTypes.map((type) => {
              const result = results[type.key]
              if (!result) return null

              return (
                <Card key={type.key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      {type.label}
                      <div className="flex gap-2">
                        <CopyButton text={result} />
                        <Button onClick={() => downloadResult(result, type.key)} variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-muted p-3 rounded text-sm font-mono break-all">{result}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Quick Actions */}
        {input && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setInput(input.toUpperCase())} variant="outline" size="sm">
                  Make UPPERCASE
                </Button>
                <Button onClick={() => setInput(input.toLowerCase())} variant="outline" size="sm">
                  Make lowercase
                </Button>
                <Button onClick={() => setInput("")} variant="outline" size="sm">
                  Clear Text
                </Button>
                <Button
                  onClick={() => {
                    const allResults = Object.entries(results)
                      .map(([key, value]) => `${key.toUpperCase()}:\n${value}\n`)
                      .join("\n")
                    downloadResult(allResults, "all-cases")
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  )
}
