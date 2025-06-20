"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trash2, Download, Upload, FileIcon, CheckCircle, XCircle, Clock } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUtils } from "@/lib/file-processing-simple"

interface ProcessedFile {
  id: string
  originalFile: File
  processedBlob?: Blob
  status: "pending" | "processing" | "completed" | "error"
  error?: string
  progress: number
}

interface BatchProcessorProps {
  title: string
  description: string
  acceptedFileTypes: { [key: string]: string[] }
  maxFileSize: number
  maxFiles: number
  processFile: (file: File, onProgress?: (progress: number) => void) => Promise<Blob>
  getOutputFileName: (originalName: string) => string
  children?: React.ReactNode
}

export function BatchProcessor({
  title,
  description,
  acceptedFileTypes,
  maxFileSize,
  maxFiles,
  processFile,
  getOutputFileName,
  children
}: BatchProcessorProps) {
  const [files, setFiles] = useState<ProcessedFile[]>([])
  const [processing, setProcessing] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [error, setError] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError("")
    
    // Validate file count
    if (files.length + acceptedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Validate file sizes
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxFileSize)
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the ${FileUtils.formatFileSize(maxFileSize)} limit`)
      return
    }

    // Add new files
    const newFiles: ProcessedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      originalFile: file,
      status: "pending",
      progress: 0
    }))

    setFiles(prev => [...prev, ...newFiles])
  }, [files.length, maxFiles, maxFileSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: true,
    maxSize: maxFileSize,
  })

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const clearAll = () => {
    setFiles([])
    setOverallProgress(0)
    setError("")
  }

  const processAllFiles = async () => {
    if (files.length === 0) return

    setProcessing(true)
    setError("")
    setOverallProgress(0)

    const pendingFiles = files.filter(f => f.status === "pending" || f.status === "error")
    let completedCount = 0

    for (let i = 0; i < pendingFiles.length; i++) {
      const fileData = pendingFiles[i]
      
      // Update status to processing
      setFiles(prev => prev.map(f => 
        f.id === fileData.id 
          ? { ...f, status: "processing", progress: 0, error: undefined }
          : f
      ))

      try {
        // Process the file with progress tracking
        const processedBlob = await processFile(
          fileData.originalFile,
          (progress) => {
            setFiles(prev => prev.map(f => 
              f.id === fileData.id 
                ? { ...f, progress }
                : f
            ))
          }
        )

        // Update to completed
        setFiles(prev => prev.map(f => 
          f.id === fileData.id 
            ? { ...f, status: "completed", processedBlob, progress: 100 }
            : f
        ))

        completedCount++
      } catch (err) {
        // Update to error
        setFiles(prev => prev.map(f => 
          f.id === fileData.id 
            ? { ...f, status: "error", error: err instanceof Error ? err.message : "Processing failed", progress: 0 }
            : f
        ))
      }

      // Update overall progress
      setOverallProgress(Math.round(((completedCount + 1) / pendingFiles.length) * 100))
    }

    setProcessing(false)
  }

  const downloadFile = (fileData: ProcessedFile) => {
    if (!fileData.processedBlob) return
    
    const fileName = getOutputFileName(fileData.originalFile.name)
    FileUtils.downloadBlob(fileData.processedBlob, fileName)
  }

  const downloadAll = async () => {
    const completedFiles = files.filter(f => f.status === "completed" && f.processedBlob)
    
    if (completedFiles.length === 0) return

    if (completedFiles.length === 1) {
      downloadFile(completedFiles[0])
      return
    }

    // For multiple files, download them one by one
    // TODO: Implement ZIP creation when JSZip is working
    completedFiles.forEach((fileData, index) => {
      setTimeout(() => {
        downloadFile(fileData)
      }, index * 500) // Stagger downloads
    })
  }

  const getStatusIcon = (status: ProcessedFile["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "processing":
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: ProcessedFile["status"]) => {
    switch (status) {
      case "pending":
        return "border-muted"
      case "processing":
        return "border-blue-200 bg-blue-50"
      case "completed":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
    }
  }

  const completedFiles = files.filter(f => f.status === "completed")
  const hasErrors = files.some(f => f.status === "error")
  const canProcess = files.some(f => f.status === "pending" || f.status === "error") && !processing

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {files.length === 0 && (
        <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className={`text-center cursor-pointer transition-all duration-200 ${
                isDragActive ? "scale-105" : ""
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-16 w-16 mx-auto text-primary/60 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                {isDragActive ? "Drop files here" : title}
              </h3>
              <p className="text-muted-foreground mb-6">{description}</p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
                📁 Select Files
              </Button>
              
              <div className="mt-6 text-sm text-muted-foreground space-y-1">
                <p>• Maximum {maxFiles} files</p>
                <p>• Up to {FileUtils.formatFileSize(maxFileSize)} per file</p>
                <p>• Supported formats: {Object.values(acceptedFileTypes).flat().join(", ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings/Options */}
      {children && files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Options</CardTitle>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Files ({files.length})</span>
              <div className="flex gap-2">
                {files.length < maxFiles && (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Add More
                    </Button>
                  </div>
                )}
                <Button onClick={clearAll} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {files.map((fileData) => (
              <div
                key={fileData.id}
                className={`border rounded-lg p-4 transition-colors ${getStatusColor(fileData.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium truncate max-w-[200px]">
                        {fileData.originalFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {FileUtils.formatFileSize(fileData.originalFile.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(fileData.status)}
                    <span className="text-sm capitalize">{fileData.status}</span>
                    
                    {fileData.status === "completed" && (
                      <Button
                        onClick={() => downloadFile(fileData)}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {(fileData.status === "pending" || fileData.status === "error") && (
                      <Button
                        onClick={() => removeFile(fileData.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {fileData.status === "processing" && (
                  <Progress value={fileData.progress} className="h-2" />
                )}

                {fileData.status === "error" && fileData.error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription className="text-sm">{fileData.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Processing Controls */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {processing && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Processing files...</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={processAllFiles}
                  disabled={!canProcess}
                  className="flex-1"
                  size="lg"
                >
                  {processing ? "Processing..." : "Process All Files"}
                </Button>

                {completedFiles.length > 0 && (
                  <Button
                    onClick={downloadAll}
                    variant="outline"
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download {completedFiles.length > 1 ? "ZIP" : "File"}
                  </Button>
                )}
              </div>

              {/* Summary */}
              {files.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-lg">{files.length}</div>
                    <div className="text-muted-foreground">Total</div>
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-green-600">{completedFiles.length}</div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-blue-600">
                      {files.filter(f => f.status === "processing").length}
                    </div>
                    <div className="text-muted-foreground">Processing</div>
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-red-600">
                      {files.filter(f => f.status === "error").length}
                    </div>
                    <div className="text-muted-foreground">Errors</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}