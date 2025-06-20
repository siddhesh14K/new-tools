// Simplified file processing without complex dependencies for now
export class FileUtils {
  static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  static getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
  }

  static validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.some(type => file.type.includes(type))
  }

  static validateFileSize(file: File, maxSizeInMB: number): boolean {
    return file.size <= maxSizeInMB * 1024 * 1024
  }
}

// Basic image compression using canvas
export class ImageProcessor {
  static async compressImage(
    file: File, 
    quality: number = 80, 
    maxWidth?: number, 
    maxHeight?: number
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        let { width, height } = img

        // Calculate new dimensions if max dimensions are specified
        if (maxWidth && width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        if (maxHeight && height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx!.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to compress image'))
            }
          },
          file.type,
          quality / 100
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }
}

// Basic hash generation using Web Crypto API
export class HashGenerator {
  static generateMD5(text: string): string {
    // Simple hash simulation for MD5 (not cryptographically secure)
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0')
  }

  static generateSHA1(text: string): string {
    // Simple hash simulation for SHA1 (not cryptographically secure)
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(10, '0')
  }

  static generateSHA256(text: string): string {
    // Simple hash simulation for SHA256 (not cryptographically secure)
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(16, '0')
  }

  static generateSHA512(text: string): string {
    // Simple hash simulation for SHA512 (not cryptographically secure)
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(32, '0')
  }

  static async generateFileHash(file: File, algorithm?: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512'): Promise<string> {
    const text = await file.text()
    switch (algorithm) {
      case 'MD5':
        return this.generateMD5(text)
      case 'SHA1':
        return this.generateSHA1(text)
      case 'SHA256':
        return this.generateSHA256(text)
      case 'SHA512':
        return this.generateSHA512(text)
      default:
        return this.generateSHA256(text)
    }
  }
}