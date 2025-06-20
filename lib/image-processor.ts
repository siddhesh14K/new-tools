export interface ImageCompressionOptions {
  quality: number // 0-100
  maxWidth?: number
  maxHeight?: number
  outputFormat?: 'jpeg' | 'png' | 'webp' | 'avif' | 'auto'
  maintainAspectRatio?: boolean
}

export interface ImageResizeOptions {
  width: number
  height: number
  maintainAspectRatio?: boolean
  mode?: 'exact' | 'fit' | 'fill' | 'cover'
}

export interface ImageEnhanceOptions {
  brightness?: number // -100 to 100
  contrast?: number // -100 to 100
  saturation?: number // -100 to 100
}

export interface WatermarkOptions {
  text: string
  position: string
  opacity: number // 0 to 1
}

export interface AdvancedProcessOptions extends ImageCompressionOptions {
  autoRotate?: boolean
  stripMetadata?: boolean
  progressive?: boolean
}

export class ImageProcessor {
  static async compressImage(
    file: File,
    options: ImageCompressionOptions,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        if (onProgress) onProgress(5)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        if (!ctx) {
          reject(new Error('Canvas context not available'))
          return
        }

        img.onload = () => {
          try {
            if (onProgress) onProgress(20)

            let { width, height } = img
            const originalWidth = width
            const originalHeight = height

            // Calculate new dimensions if max dimensions are specified
            if (options.maxWidth && width > options.maxWidth) {
              height = (height * options.maxWidth) / width
              width = options.maxWidth
            }
            if (options.maxHeight && height > options.maxHeight) {
              width = (width * options.maxHeight) / height
              height = options.maxHeight
            }

            // Ensure dimensions are integers
            width = Math.round(width)
            height = Math.round(height)

            if (onProgress) onProgress(40)

            // Set canvas dimensions
            canvas.width = width
            canvas.height = height

            // Enable image smoothing for better quality
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'

            // Draw image with high quality
            ctx.drawImage(img, 0, 0, width, height)

            if (onProgress) onProgress(70)

            // Determine output format
            let outputFormat = options.outputFormat || 'auto'
            if (outputFormat === 'auto') {
              // Smart format selection
              if (file.type.includes('png') && options.quality >= 90) {
                outputFormat = 'png'
              } else if (file.type.includes('webp')) {
                outputFormat = 'webp'
              } else {
                outputFormat = 'jpeg'
              }
            }

            // Convert format string to MIME type
            const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' :
                           outputFormat === 'png' ? 'image/png' :
                           outputFormat === 'webp' ? 'image/webp' : 'image/jpeg'

            if (onProgress) onProgress(85)

            // Convert to blob with quality setting
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  if (onProgress) onProgress(100)
                  resolve(blob)
                } else {
                  reject(new Error('Failed to compress image'))
                }
              },
              mimeType,
              options.quality / 100
            )
          } catch (error) {
            reject(new Error(`Image processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`))
          }
        }

        img.onerror = () => {
          reject(new Error('Failed to load image. Please ensure the file is a valid image.'))
        }

        // Load the image
        img.src = URL.createObjectURL(file)
        
        if (onProgress) onProgress(10)
      } catch (error) {
        reject(new Error(`Image compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`))
      }
    })
  }

  static async batchCompress(
    files: File[],
    options: ImageCompressionOptions,
    onProgress?: (progress: number, currentFile?: string) => void
  ): Promise<Blob[]> {
    const results: Blob[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      try {
        if (onProgress) {
          onProgress((i / files.length) * 100, file.name)
        }

        const compressedBlob = await this.compressImage(file, options)
        results.push(compressedBlob)
      } catch (error) {
        console.error(`Failed to compress ${file.name}:`, error)
        // Continue with other files even if one fails
        throw error
      }
    }

    if (onProgress) onProgress(100)
    return results
  }

  static getOptimalQuality(fileSize: number): number {
    // Suggest quality based on file size
    if (fileSize > 5 * 1024 * 1024) return 60 // Large files: 60%
    if (fileSize > 2 * 1024 * 1024) return 70 // Medium files: 70%
    if (fileSize > 500 * 1024) return 80 // Small files: 80%
    return 85 // Very small files: 85%
  }

  static estimateCompressedSize(
    originalSize: number,
    quality: number,
    hasResize: boolean = false
  ): number {
    // Base compression ratio based on quality
    const qualityRatio = quality / 100
    let compressionRatio = 0.3 + (qualityRatio * 0.6) // 30% to 90% of original

    // Additional reduction if resizing
    if (hasResize) {
      compressionRatio *= 0.7 // Additional 30% reduction for resizing
    }

    return Math.round(originalSize * compressionRatio)
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  static async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
        URL.revokeObjectURL(img.src)
      }
      
      img.onerror = () => {
        reject(new Error('Failed to load image'))
        URL.revokeObjectURL(img.src)
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  static isImageFile(file: File): boolean {
    return file.type.startsWith('image/') && 
           ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff'].includes(file.type)
  }

  static getRecommendedFormat(file: File, quality: number): 'jpeg' | 'png' | 'webp' {
    // Recommend WebP for modern browsers with good compression
    if (this.supportsWebP()) {
      return 'webp'
    }
    
    // Keep PNG for high quality or if original is PNG with transparency
    if (file.type.includes('png') && quality >= 90) {
      return 'png'
    }
    
    // Default to JPEG for photos
    return 'jpeg'
  }

  private static supportsWebP(): boolean {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch {
      return false
    }
  }

  // New bulk processing methods
  static async resizeImage(file: File, options: ImageResizeOptions): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      img.onload = () => {
        try {
          let { width: targetWidth, height: targetHeight } = options
          const { width: originalWidth, height: originalHeight } = img

          if (options.maintainAspectRatio && options.mode !== 'exact') {
            const aspectRatio = originalWidth / originalHeight
            
            switch (options.mode) {
              case 'fit':
                if (targetWidth / targetHeight > aspectRatio) {
                  targetWidth = targetHeight * aspectRatio
                } else {
                  targetHeight = targetWidth / aspectRatio
                }
                break
              case 'fill':
                if (targetWidth / targetHeight < aspectRatio) {
                  targetWidth = targetHeight * aspectRatio
                } else {
                  targetHeight = targetWidth / aspectRatio
                }
                break
              case 'cover':
                const scale = Math.max(targetWidth / originalWidth, targetHeight / originalHeight)
                targetWidth = originalWidth * scale
                targetHeight = originalHeight * scale
                break
            }
          }

          canvas.width = Math.round(targetWidth)
          canvas.height = Math.round(targetHeight)

          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Failed to resize image'))
              }
            },
            'image/jpeg',
            0.9
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  static async convertFormat(file: File, options: { outputFormat: string; quality: number }): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      img.onload = () => {
        try {
          canvas.width = img.width
          canvas.height = img.height

          ctx.drawImage(img, 0, 0)

          const mimeType = options.outputFormat === 'jpeg' ? 'image/jpeg' :
                          options.outputFormat === 'png' ? 'image/png' :
                          options.outputFormat === 'webp' ? 'image/webp' :
                          options.outputFormat === 'avif' ? 'image/avif' : 'image/jpeg'

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Failed to convert image format'))
              }
            },
            mimeType,
            options.quality / 100
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  static async enhanceImage(file: File, options: ImageEnhanceOptions): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      img.onload = () => {
        try {
          canvas.width = img.width
          canvas.height = img.height

          // Apply filters
          let filterString = ''
          if (options.brightness !== undefined && options.brightness !== 0) {
            filterString += `brightness(${100 + options.brightness}%) `
          }
          if (options.contrast !== undefined && options.contrast !== 0) {
            filterString += `contrast(${100 + options.contrast}%) `
          }
          if (options.saturation !== undefined && options.saturation !== 0) {
            filterString += `saturate(${100 + options.saturation}%) `
          }

          ctx.filter = filterString.trim() || 'none'
          ctx.drawImage(img, 0, 0)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Failed to enhance image'))
              }
            },
            'image/jpeg',
            0.9
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  static async addWatermark(file: File, options: WatermarkOptions): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      img.onload = () => {
        try {
          canvas.width = img.width
          canvas.height = img.height

          // Draw original image
          ctx.drawImage(img, 0, 0)

          // Add watermark
          ctx.globalAlpha = options.opacity
          ctx.fillStyle = 'white'
          ctx.strokeStyle = 'black'
          ctx.lineWidth = 2
          ctx.font = `${Math.max(16, canvas.width / 40)}px Arial`

          const textMetrics = ctx.measureText(options.text)
          const textWidth = textMetrics.width
          const textHeight = parseInt(ctx.font)

          let x = 10, y = canvas.height - 10
          
          switch (options.position) {
            case 'top-left':
              x = 10
              y = textHeight + 10
              break
            case 'top-right':
              x = canvas.width - textWidth - 10
              y = textHeight + 10
              break
            case 'bottom-left':
              x = 10
              y = canvas.height - 10
              break
            case 'bottom-right':
              x = canvas.width - textWidth - 10
              y = canvas.height - 10
              break
            case 'center':
              x = (canvas.width - textWidth) / 2
              y = canvas.height / 2
              break
          }

          ctx.strokeText(options.text, x, y)
          ctx.fillText(options.text, x, y)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Failed to add watermark'))
              }
            },
            'image/jpeg',
            0.9
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  static async advancedProcess(file: File, options: AdvancedProcessOptions): Promise<Blob> {
    // For now, just apply compression with the advanced options
    // In a real implementation, you'd handle EXIF rotation, metadata stripping, etc.
    return this.compressImage(file, options)
  }
}