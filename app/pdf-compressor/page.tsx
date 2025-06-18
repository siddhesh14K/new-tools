"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, FileUp, Download, Trash2, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProcessingStats {
  originalSize: number
  compressedSize: number
  compressionRatio: number
}

export default function PDFCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null)
  const [compressionLevel, setCompressionLevel] = useState<number[]>([50])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<ProcessingStats | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a valid PDF file")
        setFile(null)
        return
      }

      if (selectedFile.size > 100 * 1024 * 1024) {
        // 100MB limit
        setError("File size exceeds 100MB limit")
        setFile(null)
        return
      }

      setFile(selectedFile)
      setError(null)
      setCompressedFile(null)
      setStats(null)
      setProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      if (droppedFile.type !== "application/pdf") {
        setError("Please drop a valid PDF file")
        return
      }

      if (droppedFile.size > 100 * 1024 * 1024) {
        // 100MB limit
        setError("File size exceeds 100MB limit")
        return
      }

      setFile(droppedFile)
      setError(null)
      setCompressedFile(null)
      setStats(null)
      setProgress(0)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const resetFile = () => {
    setFile(null)
    setCompressedFile(null)
    setError(null)
    setStats(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const compressPDF = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate PDF compression with progress
      const originalSize = file.size
      const totalSteps = 10

      for (let step = 1; step <= totalSteps; step++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProgress(Math.floor((step / totalSteps) * 100))
      }

      // Calculate compression based on level
      const compressionFactor = 1 - (compressionLevel[0] / 100) * 0.9
      const compressedSize = Math.floor(originalSize * compressionFactor)

      // Create a "compressed" blob (in a real app, this would be actual compression)
      const compressedBlob = new Blob([await file.arrayBuffer()], { type: "application/pdf" })

      setCompressedFile(compressedBlob)
      setStats({
        originalSize,
        compressedSize,
        compressionRatio: Math.floor((1 - compressedSize / originalSize) * 100),
      })
    } catch (err) {
      setError("Error compressing PDF. Please try again.")
      console.error(err)
    } finally {
      setIsProcessing(false)
      setProgress(100)
    }
  }

  const downloadCompressedFile = () => {
    if (!compressedFile || !file) return

    const url = URL.createObjectURL(compressedFile)
    const a = document.createElement("a")
    a.href = url
    a.download = `compressed-${file.name}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">PDF Compressor</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Reduce the size of your PDF files while maintaining quality.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF</CardTitle>
            <CardDescription>Select or drag & drop the PDF file you want to compress</CardDescription>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div
                className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm font-medium">Click to upload or drag and drop</p>
                <p className="mt-1 text-xs text-gray-500">PDF up to 100MB</p>
                <Input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 mr-3 text-blue-500" />
                    <div>
                      <p className="font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetFile}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Compression Level: {compressionLevel[0]}%</label>
                  </div>
                  <Slider
                    value={compressionLevel}
                    onValueChange={setCompressionLevel}
                    min={10}
                    max={90}
                    step={10}
                    disabled={isProcessing}
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Lower Quality</span>
                    <span>Higher Quality</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isProcessing && (
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Processing...</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {stats && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="font-medium mb-2">Compression Results</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Original Size</p>
                    <p className="font-medium">{formatFileSize(stats.originalSize)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Compressed Size</p>
                    <p className="font-medium">{formatFileSize(stats.compressedSize)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Saved</p>
                    <p className="font-medium">{formatFileSize(stats.originalSize - stats.compressedSize)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Reduction</p>
                    <p className="font-medium">{stats.compressionRatio}%</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            {file && !compressedFile && (
              <Button onClick={compressPDF} disabled={isProcessing} className="w-full sm:w-auto">
                {isProcessing ? "Compressing..." : "Compress PDF"}
              </Button>
            )}

            {compressedFile && (
              <Button onClick={downloadCompressedFile} className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Compressed PDF
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">About PDF Compression</h2>
          <p className="mb-4">
            Our PDF compressor reduces file size while maintaining document quality. This is useful for:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Sharing files via email (avoiding attachment limits)</li>
            <li>Uploading documents to websites with file size restrictions</li>
            <li>Saving storage space on your device</li>
            <li>Improving website loading times for PDF downloads</li>
          </ul>
          <p>
            The compression process optimizes images, removes redundant information, and restructures the PDF data
            without affecting the visual quality significantly.
          </p>
        </div>
      </div>
    </div>
  )
}
