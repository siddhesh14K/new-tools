"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  X, 
  Download, 
  Play, 
  Pause, 
  RotateCw, 
  FileImage,
  Settings,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Archive
} from "lucide-react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { ImageProcessor, ImageCompressionOptions } from "@/lib/image-processor"

interface ProcessingFile {
  id: string
  file: File
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  result?: Blob
  error?: string
  originalSize: number
  processedSize?: number
  preview?: string
}

interface BulkImageProcessorProps {
  mode: 'resize' | 'compress' | 'convert' | 'enhance' | 'watermark' | 'advanced'
  onProcessComplete?: (count: number) => void
}

interface ProcessingSettings {
  // Resize settings
  width: number
  height: number
  maintainAspectRatio: boolean
  resizeMode: 'exact' | 'fit' | 'fill' | 'cover'
  
  // Compression settings
  quality: number
  outputFormat: string
  
  // Enhancement settings
  brightness: number
  contrast: number
  saturation: number
  
  // Watermark settings
  watermarkText: string
  watermarkPosition: string
  watermarkOpacity: number
  
  // Advanced settings
  autoRotate: boolean
  stripMetadata: boolean
  progressive: boolean
}

const defaultSettings: ProcessingSettings = {
  width: 1920,
  height: 1080,
  maintainAspectRatio: true,
  resizeMode: 'fit',
  quality: 80,
  outputFormat: 'auto',
  brightness: 0,
  contrast: 0,
  saturation: 0,
  watermarkText: '',
  watermarkPosition: 'bottom-right',
  watermarkOpacity: 50,
  autoRotate: true,
  stripMetadata: false,
  progressive: true
}

