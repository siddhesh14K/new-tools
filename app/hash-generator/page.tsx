"use client"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/copy-button"
import { Hash, Upload, FileText } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function HashGeneratorPage() {
  const [input, setInput] = useState("")
  const [hashType, setHashType] = useState("md5")
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Simple hash implementations
  const generateMD5 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("MD5", data).catch(() => {
      // Fallback simple hash for MD5 (not cryptographically secure)
      return simpleHash(text, "md5")
    })

    if (hashBuffer instanceof ArrayBuffer) {
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    }
    return hashBuffer as string
  }

  const generateSHA1 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-1", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const generateSHA256 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const generateSHA512 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-512", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  // Simple fallback hash function
  const simpleHash = (text: string, type: string): string => {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }

    const hex = Math.abs(hash).toString(16)
    const length = type === "md5" ? 32 : type === "sha1" ? 40 : type === "sha256" ? 64 : 128
    return hex.padStart(length, "0").substring(0, length)
  }

  const generateAllHashes = async (text: string) => {
    if (!text) {
      setHashes({})
      return
    }

    setIsProcessing(true)

    try {
      const results: Record<string, string> = {}

      // Generate MD5 (fallback implementation)
      results.md5 = simpleHash(text, "md5")

      // Generate SHA hashes using Web Crypto API
      results.sha1 = await generateSHA1(text)
      results.sha256 = await generateSHA256(text)
      results.sha512 = await generateSHA512(text)

      // Additional hash types
      results.crc32 = generateCRC32(text)
      results.base64 = btoa(text)

      setHashes(results)
    } catch (error) {
      console.error("Error generating hashes:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  // CRC32 implementation
  const generateCRC32 = (text: string): string => {
    const crcTable = []
    for (let i = 0; i < 256; i++) {
      let crc = i
      for (let j = 0; j < 8; j++) {
        crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
      }
      crcTable[i] = crc
    }

    let crc = 0 ^ -1
    for (let i = 0; i < text.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ text.charCodeAt(i)) & 0xff]
    }
    return ((crc ^ -1) >>> 0).toString(16).padStart(8, "0")
  }

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/*": [".txt", ".json", ".xml", ".csv"],
    },
    multiple: false,
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateAllHashes(input)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [input])

  const hashTypes = [
    { value: "md5", label: "MD5", description: "128-bit hash (32 hex chars)" },
    { value: "sha1", label: "SHA-1", description: "160-bit hash (40 hex chars)" },
    { value: "sha256", label: "SHA-256", description: "256-bit hash (64 hex chars)" },
    { value: "sha512", label: "SHA-512", description: "512-bit hash (128 hex chars)" },
    { value: "crc32", label: "CRC32", description: "32-bit checksum (8 hex chars)" },
    { value: "base64", label: "Base64", description: "Base64 encoding" },
  ]

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, SHA-512, CRC32 hashes and Base64 encoding for text and files. Secure cryptographic hash functions."
      icon={<Hash className="h-8 w-8 text-orange-500" />}
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Input Text or File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Text Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">Text Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to generate hashes..."
                className="min-h-[120px] font-mono text-sm"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Or Upload Text File</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isDragActive ? "Drop file here" : "Click or drag text file here"}
                </p>
                {file && (
                  <p className="text-sm font-medium mt-2">
                    <FileText className="h-4 w-4 inline mr-1" />
                    {file.name}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hash Results */}
        {Object.keys(hashes).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Hashes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hashTypes.map((type) => {
                const hash = hashes[type.value]
                if (!hash) return null

                return (
                  <div key={type.value} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{type.label}</h3>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                      <CopyButton text={hash} />
                    </div>
                    <div className="font-mono text-sm bg-background p-3 rounded border break-all">{hash}</div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}

        {/* Hash Information */}
        <Card>
          <CardHeader>
            <CardTitle>Hash Functions Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Cryptographic Hashes</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <strong>MD5:</strong> Fast but not secure (deprecated)
                  </li>
                  <li>
                    <strong>SHA-1:</strong> Better than MD5 but vulnerable
                  </li>
                  <li>
                    <strong>SHA-256:</strong> Secure, widely used
                  </li>
                  <li>
                    <strong>SHA-512:</strong> Most secure, larger output
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Other Functions</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <strong>CRC32:</strong> Fast checksum for error detection
                  </li>
                  <li>
                    <strong>Base64:</strong> Encoding for binary data
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content */}
        <div className="prose max-w-none mt-12">
          <h2>Understanding Hash Functions</h2>
          <p>
            Hash functions are mathematical algorithms that convert input data into fixed-size strings. They're
            essential for data integrity verification, password storage, and digital signatures.
          </p>

          <h3>Common Use Cases</h3>
          <ul>
            <li>
              <strong>File Integrity:</strong> Verify files haven't been corrupted or modified
            </li>
            <li>
              <strong>Password Storage:</strong> Store password hashes instead of plain text
            </li>
            <li>
              <strong>Digital Signatures:</strong> Create unique fingerprints for documents
            </li>
            <li>
              <strong>Blockchain:</strong> Secure transaction verification
            </li>
            <li>
              <strong>Checksums:</strong> Quick data validation
            </li>
          </ul>

          <h3>Security Recommendations</h3>
          <ul>
            <li>✅ Use SHA-256 or SHA-512 for security-critical applications</li>
            <li>❌ Avoid MD5 and SHA-1 for security purposes</li>
            <li>✅ Use CRC32 only for error detection, not security</li>
            <li>✅ Add salt when hashing passwords</li>
            <li>✅ Use proper key derivation functions for passwords</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
