"use client"

import { useState, useCallback } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, Download, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PDFProcessor } from "@/lib/pdf-processor"

interface PDFFile {
  file: File
  id: string
  name: string
  size: number
}

export default function PDFMergerPage() {
  const [files, setFiles] = useState<PDFFile[]>([])
  const [merging, setMerging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mergedFile, setMergedFile] = useState<Blob | null>(null)
  const [error, setError] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter((file) => file.type === "application/pdf")

    if (pdfFiles.length === 0) {
      setError("Please select valid PDF files")
      return
    }

    const newFiles: PDFFile[] = pdfFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
    }))

    setFiles((prev) => [...prev, ...newFiles])
    setError("")
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const moveFile = (id: string, direction: "up" | "down") => {
    const index = files.findIndex((file) => file.id === id)
    if (index === -1) return

    const newFiles = [...files]
    if (direction === "up" && index > 0) {
      ;[newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]]
    } else if (direction === "down" && index < files.length - 1) {
      ;[newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
    }
    setFiles(newFiles)
  }

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge")
      return
    }

    setMerging(true)
    setProgress(0)
    setError("")

    try {
      // Use the real PDF processor
      const fileObjects = files.map(f => f.file)
      const mergedBlob = await PDFProcessor.mergePDFs(fileObjects, (progress) => {
        setProgress(progress)
      })

      setMergedFile(mergedBlob)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to merge PDFs. Please try again.")
      console.error(err)
    } finally {
      setMerging(false)
    }
  }

  const downloadMerged = () => {
    if (!mergedFile) return
    PDFProcessor.downloadBlob(mergedFile, `merged_document_${Date.now()}.pdf`)
  }

  const reset = () => {
    setFiles([])
    setMergedFile(null)
    setProgress(0)
    setError("")
  }

  const formatFileSize = (bytes: number) => {
    return PDFProcessor.formatFileSize(bytes)
  }

  return (
    <ToolLayout
      title="PDF Merger - Combine Multiple PDFs Online Free"
      description="Merge multiple PDF files into one document online for free. Combine PDFs in any order, no registration required. Fast and secure PDF merging tool."
      icon={<FileText className="h-8 w-8 text-red-600" />}
      toolCategory="pdf-tools"
      howToSteps={[
        {
          name: "Upload PDF Files",
          text: "Select multiple PDF files or drag and drop them into the upload area"
        },
        {
          name: "Arrange Order",
          text: "Drag and drop to reorder your PDF files in the desired sequence"
        },
        {
          name: "Merge PDFs",
          text: "Click 'Merge PDFs' to combine all files into one document"
        },
        {
          name: "Download Result",
          text: "Download your merged PDF file to your device"
        }
      ]}
      faqs={[
        {
          question: "How many PDF files can I merge at once?",
          answer: "You can merge multiple PDF files at once. The exact limit depends on file sizes, but typically you can merge 10-20 files without issues."
        },
        {
          question: "Can I change the order of PDFs before merging?",
          answer: "Yes, you can drag and drop the uploaded PDF files to rearrange them in any order before merging."
        },
        {
          question: "What's the maximum file size for each PDF?",
          answer: "Each PDF file can be up to 25MB in size. This covers most documents, reports, and presentations."
        },
        {
          question: "Is my data secure during the merge process?",
          answer: "Yes, all PDF processing happens locally in your browser. Your files are never uploaded to our servers."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "PDF Tools", path: "/pdf-tools" },
        { label: "PDF Merger", path: "/pdf-merger" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT2M"
    >
      <div className="space-y-6">
        {/* Upload Area */}
        <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className={`text-center cursor-pointer transition-all duration-200 ${isDragActive ? "scale-105" : ""}`}
            >
              <input {...getInputProps()} />
              <Upload className="h-16 w-16 mx-auto text-primary/60 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                {isDragActive ? "Drop PDF files here" : "Select PDF files to merge"}
              </h3>
              <p className="text-muted-foreground mb-6">
                Choose multiple PDF files • Drag to reorder • Maximum 50MB per file
              </p>
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600">
                <Plus className="h-5 w-5 mr-2" />
                Add PDF Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                📄 PDF Files to Merge ({files.length})
                <Button variant="outline" size="sm" onClick={reset}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">{index + 1}</div>
                      <FileText className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium truncate max-w-xs">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveFile(file.id, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveFile(file.id, "down")}
                        disabled={index === files.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => removeFile(file.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">📋 Merge Preview:</h4>
                <p className="text-sm text-muted-foreground">
                  Your PDFs will be merged in the order shown above. Total size:{" "}
                  <span className="font-medium">{formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}</span>
                </p>
              </div>

              <Button onClick={mergePDFs} disabled={merging || files.length < 2} className="w-full mt-4" size="lg">
                {merging ? "🔄 Merging PDFs..." : "🚀 Merge PDFs Now"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        {merging && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Merging your PDFs...</span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  {progress < 30
                    ? "📖 Reading PDF files..."
                    : progress < 60
                      ? "🔍 Analyzing structure..."
                      : progress < 90
                        ? "📄 Merging pages..."
                        : "✅ Almost done!"}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {mergedFile && (
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center">✅ PDFs Merged Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-green-600 mb-1">{files.length}</div>
                  <div className="text-sm text-muted-foreground">Files Merged</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{formatFileSize(mergedFile.size)}</div>
                  <div className="text-sm text-muted-foreground">Final Size</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-purple-600 mb-1">PDF</div>
                  <div className="text-sm text-muted-foreground">Format</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={downloadMerged} className="flex-1 bg-gradient-to-r from-green-600 to-green-700">
                  <Download className="h-5 w-5 mr-2" />
                  Download Merged PDF
                </Button>
                <Button variant="outline" onClick={reset} className="flex-1">
                  🔄 Merge More PDFs
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </ToolLayout>
  )
}
