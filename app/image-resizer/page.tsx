"use client"

import { useState, useCallback, useRef } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageIcon, Download, Trash2, Link } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function ImageResizerPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null)
  const [originalPreview, setOriginalPreview] = useState("")
  const [resizedPreview, setResizedPreview] = useState("")
  const [dimensions, setDimensions] = useState({ width: "", height: "" })
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [resizeMode, setResizeMode] = useState("custom")
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const presetSizes = {
    "social-facebook": { width: 1200, height: 630, name: "Facebook Post" },
    "social-instagram": { width: 1080, height: 1080, name: "Instagram Square" },
    "social-twitter": { width: 1024, height: 512, name: "Twitter Header" },
    "web-thumbnail": { width: 300, height: 200, name: "Web Thumbnail" },
    "web-banner": { width: 728, height: 90, name: "Web Banner" },
    "print-a4": { width: 2480, height: 3508, name: "A4 Print (300 DPI)" },
    "mobile-wallpaper": { width: 1080, height: 1920, name: "Mobile Wallpaper" },
    "desktop-wallpaper": { width: 1920, height: 1080, name: "Desktop Wallpaper" },
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file)
      setError("")
      setResizedBlob(null)
      setResizedPreview("")

      // Create preview and get dimensions
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height })
          setDimensions({ width: img.width.toString(), height: img.height.toString() })
        }
        img.src = e.target?.result as string
        setOriginalPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setError("Please select a valid image file")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"],
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024,
  })

  const handleDimensionChange = (dimension: "width" | "height", value: string) => {
    if (!maintainAspectRatio) {
      setDimensions((prev) => ({ ...prev, [dimension]: value }))
      return
    }

    const numValue = Number.parseInt(value) || 0
    if (dimension === "width") {
      const newHeight = Math.round((numValue * originalDimensions.height) / originalDimensions.width)
      setDimensions({ width: value, height: newHeight.toString() })
    } else {
      const newWidth = Math.round((numValue * originalDimensions.width) / originalDimensions.height)
      setDimensions({ width: newWidth.toString(), height: value })
    }
  }

  const applyPreset = (presetKey: string) => {
    const preset = presetSizes[presetKey as keyof typeof presetSizes]
    setDimensions({ width: preset.width.toString(), height: preset.height.toString() })
    setResizeMode(presetKey)
  }

  const resizeImage = async () => {
    if (!originalFile || !canvasRef.current) return

    const width = Number.parseInt(dimensions.width)
    const height = Number.parseInt(dimensions.height)

    if (!width || !height || width <= 0 || height <= 0) {
      setError("Please enter valid dimensions")
      return
    }

    setProcessing(true)
    setError("")

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas context not available")

      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = originalPreview
      })

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Apply high-quality scaling
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height)

      // Convert to blob
      const resizedBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), originalFile.type, 0.95)
      })

      // Create preview
      const previewUrl = URL.createObjectURL(resizedBlob)
      setResizedPreview(previewUrl)
      setResizedBlob(resizedBlob)
    } catch (err) {
      setError("Failed to resize image. Please try again.")
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const downloadResized = () => {
    if (!resizedBlob || !originalFile) return

    const url = URL.createObjectURL(resizedBlob)
    const a = document.createElement("a")
    a.href = url

    const extension = originalFile.name.split(".").pop()
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "")
    a.download = `resized_${baseName}_${dimensions.width}x${dimensions.height}.${extension}`

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setOriginalFile(null)
    setResizedBlob(null)
    setOriginalPreview("")
    setResizedPreview("")
    setDimensions({ width: "", height: "" })
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
      title="Image Resizer - Resize Images Online Free"
      description="Resize images online for free. Change image dimensions for social media, web, print. Maintain aspect ratio or custom resize. Support JPG, PNG, WebP formats."
      icon={<ImageIcon className="h-8 w-8 text-green-600" />}
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
                  {isDragActive ? "Drop your image here" : "Choose image to resize"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Supports JPG, PNG, WebP, GIF, BMP • Max 50MB • High-quality resizing
                </p>
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
                  📷 Select Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resize Settings */}
        {originalFile && (
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Original Size</p>
                    <p className="font-medium">
                      {originalDimensions.width} × {originalDimensions.height}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-medium">{formatFileSize(originalFile.size)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-medium">{originalFile.type.split("/")[1].toUpperCase()}</p>
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
                <CardTitle>🎯 Resize Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Sizes */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Quick Presets</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(presetSizes).map(([key, preset]) => (
                      <Button
                        key={key}
                        variant={resizeMode === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => applyPreset(key)}
                        className="text-xs"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Dimensions */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Custom Dimensions</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Width (px)</label>
                      <Input
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => handleDimensionChange("width", e.target.value)}
                        placeholder="Width"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Height (px)</label>
                      <Input
                        type="number"
                        value={dimensions.height}
                        onChange={(e) => handleDimensionChange("height", e.target.value)}
                        placeholder="Height"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox
                      id="aspectRatio"
                      checked={maintainAspectRatio}
                      onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
                    />
                    <label htmlFor="aspectRatio" className="text-sm flex items-center">
                      <Link className="h-4 w-4 mr-1" />
                      Maintain aspect ratio
                    </label>
                  </div>
                </div>

                <Button onClick={resizeImage} disabled={processing} className="w-full" size="lg">
                  {processing ? "🔄 Resizing..." : "🚀 Resize Image"}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Results */}
        {resizedBlob && (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-green-700">✅ Image Resized Successfully!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {dimensions.width}×{dimensions.height}
                    </div>
                    <div className="text-sm text-muted-foreground">New Size</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{formatFileSize(resizedBlob.size)}</div>
                    <div className="text-sm text-muted-foreground">File Size</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {(
                        ((Number.parseInt(dimensions.width) * Number.parseInt(dimensions.height)) /
                          (originalDimensions.width * originalDimensions.height)) *
                        100
                      ).toFixed(0)}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">Scale</div>
                  </div>
                </div>

                <Button onClick={downloadResized} className="w-full bg-gradient-to-r from-green-600 to-green-700">
                  <Download className="h-5 w-5 mr-2" />
                  Download Resized Image
                </Button>
              </CardContent>
            </Card>

            {/* Visual Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>📷 Original</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={originalPreview || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-48 object-contain rounded border"
                  />
                  <p className="text-sm text-center mt-2">
                    {originalDimensions.width} × {originalDimensions.height}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>✨ Resized</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={resizedPreview || "/placeholder.svg"}
                    alt="Resized"
                    className="w-full h-48 object-contain rounded border"
                  />
                  <p className="text-sm text-center mt-2">
                    {dimensions.width} × {dimensions.height}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Hidden canvas */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </ToolLayout>
  )
}
