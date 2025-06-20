import CryptoJS from 'crypto-js'
import { saveAs } from 'file-saver'

// Hash Functions
export class HashGenerator {
  static generateMD5(text: string): string {
    return CryptoJS.MD5(text).toString()
  }

  static generateSHA1(text: string): string {
    return CryptoJS.SHA1(text).toString()
  }

  static generateSHA256(text: string): string {
    return CryptoJS.SHA256(text).toString()
  }

  static generateSHA512(text: string): string {
    return CryptoJS.SHA512(text).toString()
  }

  static async generateFileHash(file: File, algorithm: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512'): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer)
      
      switch (algorithm) {
        case 'MD5':
          return CryptoJS.MD5(wordArray).toString()
        case 'SHA1':
          return CryptoJS.SHA1(wordArray).toString()
        case 'SHA256':
          return CryptoJS.SHA256(wordArray).toString()
        case 'SHA512':
          return CryptoJS.SHA512(wordArray).toString()
        default:
          throw new Error('Unsupported algorithm')
      }
    } catch (error) {
      console.error('File hash generation failed:', error)
      throw new Error('Failed to generate file hash')
    }
  }
}

// Utility Functions
export class FileUtils {
  static downloadBlob(blob: Blob, filename: string): void {
    saveAs(blob, filename)
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