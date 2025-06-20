"use client"

import { useState, useCallback } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, Download, Trash2, Scissors, FileDown } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PDFProcessor } from "@/lib/pdf-processor"

interface SplitPage {
  pageNumber: number
  blob: Blob
  size: number
}

export default function PDFSplitterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [splitting, setSplitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [splitPages, setSplitPages] = useState<SplitPage[]>([])
  const [splitMode, setSplitMode] = useState("all-pages")
  const [pageRange, setPageRange] = useState({ start: "1", end: "1" })
  const [customPages, setCustomPages] = useState("")
  const [error, setError] = useState("")
  const [totalPages, setTotalPages] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === "application/pdf") {
      setFile(file)
      setError("")
      setSplitPages([])

      // Estimate page count based on file size (rough estimation)
      const estimatedPages = Math.max(1, Math.floor(file.size / 50000)) // ~50KB per page average
      setTotalPages(estimatedPages)
      setPageRange({ start: "1", end: estimatedPages.toString() })
    } else {
      setError("Please select a valid PDF file")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const splitPDF = async () => {
    if (!file) return

    setSplitting(true)
    setProgress(0)
    setError("")

    try {
      // Use the real PDF processor to split the PDF
      const splitBlobs = await PDFProcessor.splitPDF(file, (progress) => {
        setProgress(progress)
      })

      // Convert blobs to SplitPage format
      const splitResults: SplitPage[] = splitBlobs.map((blob, index) => ({
        pageNumber: index + 1,
        blob,
        size: blob.size,
      }))

      // Filter based on split mode
      let filteredResults = splitResults

      if (splitMode === "page-range") {
        const start = Number.parseInt(pageRange.start) || 1
        const end = Number.parseInt(pageRange.end) || splitResults.length
        filteredResults = splitResults.slice(start - 1, end)
      } else if (splitMode === "custom-pages") {
        // Parse custom pages like "1,3,5-7,10"
        const pages = customPages
          .split(",")
          .flatMap((part) => {
            const trimmed = part.trim()
            if (trimmed.includes("-")) {
              const [start, end] = trimmed.split("-").map((n) => Number.parseInt(n.trim()))
              return Array.from({ length: end - start + 1 }, (_, i) => start + i)
            }
            return [Number.parseInt(trimmed)]
          })
          .filter((p) => p >= 1 && p <= splitResults.length)
        
        const uniquePages = [...new Set(pages)].sort((a, b) => a - b)
        filteredResults = uniquePages.map(pageNum => splitResults[pageNum - 1]).filter(Boolean)
      }

      setSplitPages(filteredResults)
      setTotalPages(splitResults.length)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to split PDF. Please try again with a different file.")
      console.error(err)
    } finally {
      setSplitting(false)
    }
  }

  const downloadPage = (page: SplitPage) => {
    const filename = `${file?.name.replace(".pdf", "")}_page_${page.pageNumber}.pdf`
    PDFProcessor.downloadBlob(page.blob, filename)
  }

  const downloadAll = () => {
    splitPages.forEach((page, index) => {
      setTimeout(() => downloadPage(page), index * 500) // Stagger downloads
    })
  }

  const reset = () => {
    setFile(null)
    setSplitPages([])
    setProgress(0)
    setError("")
    setTotalPages(0)
  }

  const formatFileSize = (bytes: number) => {
    return PDFProcessor.formatFileSize(bytes)
  }

  return (
    <ToolLayout
      title="PDF Splitter - Split PDF Pages Online Free"
      description="Split PDF files into individual pages or extract specific page ranges online for free. No registration required, works on all devices."
      icon={<Scissors className="h-8 w-8 text-red-700" />}
      toolCategory="pdf-tools"
      howToSteps={[
        {
          name: "Upload PDF File",
          text: "Select or drag and drop your PDF file (up to 25MB)"
        },
        {
          name: "Choose Split Method",
          text: "Select to split all pages or extract specific page ranges"
        },
        {
          name: "Split PDF",
          text: "Click 'Split PDF' to separate your document into individual pages"
        },
        {
          name: "Download Pages",
          text: "Download individual pages or all pages as a ZIP file"
        }
      ]}
      faqs={[
        {
          question: "Can I split large PDF files?",
          answer: "Yes, you can split PDF files up to 25MB in size. This covers most documents, reports, and presentations."
        },
        {
          question: "Can I extract specific pages instead of splitting all?",
          answer: "Yes, you can choose to extract specific page ranges or split the entire document into individual pages."
        },
        {
          question: "What format will the split pages be in?",
          answer: "Each split page will be saved as a separate PDF file, maintaining the original quality and formatting."
        },
        {
          question: "Is my PDF secure during the splitting process?",
          answer: "Yes, all PDF processing happens locally in your browser. Your files are never uploaded to our servers."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "PDF Tools", path: "/pdf-tools" },
        { label: "PDF Splitter", path: "/pdf-splitter" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT2M"
    >
      <div className="space-y-6">
        {/* Upload Area */}
        {!file && (
          <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`text-center cursor-pointer transition-all duration-200 ${isDragActive ? "scale-105" : ""}`}
              >
                <input {...getInputProps()} />
                <Upload className="h-16 w-16 mx-auto text-primary/60 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  {isDragActive ? "Drop your PDF here" : "Choose PDF file to split"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Maximum file size: 100MB • Extract individual pages or page ranges
                </p>
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600">
                  <FileText className="h-5 w-5 mr-2" />
                  Select PDF File
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Info & Split Options */}
        {file && splitPages.length === 0 && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  📄 PDF Information
                  <Button variant="outline" size="icon" onClick={reset}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">File Name</p>
                    <p className="font-medium truncate">{file.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-medium">{formatFileSize(file.size)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Pages</p>
                    <p className="font-medium">{totalPages} pages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scissors className="h-5 w-5 mr-2" />
                  Split Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Split Mode</label>
                  <Select value={splitMode} onValueChange={setSplitMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-pages">Split into individual pages</SelectItem>
                      <SelectItem value="page-range">Extract page range</SelectItem>
                      <SelectItem value="custom-pages">Custom pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {splitMode === "page-range" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Start Page</label>
                      <Input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={pageRange.start}
                        onChange={(e) => setPageRange((prev) => ({ ...prev, start: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">End Page</label>
                      <Input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={pageRange.end}
                        onChange={(e) => setPageRange((prev) => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                {splitMode === "custom-pages" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Page Numbers</label>
                    <Input
                      placeholder="e.g., 1,3,5-7,10"
                      value={customPages}
                      onChange={(e) => setCustomPages(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter page numbers separated by commas. Use hyphens for ranges (e.g., 1,3,5-7,10)
                    </p>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">📋 Split Preview:</h4>
                  <p className="text-sm text-muted-foreground">
                    {splitMode === "all-pages" && `Will create ${totalPages} individual PDF files`}
                    {splitMode === "page-range" &&
                      `Will extract pages ${pageRange.start} to ${pageRange.end} (${Math.max(0, Number.parseInt(pageRange.end) - Number.parseInt(pageRange.start) + 1)} pages)`}
                    {splitMode === "custom-pages" && customPages && `Will extract specified pages: ${customPages}`}
                  </p>
                </div>

                <Button onClick={splitPDF} disabled={splitting} className="w-full" size="lg">
                  {splitting ? "🔄 Splitting PDF..." : "✂️ Split PDF Now"}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Progress */}
        {splitting && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Splitting your PDF...</span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  {progress < 30
                    ? "📖 Reading PDF structure..."
                    : progress < 60
                      ? "✂️ Extracting pages..."
                      : progress < 90
                        ? "📄 Creating individual files..."
                        : "✅ Almost done!"}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {splitPages.length > 0 && (
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center justify-between">
                ✅ PDF Split Successfully!
                <Button onClick={downloadAll} className="bg-green-600 hover:bg-green-700">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-green-600 mb-1">{splitPages.length}</div>
                  <div className="text-sm text-muted-foreground">Pages Extracted</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatFileSize(splitPages.reduce((sum, page) => sum + page.size, 0))}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Size</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-purple-600 mb-1">PDF</div>
                  <div className="text-sm text-muted-foreground">Format</div>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {splitPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">Page {page.pageNumber}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(page.size)}</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => downloadPage(page)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="outline" onClick={reset} className="w-full mt-4">
                🔄 Split Another PDF
              </Button>
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
