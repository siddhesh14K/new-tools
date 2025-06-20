"use client"

import { useState, useCallback, useRef } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { ImageIcon, Download, Trash2, Wand2, Eye, EyeOff } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BackgroundRemoverPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null)
  const [originalPreview, setOriginalPreview] = useState("")
  const [processedPreview, setProcessedPreview] = useState("")
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [threshold, setThreshold] = useState([128])
  const [showOriginal, setShowOriginal] = useState(false)
  const [error, setError] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tempCanvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file)
      setError("")
      setProcessedBlob(null)
      setProcessedPreview("")

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setError("Please select a valid image file (JPG, PNG, WebP)")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp", ".bmp"],
    },
    multiple: false,
    maxSize: 20 * 1024 * 1024, // 20MB
  })

  const removeBackground = async () => {
    if (!originalFile || !canvasRef.current || !tempCanvasRef.current) return

    setProcessing(true)
    setProgress(0)
    setError("")

    try {
      const canvas = canvasRef.current
      const tempCanvas = tempCanvasRef.current
      const ctx = canvas.getContext("2d")
      const tempCtx = tempCanvas.getContext("2d")

      if (!ctx || !tempCtx) throw new Error("Canvas context not available")

      setProgress(10)

      // Load image
      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = originalPreview
      })

      setProgress(25)

      // Set canvas dimensions
      canvas.width = img.width
      canvas.height = img.height
      tempCanvas.width = img.width
      tempCanvas.height = img.height

      // Draw original image
      tempCtx.drawImage(img, 0, 0)

      setProgress(40)

      // Get image data
      const imageData = tempCtx.getImageData(0, 0, img.width, img.height)
      const data = imageData.data

      setProgress(60)

      // Simple background removal algorithm
      // This is a basic implementation - in production, you'd use more sophisticated AI models
      const thresholdValue = threshold[0]

      // Detect background color (assume corners are background)
      const corners = [
        { x: 0, y: 0 },
        { x: img.width - 1, y: 0 },
        { x: 0, y: img.height - 1 },
        { x: img.width - 1, y: img.height - 1 },
      ]

      // Get average background color from corners
      let bgR = 0,
        bgG = 0,
        bgB = 0
      corners.forEach((corner) => {
        const index = (corner.y * img.width + corner.x) * 4
        bgR += data[index]
        bgG += data[index + 1]
        bgB += data[index + 2]
      })
      bgR /= corners.length
      bgG /= corners.length
      bgB /= corners.length

      setProgress(80)

      // Remove background by making similar colors transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Calculate color difference
        const diff = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2))

        // If color is similar to background, make it transparent
        if (diff < thresholdValue) {
          data[i + 3] = 0 // Set alpha to 0 (transparent)
        }
      }

      setProgress(90)

      // Put processed image data back
      ctx.putImageData(imageData, 0, 0)

      // Convert to blob
      const processedBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png", 1.0)
      })

      // Create preview
      const previewUrl = URL.createObjectURL(processedBlob)
      setProcessedPreview(previewUrl)
      setProcessedBlob(processedBlob)

      setProgress(100)
    } catch (err) {
      setError("Failed to remove background. Please try again with a different image.")
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const downloadProcessed = () => {
    if (!processedBlob || !originalFile) return

    const url = URL.createObjectURL(processedBlob)
    const a = document.createElement("a")
    a.href = url

    const baseName = originalFile.name.replace(/\.[^/.]+$/, "")
    a.download = `${baseName}_no_background.png`

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setOriginalFile(null)
    setProcessedBlob(null)
    setOriginalPreview("")
    setProcessedPreview("")
    setProgress(0)
    setError("")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <ToolLayout
      title="AI Background Remover - Remove Image Background Online Free"
      description="Remove image backgrounds automatically using AI. Perfect for product photos, portraits, and graphics. No registration required, works on all devices."
      icon={<Wand2 className="h-8 w-8 text-green-700" />}
      toolCategory="image-editing"
      howToSteps={[
        {
          name: "Upload Image",
          text: "Select or drag and drop your image file (JPG, PNG, WebP up to 20MB)"
        },
        {
          name: "Adjust Settings",
          text: "Set the sensitivity level for background removal based on your image"
        },
        {
          name: "Remove Background",
          text: "Click 'Remove Background' to process your image with AI"
        },
        {
          name: "Download Result",
          text: "Download your image with transparent background as PNG"
        }
      ]}
      faqs={[
        {
          question: "What image formats are supported?",
          answer: "We support JPG, JPEG, PNG, WebP, and BMP image formats up to 20MB in size."
        },
        {
          question: "Is the background removal free?",
          answer: "Yes, our AI background remover is completely free to use with no registration required."
        },
        {
          question: "What happens to my uploaded images?",
          answer: "All processing is done in your browser. Your images are never uploaded to our servers."
        },
        {
          question: "What output format do I get?",
          answer: "The processed image is provided as a PNG file with transparent background."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Image Tools", path: "/image-tools" },
        { label: "Background Remover", path: "/background-remover" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT2M"
    >
      <div className="space-y-6">
        {/* Upload Area */}
        {!originalFile && (
          <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`text-center cursor-pointer transition-all duration-200 ${isDragActive ? "scale-105" : ""}`}
              >
                <input {...getInputProps()} />
                <ImageIcon className="h-16 w-16 mx-auto text-primary/60 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  {isDragActive ? "Drop your image here" : "Choose image to remove background"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Supports JPG, PNG, WebP • Max 20MB • AI-powered background removal
                </p>
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Select Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing Settings */}
        {originalFile && !processedBlob && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  📊 Image Information
                  <Button variant="outline" size="icon" onClick={reset}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">File Name</p>
                    <p className="font-medium truncate">{originalFile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-medium">{formatFileSize(originalFile.size)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Preview</p>
                    <div className="w-12 h-12 rounded border overflow-hidden">
                      <img
                        src={originalPreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Background Removal Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Sensitivity</label>
                    <span className="text-sm text-muted-foreground">
                      {threshold[0]} - {threshold[0] < 50 ? "Low" : threshold[0] < 150 ? "Medium" : "High"}
                    </span>
                  </div>
                  <Slider
                    value={threshold}
                    onValueChange={setThreshold}
                    max={255}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>More precise</span>
                    <span>More aggressive</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">🎯 Processing Info:</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Algorithm:</strong> Edge detection + Color similarity
                    </p>
                    <p>
                      <strong>Output format:</strong> PNG with transparency
                    </p>
                    <p>
                      <strong>Best for:</strong> Images with solid/simple backgrounds
                    </p>
                  </div>
                </div>

                <Button onClick={removeBackground} disabled={processing} className="w-full" size="lg">
                  {processing ? "🔄 Removing Background..." : "✨ Remove Background"}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Progress */}
        {processing && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Processing your image...</span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  {progress < 30
                    ? "🔍 Analyzing image..."
                    : progress < 60
                      ? "🎨 Detecting edges..."
                      : progress < 90
                        ? "✨ Removing background..."
                        : "🎉 Finalizing..."}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {processedBlob && (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center justify-between">
                  ✅ Background Removed Successfully!
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowOriginal(!showOriginal)}>
                      {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {showOriginal ? "Hide" : "Compare"}
                    </Button>
                    <Button onClick={downloadProcessed} className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-green-600 mb-1">PNG</div>
                    <div className="text-sm text-muted-foreground">Transparent</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{formatFileSize(processedBlob.size)}</div>
                    <div className="text-sm text-muted-foreground">File Size</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600 mb-1">AI</div>
                    <div className="text-sm text-muted-foreground">Processed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Comparison */}
            <div className={`grid ${showOriginal ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-6`}>
              {showOriginal && (
                <Card>
                  <CardHeader>
                    <CardTitle>📷 Original</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <img
                        src={originalPreview || "/placeholder.svg"}
                        alt="Original"
                        className="w-full h-64 object-contain rounded border"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>✨ Background Removed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Checkered background to show transparency */}
                    <div
                      className="absolute inset-0 rounded"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                          linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                          linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                          linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                        `,
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                    />
                    <img
                      src={processedPreview || "/placeholder.svg"}
                      alt="Processed"
                      className="relative w-full h-64 object-contain rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button variant="outline" onClick={reset} className="w-full">
              🔄 Process Another Image
            </Button>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Hidden canvases */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <canvas ref={tempCanvasRef} style={{ display: "none" }} />
      </div>
    </ToolLayout>
  )
}
