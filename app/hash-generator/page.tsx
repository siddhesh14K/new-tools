"use client"

import { useState, useCallback } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hash, Upload, Download, Copy, FileText, Key, Shield, Zap } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CopyButton } from "@/components/copy-button"
import { HashGenerator, FileUtils } from "@/lib/file-processing"

type HashAlgorithm = "MD5" | "SHA1" | "SHA256" | "SHA512"

interface HashResult {
  algorithm: HashAlgorithm
  hash: string
  input: string
  inputType: "text" | "file"
  fileName?: string
  fileSize?: number
  timestamp: Date
}

export default function HashGeneratorPage() {
  const [textInput, setTextInput] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA256")
  const [hashResults, setHashResults] = useState<HashResult[]>([])
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("text")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
      setError("")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const generateTextHash = async () => {
    if (!textInput.trim()) {
      setError("Please enter text to hash")
      return
    }

    setGenerating(true)
    setError("")

    try {
      let hash: string
      
      switch (algorithm) {
        case "MD5":
          hash = HashGenerator.generateMD5(textInput)
          break
        case "SHA1":
          hash = HashGenerator.generateSHA1(textInput)
          break
        case "SHA256":
          hash = HashGenerator.generateSHA256(textInput)
          break
        case "SHA512":
          hash = HashGenerator.generateSHA512(textInput)
          break
      }

      const result: HashResult = {
        algorithm,
        hash,
        input: textInput,
        inputType: "text",
        timestamp: new Date()
      }

      setHashResults(prev => [result, ...prev])
    } catch (err) {
      setError("Failed to generate hash")
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const generateFileHash = async () => {
    if (!selectedFile) {
      setError("Please select a file")
      return
    }

    setGenerating(true)
    setError("")

    try {
      const hash = await HashGenerator.generateFileHash(selectedFile, algorithm)

      const result: HashResult = {
        algorithm,
        hash,
        input: selectedFile.name,
        inputType: "file",
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        timestamp: new Date()
      }

      setHashResults(prev => [result, ...prev])
    } catch (err) {
      setError("Failed to generate file hash")
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const generateAllHashes = async () => {
    if (activeTab === "text" && !textInput.trim()) {
      setError("Please enter text to hash")
      return
    }
    
    if (activeTab === "file" && !selectedFile) {
      setError("Please select a file")
      return
    }

    setGenerating(true)
    setError("")

    try {
      const algorithms: HashAlgorithm[] = ["MD5", "SHA1", "SHA256", "SHA512"]
      const results: HashResult[] = []

      for (const algo of algorithms) {
        let hash: string

        if (activeTab === "text") {
          switch (algo) {
            case "MD5":
              hash = HashGenerator.generateMD5(textInput)
              break
            case "SHA1":
              hash = HashGenerator.generateSHA1(textInput)
              break
            case "SHA256":
              hash = HashGenerator.generateSHA256(textInput)
              break
            case "SHA512":
              hash = HashGenerator.generateSHA512(textInput)
              break
          }

          results.push({
            algorithm: algo,
            hash,
            input: textInput,
            inputType: "text",
            timestamp: new Date()
          })
        } else if (selectedFile) {
          hash = await HashGenerator.generateFileHash(selectedFile, algo)

          results.push({
            algorithm: algo,
            hash,
            input: selectedFile.name,
            inputType: "file",
            fileName: selectedFile.name,
            fileSize: selectedFile.size,
            timestamp: new Date()
          })
        }
      }

      setHashResults(prev => [...results, ...prev])
    } catch (err) {
      setError("Failed to generate hashes")
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const compareHashes = (hash1: string, hash2: string): boolean => {
    return hash1.toLowerCase() === hash2.toLowerCase()
  }

  const downloadResults = () => {
    if (hashResults.length === 0) return

    const content = [
      "HASH GENERATION RESULTS",
      "=".repeat(30),
      "",
      ...hashResults.map((result, index) => [
        `${index + 1}. ${result.algorithm} Hash`,
        `-`.repeat(20),
        `Input: ${result.input}`,
        `Type: ${result.inputType}`,
        ...(result.fileName ? [`File: ${result.fileName}`] : []),
        ...(result.fileSize ? [`Size: ${FileUtils.formatFileSize(result.fileSize)}`] : []),
        `Hash: ${result.hash}`,
        `Generated: ${result.timestamp.toLocaleString()}`,
        ""
      ]).flat(),
      `Total hashes generated: ${hashResults.length}`,
      `Report generated: ${new Date().toLocaleString()}`,
      "Powered by FreeTools.online"
    ].join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    FileUtils.downloadBlob(blob, `hash-results-${Date.now()}.txt`)
  }

  const clearResults = () => {
    setHashResults([])
  }

  const clearFile = () => {
    setSelectedFile(null)
  }

  const getAlgorithmInfo = (algo: HashAlgorithm) => {
    switch (algo) {
      case "MD5":
        return {
          description: "128-bit hash, fast but not cryptographically secure",
          length: "32 characters",
          useCase: "File integrity, checksums"
        }
      case "SHA1":
        return {
          description: "160-bit hash, deprecated for security",
          length: "40 characters", 
          useCase: "Legacy systems, Git commits"
        }
      case "SHA256":
        return {
          description: "256-bit hash, cryptographically secure",
          length: "64 characters",
          useCase: "Passwords, digital signatures, blockchain"
        }
      case "SHA512":
        return {
          description: "512-bit hash, highest security",
          length: "128 characters",
          useCase: "High-security applications, certificates"
        }
    }
  }

  return (
    <ToolLayout
      title="Hash Generator - MD5, SHA256, SHA512 Online Free"
      description="Generate MD5, SHA-1, SHA-256, SHA-512, CRC32 hashes and Base64 encoding for text and files. Secure cryptographic hash functions."
      icon={<Hash className="h-8 w-8 text-orange-500" />}
      toolCategory="developer-tools"
      howToSteps={[
        {
          name: "Enter Text or Upload File",
          text: "Type your text directly or upload a file to generate hashes"
        },
        {
          name: "Select Hash Algorithm",
          text: "Choose from MD5, SHA-1, SHA-256, SHA-512, or CRC32 algorithms"
        },
        {
          name: "Generate Hash",
          text: "Click 'Generate Hash' to create the cryptographic hash"
        },
        {
          name: "Copy Results",
          text: "Copy the generated hash values to your clipboard"
        }
      ]}
      faqs={[
        {
          question: "What is the difference between hash algorithms?",
          answer: "MD5 is fast but less secure, SHA-256 and SHA-512 are more secure and widely used, while CRC32 is mainly for error checking, not security."
        },
        {
          question: "Are these hashes secure for passwords?",
          answer: "For passwords, use SHA-256 or SHA-512 with salt. MD5 and SHA-1 are not recommended for password hashing due to security vulnerabilities."
        },
        {
          question: "Can I hash large files?",
          answer: "Yes, you can upload and hash files up to a reasonable size limit. The hashing is done locally in your browser."
        },
        {
          question: "What is Base64 encoding used for?",
          answer: "Base64 encoding converts binary data to text format, commonly used for data transmission, email attachments, and web development."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Developer Tools", path: "/developer-tools" },
        { label: "Hash Generator", path: "/hash-generator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-6">
        {/* Algorithm Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              Hash Algorithm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {(["MD5", "SHA1", "SHA256", "SHA512"] as HashAlgorithm[]).map((algo) => (
                <Button
                  key={algo}
                  variant={algorithm === algo ? "default" : "outline"}
                  onClick={() => setAlgorithm(algo)}
                  className="h-auto p-3 flex flex-col items-center gap-1"
                >
                  <span className="font-semibold">{algo}</span>
                  <span className="text-xs opacity-75">
                    {getAlgorithmInfo(algo).length}
                  </span>
                </Button>
              ))}
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">{algorithm} Information</h4>
              <div className="text-sm space-y-1">
                <p><strong>Description:</strong> {getAlgorithmInfo(algorithm).description}</p>
                <p><strong>Output length:</strong> {getAlgorithmInfo(algorithm).length}</p>
                <p><strong>Best for:</strong> {getAlgorithmInfo(algorithm).useCase}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Text Input
            </TabsTrigger>
            <TabsTrigger value="file" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              File Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Text to Hash</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text to generate hash..."
                  className="min-h-[120px] font-mono"
                />
                <div className="text-sm text-muted-foreground">
                  Characters: {textInput.length}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={generateTextHash} 
                    disabled={generating || !textInput.trim()}
                    className="flex-1"
                  >
                    {generating ? "Generating..." : `Generate ${algorithm} Hash`}
                  </Button>
                  <Button 
                    onClick={generateAllHashes} 
                    disabled={generating || !textInput.trim()}
                    variant="outline"
                  >
                    Generate All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="file" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>File to Hash</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!selectedFile ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      {isDragActive ? "Drop file here" : "Choose file or drag & drop"}
                    </h3>
                    <p className="text-muted-foreground">
                      Any file type • Max 100MB • Secure local processing
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {FileUtils.formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                      <Button onClick={clearFile} variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                )}

                {selectedFile && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={generateFileHash} 
                      disabled={generating}
                      className="flex-1"
                    >
                      {generating ? "Generating..." : `Generate ${algorithm} Hash`}
                    </Button>
                    <Button 
                      onClick={generateAllHashes} 
                      disabled={generating}
                      variant="outline"
                    >
                      Generate All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {hashResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Hash Results ({hashResults.length})
                </span>
                <div className="flex gap-2">
                  <Button onClick={downloadResults} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={clearResults} variant="outline" size="sm">
                    Clear All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hashResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{result.algorithm}</span>
                      <span className="text-sm text-muted-foreground">
                        {result.inputType === "file" ? "File" : "Text"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {result.timestamp.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Input:</span>
                      <p className="font-mono text-sm break-all">
                        {result.inputType === "file" ? result.fileName : result.input}
                      </p>
                      {result.fileSize && (
                        <p className="text-xs text-muted-foreground">
                          Size: {FileUtils.formatFileSize(result.fileSize)}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Hash:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                          {result.hash}
                        </code>
                        <CopyButton text={result.hash} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Hash Comparison Tool */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Hash Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Hash 1</label>
                <Input placeholder="Enter first hash..." className="font-mono" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Hash 2</label>
                <Input placeholder="Enter second hash..." className="font-mono" />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Compare Hashes
            </Button>
          </CardContent>
        </Card>

        {/* Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>🔐 Hash Algorithm Guide</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Security Levels:</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>MD5:</strong> ⚠️ Deprecated for security</li>
                  <li><strong>SHA-1:</strong> ⚠️ Weak, avoid for new projects</li>
                  <li><strong>SHA-256:</strong> ✅ Secure, widely recommended</li>
                  <li><strong>SHA-512:</strong> ✅ Highest security level</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Common Use Cases:</h4>
                <ul className="text-sm space-y-1">
                  <li>• File integrity verification</li>
                  <li>• Password storage (with salt)</li>
                  <li>• Digital signatures</li>
                  <li>• Blockchain and cryptocurrency</li>
                  <li>• Data deduplication</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}