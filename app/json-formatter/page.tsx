"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"
import { FileText, Download, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function JsonFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)

  const formatJson = () => {
    if (!input.trim()) {
      setError("Please enter JSON data to format")
      setOutput("")
      setIsValid(false)
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
      setIsValid(true)
    } catch (err) {
      setError("Invalid JSON format. Please check your input.")
      setOutput("")
      setIsValid(false)
    }
  }

  const minifyJson = () => {
    if (!input.trim()) {
      setError("Please enter JSON data to minify")
      setOutput("")
      setIsValid(false)
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
      setIsValid(true)
    } catch (err) {
      setError("Invalid JSON format. Please check your input.")
      setOutput("")
      setIsValid(false)
    }
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError("")
    setIsValid(false)
  }

  const downloadJson = () => {
    if (!output) return

    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const howToUse = [
    "Paste or type your JSON data in the input field",
    'Click "Format" to beautify or "Minify" to compress',
    "Copy the result or download as a file",
    'Use "Clear" to start over with new data',
  ]

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate and beautify JSON data instantly"
      icon={<FileText className="h-8 w-8 text-blue-500" />}
      howToUse={howToUse}
    >
      <div className="space-y-4">
        {/* Input Section */}
        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-medium mb-2">JSON Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="min-h-[120px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={formatJson} className="flex-1 touch-target">
            Format
          </Button>
          <Button onClick={minifyJson} variant="outline" className="flex-1 touch-target">
            Minify
          </Button>
          <Button onClick={clearAll} variant="outline" size="icon" className="touch-target">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Output Section */}
        {output && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  Formatted JSON {isValid && <span className="text-green-500">✓ Valid</span>}
                </label>
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <Button onClick={downloadJson} variant="outline" size="sm" className="touch-target">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm bg-muted" />
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  )
}
