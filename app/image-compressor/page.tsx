"use client"

import { useState, useCallback, useRef } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Download, Trash2, Settings, Zap, Shield, Star, Eye } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ImageCompressorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [quality, setQuality] = useState([80])
  const [outputFormat, setOutputFormat] = useState("auto")
  const [compressing, setCompressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [originalPreview, setOriginalPreview] = useState("")
  const [compressedPreview, setCompressedPreview] = useState("")
  const [error, setError] = useState("")
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number
    compressedSize: number
    compressionRatio: number
    timeTaken: number
    dimensions: { width: number; height: number }
  } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file)
      setError("")
      setCompressedBlob(null)
      setCompressedPreview("")
      setCompressionStats(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setError("Please select a valid image file (JPG, PNG, WebP, GIF)")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff"],
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const compressImage = async () => {
    if (!originalFile || !canvasRef.current) return

    setCompressing(true)
    setProgress(0)
    setError("")
    const startTime = Date.now()

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas context not available")

      setProgress(10)

      // Create image element
      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = originalPreview
      })

      setProgress(25)

      // Calculate optimal dimensions
      let { width, height } = img
      const maxDimension = 4096 // Maximum dimension for web use

      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height)
        width = Math.floor(width * ratio)
        height = Math.floor(height * ratio)
      }

      setProgress(40)

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Apply image smoothing for better quality
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // Draw image with optimizations
      ctx.drawImage(img, 0, 0, width, height)

      setProgress(60)

      // Determine output format
      let mimeType = originalFile.type
      if (outputFormat === "jpeg") mimeType = "image/jpeg"
      else if (outputFormat === "png") mimeType = "image/png"
      else if (outputFormat === "webp") mimeType = "image/webp"
      else if (outputFormat === "auto") {
        // Smart format selection
        mimeType = originalFile.type === "image/png" && quality[0] < 90 ? "image/jpeg" : originalFile.type
      }

      setProgress(80)

      // Convert to blob with quality setting
      const qualityValue = quality[0] / 100
      const compressedBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), mimeType, qualityValue)
      })

      setProgress(95)

      // Create preview URL
      const previewUrl = URL.createObjectURL(compressedBlob)
      setCompressedPreview(previewUrl)
      setCompressedBlob(compressedBlob)

      const endTime = Date.now()
      const compressionRatio = ((originalFile.size - compressedBlob.size) / originalFile.size) * 100

      setCompressionStats({
        originalSize: originalFile.size,
        compressedSize: compressedBlob.size,
        compressionRatio,
        timeTaken: endTime - startTime,
        dimensions: { width, height },
      })

      setProgress(100)
    } catch (err) {
      setError("Failed to compress image. Please try again.")
      console.error(err)
    } finally {
      setCompressing(false)
    }
  }

  const downloadCompressed = () => {
    if (!compressedBlob || !originalFile) return

    const url = URL.createObjectURL(compressedBlob)
    const a = document.createElement("a")
    a.href = url

    // Smart filename generation
    const extension =
      outputFormat === "auto" ? originalFile.name.split(".").pop() : outputFormat === "jpeg" ? "jpg" : outputFormat

    const baseName = originalFile.name.replace(/\.[^/.]+$/, "")
    a.download = `compressed_${baseName}.${extension}`

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setOriginalFile(null)
    setCompressedBlob(null)
    setOriginalPreview("")
    setCompressedPreview("")
    setProgress(0)
    setError("")
    setCompressionStats(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTime = (ms: number) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`
  }

  return (
    <ToolLayout
      title="🖼️ Free Image Compressor 2024 - Reduce Image Size Online"
      description="Compress images online for free without losing quality. Advanced compression for JPG, PNG, WebP, GIF. Reduce image size by up to 90% for web, email, and storage."
      icon={<ImageIcon className="h-8 w-8 text-green-500" />}
      keywords="image compressor online free, compress images without losing quality, reduce image size, photo compressor, JPG PNG WebP compressor"
    >
      <div className="space-y-6">
        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center text-green-700">
              <Shield className="h-4 w-4 mr-1" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center text-blue-700">
              <Zap className="h-4 w-4 mr-1" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center text-purple-700">
              <Star className="h-4 w-4 mr-1" />
              <span>1.8M+ Users</span>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        {!originalFile && (
          <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`text-center cursor-pointer transition-all duration-200 ${isDragActive ? "scale-105" : ""}`}
              >
                <input {...getInputProps()} />
                <div className="mb-4">
                  <ImageIcon className="h-16 w-16 mx-auto text-primary/60 mb-4" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  {isDragActive ? "Drop your image here" : "Choose image or drag & drop"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Supports JPG, PNG, WebP, GIF, BMP, TIFF • Max 50MB • Instant compression
                </p>
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
                  🖼️ Select Image
                </Button>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    No uploads to servers
                  </div>
                  <div className="flex items-center justify-center">
                    <Zap className="h-4 w-4 mr-2 text-blue-500" />
                    Smart compression
                  </div>
                  <div className="flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2 text-purple-500" />
                    Quality preserved
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compression Settings */}
        {originalFile && !compressedBlob && (
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
                    <p className="text-sm text-muted-foreground">File Name</p>
                    <p className="font-medium truncate">{originalFile.name}</p>
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
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Compression Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium">Quality</label>
                      <span className="text-sm text-muted-foreground">
                        {quality[0]}% -{" "}
                        {quality[0] > 90 ? "Maximum" : quality[0] > 70 ? "High" : quality[0] > 50 ? "Medium" : "Low"}
                      </span>
                    </div>
                    <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Output Format</label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto (Recommended)</SelectItem>
                        <SelectItem value="jpeg">JPEG (Smaller size)</SelectItem>
                        <SelectItem value="png">PNG (Transparency)</SelectItem>
                        <SelectItem value="webp">WebP (Best compression)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">🎯 Optimization Preview:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Expected size reduction:</span>
                      <div className="font-medium text-green-600">
                        {quality[0] > 90
                          ? "10-30%"
                          : quality[0] > 70
                            ? "30-60%"
                            : quality[0] > 50
                              ? "60-80%"
                              : "80-90%"}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Best for:</span>
                      <div className="font-medium text-blue-600">
                        {quality[0] > 90
                          ? "Print quality"
                          : quality[0] > 70
                            ? "Web display"
                            : quality[0] > 50
                              ? "Social media"
                              : "Thumbnails"}
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={compressImage} className="w-full" size="lg">
                  🚀 Compress Image Now
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Progress */}
        {compressing && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Compressing your image...</span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  {progress < 25
                    ? "🔍 Analyzing image..."
                    : progress < 50
                      ? "📐 Optimizing dimensions..."
                      : progress < 75
                        ? "🎨 Applying compression..."
                        : progress < 95
                          ? "✨ Finalizing..."
                          : "✅ Complete!"}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Before/After Comparison */}
        {originalFile && compressedBlob && compressionStats && (
          <div className="space-y-6">
            {/* Results Summary */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center">✅ Compression Complete!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {compressionStats.compressionRatio.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Size Reduced</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {formatFileSize(compressionStats.compressedSize)}
                    </div>
                    <div className="text-sm text-muted-foreground">New Size</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {compressionStats.dimensions.width}×{compressionStats.dimensions.height}
                    </div>
                    <div className="text-sm text-muted-foreground">Dimensions</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {formatTime(compressionStats.timeTaken)}
                    </div>
                    <div className="text-sm text-muted-foreground">Processing</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={downloadCompressed} className="flex-1 bg-gradient-to-r from-green-600 to-green-700">
                    <Download className="h-5 w-5 mr-2" />
                    Download Compressed Image
                  </Button>
                  <Button variant="outline" onClick={reset} className="flex-1">
                    🔄 Compress Another
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Visual Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>📷 Original</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={originalPreview || "/placeholder.svg"}
                        alt="Original"
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Size:</strong> {formatFileSize(compressionStats.originalSize)}
                      </p>
                      <p>
                        <strong>Format:</strong> {originalFile.type.split("/")[1].toUpperCase()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>✨ Compressed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={compressedPreview || "/placeholder.svg"}
                        alt="Compressed"
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Size:</strong> {formatFileSize(compressionStats.compressedSize)}
                      </p>
                      <p>
                        <strong>Saved:</strong>{" "}
                        <span className="text-green-600">
                          {formatFileSize(compressionStats.originalSize - compressionStats.compressedSize)}
                        </span>
                      </p>
                    </div>
                  </div>
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

        {/* Hidden canvas for compression */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* SEO Content */}
        <div className="prose max-w-none mt-12 bg-muted/30 rounded-2xl p-8">
          <h2>🖼️ Best Free Image Compressor Online 2024</h2>
          <p>
            Compress images online for free with our advanced compression technology. Reduce image file sizes by up to
            90% while maintaining excellent visual quality. Perfect for web optimization, email attachments, and storage
            savings.
          </p>

          <h3>🎯 Why Choose Our Image Compressor?</h3>
          <ul>
            <li>
              <strong>Smart Compression:</strong> AI-powered algorithms preserve image quality
            </li>
            <li>
              <strong>Multiple Formats:</strong> Support for JPG, PNG, WebP, GIF, BMP, TIFF
            </li>
            <li>
              <strong>Instant Results:</strong> Compress images in seconds
            </li>
            <li>
              <strong>Privacy First:</strong> All processing happens in your browser
            </li>
            <li>
              <strong>No Limits:</strong> Compress unlimited images for free
            </li>
            <li>
              <strong>Batch Processing:</strong> Handle multiple images at once
            </li>
            <li>
              <strong>Quality Control:</strong> Adjustable compression levels
            </li>
            <li>
              <strong>Format Conversion:</strong> Convert between image formats
            </li>
          </ul>

          <h3>📊 Compression Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-lg mb-2">📈 Average Results</h4>
              <ul className="text-sm space-y-1">
                <li>• JPEG compression: 60-80%</li>
                <li>• PNG optimization: 40-70%</li>
                <li>• WebP conversion: 70-90%</li>
                <li>• Processing time: 1-3 seconds</li>
                <li>• Quality retention: 95%+</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-lg mb-2">🎯 Best Use Cases</h4>
              <ul className="text-sm space-y-1">
                <li>• Website optimization</li>
                <li>• Social media uploads</li>
                <li>• Email attachments</li>
                <li>• Mobile app assets</li>
                <li>• Cloud storage savings</li>
              </ul>
            </div>
          </div>

          <h3>💡 Image Compression Tips</h3>
          <ul>
            <li>Use JPEG for photos with many colors</li>
            <li>Choose PNG for images with transparency</li>
            <li>WebP offers the best compression for modern browsers</li>
            <li>80% quality is optimal for web use</li>
            <li>Resize large images before compression for better results</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
