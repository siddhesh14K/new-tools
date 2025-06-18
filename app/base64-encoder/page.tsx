"use client"

import type React from "react"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"
import { Code, Upload, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Base64EncoderPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [error, setError] = useState("")

  const encodeBase64 = () => {
    if (!input.trim()) {
      setError("Please enter text to encode")
      setOutput("")
      return
    }

    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
      setError("")
    } catch (err) {
      setError("Failed to encode text. Please check your input.")
      setOutput("")
    }
  }

  const decodeBase64 = () => {
    if (!input.trim()) {
      setError("Please enter Base64 data to decode")
      setOutput("")
      return
    }

    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
      setError("")
    } catch (err) {
      setError("Invalid Base64 format. Please check your input.")
      setOutput("")
    }
  }

  const handleProcess = () => {
    if (mode === "encode") {
      encodeBase64()
    } else {
      decodeBase64()
    }
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  const downloadResult = () => {
    if (!output) return

    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = mode === "encode" ? "encoded.txt" : "decoded.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setInput(content)
    }
    reader.readAsText(file)
  }

  const howToUse = [
    "Enter your text or upload a file",
    "Choose to encode (text to Base64) or decode (Base64 to text)",
    "Click the process button to convert",
    "Copy the result or download as a file",
  ]

  return (
    <ToolLayout
      title="Base64 Encoder"
      description="Encode and decode Base64 strings securely"
      icon={<Code className="h-8 w-8 text-red-500" />}
      howToUse={howToUse}
    >
      <div className="space-y-4">
        {/* Mode Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex rounded-lg bg-muted p-1">
              <Button
                onClick={() => setMode("encode")}
                variant={mode === "encode" ? "default" : "ghost"}
                className="flex-1 touch-target"
              >
                Encode
              </Button>
              <Button
                onClick={() => setMode("decode")}
                variant={mode === "decode" ? "default" : "ghost"}
                className="flex-1 touch-target"
              >
                Decode
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">{mode === "encode" ? "Text Input" : "Base64 Input"}</label>
              <div className="flex gap-2">
                <label htmlFor="file-upload">
                  <Button variant="outline" size="sm" className="touch-target cursor-pointer" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </span>
                  </Button>
                </label>
                <input id="file-upload" type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
              </div>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 data to decode..."}
              className="min-h-[120px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleProcess} className="flex-1 touch-target">
            {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
          </Button>
          <Button onClick={clearAll} variant="outline" className="touch-target">
            Clear
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
          <Card className="animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">{mode === "encode" ? "Base64 Output" : "Decoded Text"}</label>
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <Button onClick={downloadResult} variant="outline" size="sm" className="touch-target">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm bg-muted" />
              <div className="mt-2 text-xs text-muted-foreground">Output length: {output.length} characters</div>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">About Base64</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format.</p>
              <p>Common uses:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Email attachments</li>
                <li>Data URLs in web development</li>
                <li>API data transmission</li>
                <li>Configuration files</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}
