"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CopyButton } from "@/components/copy-button"
import { Type, RotateCw, Trash2, Download } from "lucide-react"

interface FormatOptions {
  removeExtraSpaces: boolean
  removeExtraLineBreaks: boolean
  removeSpecialChars: boolean
  removeNumbers: boolean
  removeEmptyLines: boolean
  trimLines: boolean
  addLineNumbers: boolean
  sortLines: boolean
  removeDuplicateLines: boolean
  convertTabs: boolean
}

export default function TextFormatterPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [options, setOptions] = useState<FormatOptions>({
    removeExtraSpaces: true,
    removeExtraLineBreaks: true,
    removeSpecialChars: false,
    removeNumbers: false,
    removeEmptyLines: false,
    trimLines: true,
    addLineNumbers: false,
    sortLines: false,
    removeDuplicateLines: false,
    convertTabs: false,
  })

  const formatText = () => {
    let result = inputText

    // Remove extra spaces
    if (options.removeExtraSpaces) {
      result = result.replace(/\s+/g, " ")
    }

    // Remove extra line breaks
    if (options.removeExtraLineBreaks) {
      result = result.replace(/\n\s*\n\s*\n/g, "\n\n")
    }

    // Convert tabs to spaces
    if (options.convertTabs) {
      result = result.replace(/\t/g, "    ")
    }

    // Process line by line
    let lines = result.split("\n")

    // Trim lines
    if (options.trimLines) {
      lines = lines.map((line) => line.trim())
    }

    // Remove empty lines
    if (options.removeEmptyLines) {
      lines = lines.filter((line) => line.length > 0)
    }

    // Remove duplicate lines
    if (options.removeDuplicateLines) {
      lines = [...new Set(lines)]
    }

    // Sort lines
    if (options.sortLines) {
      lines = lines.sort()
    }

    // Join lines back
    result = lines.join("\n")

    // Remove special characters
    if (options.removeSpecialChars) {
      result = result.replace(/[^\w\s\n]/g, "")
    }

    // Remove numbers
    if (options.removeNumbers) {
      result = result.replace(/\d/g, "")
    }

    // Add line numbers
    if (options.addLineNumbers) {
      const numberedLines = result.split("\n").map((line, index) => {
        return `${(index + 1).toString().padStart(3, "0")}. ${line}`
      })
      result = numberedLines.join("\n")
    }

    setOutputText(result)
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
  }

  const downloadText = () => {
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `formatted_text_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const updateOption = (key: keyof FormatOptions, value: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }

  const getStats = (text: string) => {
    const lines = text.split("\n")
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, "").length

    return {
      lines: lines.length,
      words,
      characters: chars,
      charactersNoSpaces: charsNoSpaces,
    }
  }

  const inputStats = getStats(inputText)
  const outputStats = getStats(outputText)

  return (
    <ToolLayout
      title="Text Formatter - Format and Clean Text Online Free"
      description="Format, clean, and organize text online for free. Remove extra spaces, line breaks, special characters, sort lines, add line numbers and more."
      icon={<Type className="h-8 w-8 text-blue-700" />}
      toolCategory="text-tools"
      howToSteps={[
        {
          name: "Paste Your Text",
          text: "Enter or paste the text you want to format in the input area"
        },
        {
          name: "Choose Formatting Options",
          text: "Select the formatting operations you want to apply"
        },
        {
          name: "Apply Formatting",
          text: "Click the formatting buttons to clean and organize your text"
        },
        {
          name: "Copy Results",
          text: "Copy the formatted text or download it as a file"
        }
      ]}
      faqs={[
        {
          question: "What text formatting options are available?",
          answer: "You can remove extra spaces, trim lines, remove line breaks, sort lines, add line numbers, remove special characters, and more."
        },
        {
          question: "Can I apply multiple formatting operations at once?",
          answer: "Yes, you can apply multiple formatting operations in sequence to achieve the exact text format you need."
        },
        {
          question: "Is there a limit to how much text I can format?",
          answer: "There's no strict limit, but very large texts may take longer to process. The tool works best with typical document sizes."
        },
        {
          question: "Can I undo formatting changes?",
          answer: "The tool processes text in real-time. To undo changes, you can paste your original text again or use your browser's undo function."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Text Tools", path: "/text-tools" },
        { label: "Text Formatter", path: "/text-formatter" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              📝 Input Text
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste or type your text here to format and clean it..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
              <div className="flex gap-4">
                <span>Lines: {inputStats.lines}</span>
                <span>Words: {inputStats.words}</span>
                <span>Characters: {inputStats.characters}</span>
                <span>No spaces: {inputStats.charactersNoSpaces}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formatting Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RotateCw className="h-5 w-5 mr-2" />
              Formatting Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Cleanup</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeExtraSpaces"
                      checked={options.removeExtraSpaces}
                      onCheckedChange={(checked) => updateOption("removeExtraSpaces", checked as boolean)}
                    />
                    <label htmlFor="removeExtraSpaces" className="text-sm">
                      Remove extra spaces
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeExtraLineBreaks"
                      checked={options.removeExtraLineBreaks}
                      onCheckedChange={(checked) => updateOption("removeExtraLineBreaks", checked as boolean)}
                    />
                    <label htmlFor="removeExtraLineBreaks" className="text-sm">
                      Remove extra line breaks
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeEmptyLines"
                      checked={options.removeEmptyLines}
                      onCheckedChange={(checked) => updateOption("removeEmptyLines", checked as boolean)}
                    />
                    <label htmlFor="removeEmptyLines" className="text-sm">
                      Remove empty lines
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="trimLines"
                      checked={options.trimLines}
                      onCheckedChange={(checked) => updateOption("trimLines", checked as boolean)}
                    />
                    <label htmlFor="trimLines" className="text-sm">
                      Trim line spaces
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Remove Content</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeSpecialChars"
                      checked={options.removeSpecialChars}
                      onCheckedChange={(checked) => updateOption("removeSpecialChars", checked as boolean)}
                    />
                    <label htmlFor="removeSpecialChars" className="text-sm">
                      Remove special characters
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeNumbers"
                      checked={options.removeNumbers}
                      onCheckedChange={(checked) => updateOption("removeNumbers", checked as boolean)}
                    />
                    <label htmlFor="removeNumbers" className="text-sm">
                      Remove numbers
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeDuplicateLines"
                      checked={options.removeDuplicateLines}
                      onCheckedChange={(checked) => updateOption("removeDuplicateLines", checked as boolean)}
                    />
                    <label htmlFor="removeDuplicateLines" className="text-sm">
                      Remove duplicate lines
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="convertTabs"
                      checked={options.convertTabs}
                      onCheckedChange={(checked) => updateOption("convertTabs", checked as boolean)}
                    />
                    <label htmlFor="convertTabs" className="text-sm">
                      Convert tabs to spaces
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Organization</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sortLines"
                      checked={options.sortLines}
                      onCheckedChange={(checked) => updateOption("sortLines", checked as boolean)}
                    />
                    <label htmlFor="sortLines" className="text-sm">
                      Sort lines alphabetically
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="addLineNumbers"
                      checked={options.addLineNumbers}
                      onCheckedChange={(checked) => updateOption("addLineNumbers", checked as boolean)}
                    />
                    <label htmlFor="addLineNumbers" className="text-sm">
                      Add line numbers
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={formatText} disabled={!inputText.trim()} className="w-full mt-6" size="lg">
              🚀 Format Text
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        {outputText && (
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center justify-between">
                ✅ Formatted Text
                <div className="flex gap-2">
                  <CopyButton text={outputText} />
                  <Button onClick={downloadText} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={outputText} readOnly className="min-h-[200px] font-mono text-sm bg-white" />
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Before Formatting</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Lines:</span>
                      <span>{inputStats.lines}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Words:</span>
                      <span>{inputStats.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Characters:</span>
                      <span>{inputStats.characters}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">After Formatting</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Lines:</span>
                      <span className="text-green-600 font-medium">{outputStats.lines}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Words:</span>
                      <span className="text-green-600 font-medium">{outputStats.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Characters:</span>
                      <span className="text-green-600 font-medium">{outputStats.characters}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="prose max-w-none mt-12 bg-muted/30 rounded-2xl p-8">
          <h2>🔧 Professional Text Formatter Tool</h2>
          <p>
            Clean, format, and organize your text with our comprehensive text formatting tool. Perfect for writers,
            developers, students, and anyone who works with text content regularly.
          </p>

          <h3>✨ Key Features</h3>
          <ul>
            <li>
              <strong>Space Cleanup:</strong> Remove extra spaces and normalize whitespace
            </li>
            <li>
              <strong>Line Management:</strong> Remove empty lines, extra line breaks, and trim spaces
            </li>
            <li>
              <strong>Content Filtering:</strong> Remove special characters, numbers, or duplicate lines
            </li>
            <li>
              <strong>Text Organization:</strong> Sort lines alphabetically and add line numbers
            </li>
            <li>
              <strong>Format Conversion:</strong> Convert tabs to spaces for consistent formatting
            </li>
            <li>
              <strong>Batch Processing:</strong> Apply multiple formatting rules at once
            </li>
          </ul>

          <h3>🎯 Perfect For</h3>
          <ul>
            <li>
              <strong>Writers:</strong> Clean up drafts and manuscripts
            </li>
            <li>
              <strong>Developers:</strong> Format code comments and documentation
            </li>
            <li>
              <strong>Students:</strong> Organize research notes and citations
            </li>
            <li>
              <strong>Data Entry:</strong> Clean up imported text data
            </li>
            <li>
              <strong>Content Creators:</strong> Prepare text for publishing
            </li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