export function BulkImageProcessor({ mode, onProcessComplete }: BulkImageProcessorProps) {
  const [files, setFiles] = useState<ProcessingFile[]>([])
  const [settings, setSettings] = useState<ProcessingSettings>(defaultSettings)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentProcessing, setCurrentProcessing] = useState<string | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null)
  
  const processingRef = useRef<boolean>(false)
  const pauseRef = useRef<boolean>(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.avif']
    },
    maxFiles: 100,
    maxSize: 25 * 1024 * 1024, // 25MB
    onDrop: useCallback((acceptedFiles: File[]) => {
      const newFiles: ProcessingFile[] = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        status: 'pending',
        progress: 0,
        originalSize: file.size,
        preview: URL.createObjectURL(file)
      }))
      setFiles(prev => [...prev, ...newFiles])
    }, [])
  })

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }, [])

  const clearAll = useCallback(() => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
    setOverallProgress(0)
    setCurrentProcessing(null)
  }, [files])

  const processImage = async (file: ProcessingFile): Promise<Blob> => {
    const options: ImageCompressionOptions = {
      quality: settings.quality,
      outputFormat: settings.outputFormat === 'auto' ? 'auto' : settings.outputFormat as any,
      maxWidth: mode === 'resize' ? settings.width : undefined,
      maxHeight: mode === 'resize' ? settings.height : undefined,
      maintainAspectRatio: settings.maintainAspectRatio,
    }

    // Apply different processing based on mode
    switch (mode) {
      case 'resize':
        return await ImageProcessor.resizeImage(file.file, {
          width: settings.width,
          height: settings.height,
          maintainAspectRatio: settings.maintainAspectRatio,
          mode: settings.resizeMode
        })
      
      case 'compress':
        return await ImageProcessor.compressImage(file.file, options, (progress) => {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress } : f
          ))
        })
      
      case 'convert':
        return await ImageProcessor.convertFormat(file.file, {
          outputFormat: settings.outputFormat as string,
          quality: settings.quality
        })
      
      case 'enhance':
        return await ImageProcessor.enhanceImage(file.file, {
          brightness: settings.brightness,
          contrast: settings.contrast,
          saturation: settings.saturation
        })
      
      case 'watermark':
        return await ImageProcessor.addWatermark(file.file, {
          text: settings.watermarkText,
          position: settings.watermarkPosition,
          opacity: settings.watermarkOpacity / 100
        })
      
      case 'advanced':
        return await ImageProcessor.advancedProcess(file.file, {
          autoRotate: settings.autoRotate,
          stripMetadata: settings.stripMetadata,
          progressive: settings.progressive,
          ...options
        })
      
      default:
        return await ImageProcessor.compressImage(file.file, options)
    }
  }

  const startProcessing = async () => {
    if (files.length === 0) return
    
    setIsProcessing(true)
    setIsPaused(false)
    processingRef.current = true
    pauseRef.current = false
    
    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error')
    let completedCount = 0
    
    for (let i = 0; i < pendingFiles.length; i++) {
      if (!processingRef.current) break
      
      // Check for pause
      while (pauseRef.current && processingRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      if (!processingRef.current) break
      
      const file = pendingFiles[i]
      setCurrentProcessing(file.id)
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'processing', progress: 0 } : f
      ))
      
      try {
        const result = await processImage(file)
        
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { 
            ...f, 
            status: 'completed', 
            progress: 100, 
            result,
            processedSize: result.size
          } : f
        ))
        
        completedCount++
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { 
            ...f, 
            status: 'error', 
            error: error instanceof Error ? error.message : 'Processing failed'
          } : f
        ))
      }
      
      setOverallProgress(Math.round(((i + 1) / pendingFiles.length) * 100))
    }
    
    setIsProcessing(false)
    setCurrentProcessing(null)
    processingRef.current = false
    
    if (completedCount > 0 && onProcessComplete) {
      onProcessComplete(completedCount)
    }
  }

  const pauseProcessing = () => {
    setIsPaused(true)
    pauseRef.current = true
  }

  const resumeProcessing = () => {
    setIsPaused(false)
    pauseRef.current = false
  }

  const stopProcessing = () => {
    setIsProcessing(false)
    setIsPaused(false)
    processingRef.current = false
    pauseRef.current = false
    setCurrentProcessing(null)
  }

  const downloadFile = (file: ProcessingFile) => {
    if (!file.result) return
    
    const extension = getFileExtension(file.file.name, settings.outputFormat)
    const fileName = `processed_${file.file.name.replace(/\.[^/.]+$/, '')}.${extension}`
    
    saveAs(file.result, fileName)
  }

  const downloadAll = async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.result)
    if (completedFiles.length === 0) return
    
    const zip = new JSZip()
    
    completedFiles.forEach(file => {
      if (file.result) {
        const extension = getFileExtension(file.file.name, settings.outputFormat)
        const fileName = `processed_${file.file.name.replace(/\.[^/.]+$/, '')}.${extension}`
        zip.file(fileName, file.result)
      }
    })
    
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `bulk_processed_images_${Date.now()}.zip`)
  }

  const getFileExtension = (originalName: string, format: string): string => {
    if (format === 'auto') {
      return originalName.split('.').pop()?.toLowerCase() || 'jpg'
    }
    return format === 'jpeg' ? 'jpg' : format
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getCompressionRatio = (original: number, processed: number): string => {
    const ratio = ((original - processed) / original) * 100
    return ratio > 0 ? `-${ratio.toFixed(1)}%` : '+0%'
  }

  const completedFiles = files.filter(f => f.status === 'completed')
  const totalOriginalSize = files.reduce((sum, f) => sum + f.originalSize, 0)
  const totalProcessedSize = completedFiles.reduce((sum, f) => sum + (f.processedSize || 0), 0)

  return (
    <div className="space-y-6">
      {/* Settings Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mode === 'resize' && (
              <>
                <div>
                  <Label>Width (px)</Label>
                  <Input
                    type="number"
                    value={settings.width}
                    onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label>Height (px)</Label>
                  <Input
                    type="number"
                    value={settings.height}
                    onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aspect-ratio"
                    checked={settings.maintainAspectRatio}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, maintainAspectRatio: checked as boolean }))
                    }
                  />
                  <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
                </div>
              </>
            )}

            {(mode === 'compress' || mode === 'convert') && (
              <>
                <div>
                  <Label>Quality: {settings.quality}%</Label>
                  <Slider
                    value={[settings.quality]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, quality: value }))}
                    max={100}
                    min={10}
                    step={5}
                  />
                </div>
                <div>
                  <Label>Output Format</Label>
                  <Select
                    value={settings.outputFormat}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, outputFormat: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="avif">AVIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {mode === 'enhance' && (
              <>
                <div>
                  <Label>Brightness: {settings.brightness}</Label>
                  <Slider
                    value={[settings.brightness]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, brightness: value }))}
                    max={100}
                    min={-100}
                    step={5}
                  />
                </div>
                <div>
                  <Label>Contrast: {settings.contrast}</Label>
                  <Slider
                    value={[settings.contrast]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, contrast: value }))}
                    max={100}
                    min={-100}
                    step={5}
                  />
                </div>
                <div>
                  <Label>Saturation: {settings.saturation}</Label>
                  <Slider
                    value={[settings.saturation]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, saturation: value }))}
                    max={100}
                    min={-100}
                    step={5}
                  />
                </div>
              </>
            )}

            {mode === 'watermark' && (
              <>
                <div>
                  <Label>Watermark Text</Label>
                  <Input
                    value={settings.watermarkText}
                    onChange={(e) => setSettings(prev => ({ ...prev, watermarkText: e.target.value }))}
                    placeholder="Enter watermark text"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Select
                    value={settings.watermarkPosition}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, watermarkPosition: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Opacity: {settings.watermarkOpacity}%</Label>
                  <Slider
                    value={[settings.watermarkOpacity]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, watermarkOpacity: value }))}
                    max={100}
                    min={10}
                    step={5}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop images here...' : 'Drag & drop images or click to select'}
            </p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, WebP, GIF, BMP, TIFF, AVIF • Max 25MB per file • Up to 100 files
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Files ({files.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="h-4 w-4 mr-1" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  {showPreview && file.preview && (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-12 h-12 object-cover rounded cursor-pointer"
                      onClick={() => setSelectedPreview(file.preview!)}
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.file.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.originalSize)}</span>
                      {file.processedSize && (
                        <>
                          <span>→ {formatFileSize(file.processedSize)}</span>
                          <span className="text-green-600">
                            {getCompressionRatio(file.originalSize, file.processedSize)}
                          </span>
                        </>
                      )}
                    </div>
                    {file.status === 'processing' && (
                      <Progress value={file.progress} className="mt-2" />
                    )}
                    {file.error && (
                      <p className="text-red-500 text-sm mt-1">{file.error}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === 'pending' && (
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {file.status === 'processing' && (
                      <Badge variant="default">
                        <RotateCw className="h-3 w-3 mr-1 animate-spin" />
                        Processing
                      </Badge>
                    )}
                    {file.status === 'completed' && (
                      <>
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                        <Button size="sm" onClick={() => downloadFile(file)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {file.status === 'error' && (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Error
                      </Badge>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      disabled={file.status === 'processing'}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Controls */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {!isProcessing ? (
                  <Button onClick={startProcessing} size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Processing
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    {!isPaused ? (
                      <Button onClick={pauseProcessing} variant="outline">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button onClick={resumeProcessing}>
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                    )}
                    <Button onClick={stopProcessing} variant="destructive">
                      Stop
                    </Button>
                  </div>
                )}
                
                {completedFiles.length > 0 && (
                  <Button onClick={downloadAll} variant="outline">
                    <Archive className="h-4 w-4 mr-2" />
                    Download All ({completedFiles.length})
                  </Button>
                )}
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  {completedFiles.length} of {files.length} completed
                </div>
                {totalProcessedSize > 0 && (
                  <div className="text-sm font-medium">
                    Total saved: {formatFileSize(totalOriginalSize - totalProcessedSize)}
                  </div>
                )}
              </div>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} />
                {currentProcessing && (
                  <p className="text-sm text-muted-foreground">
                    Processing: {files.find(f => f.id === currentProcessing)?.file.name}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Preview Modal */}
      {selectedPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedPreview(null)}
        >
          <div className="max-w-4xl max-h-4xl p-4">
            <img
              src={selectedPreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}