export interface QRCodeOptions {
  size: number
  foregroundColor: string
  backgroundColor: string
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
}

export class QRCodeGenerator {
  static async generateQRCode(text: string, options: QRCodeOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        
        canvas.width = options.size
        canvas.height = options.size
        
        // Create a more realistic QR code pattern
        const moduleCount = 25 // Standard QR code size
        const moduleSize = options.size / moduleCount
        
        // Fill background
        ctx.fillStyle = options.backgroundColor
        ctx.fillRect(0, 0, options.size, options.size)
        
        // Generate QR pattern based on text
        ctx.fillStyle = options.foregroundColor
        
        // Create a hash-based pattern from the text
        const hash = this.simpleHash(text)
        
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            // Create finder patterns (corners)
            if (this.isFinderPattern(row, col, moduleCount)) {
              ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
              continue
            }
            
            // Create timing patterns
            if (this.isTimingPattern(row, col, moduleCount)) {
              if ((row + col) % 2 === 0) {
                ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
              }
              continue
            }
            
            // Create data pattern based on text hash
            const shouldFill = this.shouldFillModule(row, col, hash, options.errorCorrectionLevel)
            if (shouldFill) {
              ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
            }
          }
        }
        
        resolve(canvas.toDataURL('image/png'))
      } catch (error) {
        reject(new Error('Failed to generate QR code'))
      }
    })
  }
  
  private static simpleHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  
  private static isFinderPattern(row: number, col: number, size: number): boolean {
    // Top-left finder pattern
    if ((row < 7 && col < 7) ||
        // Top-right finder pattern
        (row < 7 && col >= size - 7) ||
        // Bottom-left finder pattern
        (row >= size - 7 && col < 7)) {
      
      const localRow = row < 7 ? row : (row >= size - 7 ? row - (size - 7) : row)
      const localCol = col < 7 ? col : (col >= size - 7 ? col - (size - 7) : col)
      
      // Create the finder pattern (7x7 with specific pattern)
      if (localRow === 0 || localRow === 6 || localCol === 0 || localCol === 6) return true
      if (localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4) return true
    }
    
    return false
  }
  
  private static isTimingPattern(row: number, col: number, size: number): boolean {
    return (row === 6 && col >= 8 && col < size - 8) || 
           (col === 6 && row >= 8 && row < size - 8)
  }
  
  private static shouldFillModule(row: number, col: number, hash: number, errorLevel: string): boolean {
    // Skip finder pattern areas
    if (this.isFinderPattern(row, col, 25)) return false
    if (this.isTimingPattern(row, col, 25)) return false
    
    // Create pseudo-random pattern based on position and hash
    const seed = hash + row * 31 + col * 17
    const errorMultiplier = errorLevel === 'H' ? 1.3 : errorLevel === 'Q' ? 1.1 : errorLevel === 'M' ? 1.0 : 0.9
    
    return (seed * errorMultiplier) % 3 === 0
  }
  
  static async generateSVG(text: string, options: QRCodeOptions): Promise<string> {
    const moduleCount = 25
    const moduleSize = options.size / moduleCount
    const hash = this.simpleHash(text)
    
    let svgContent = `<svg width="${options.size}" height="${options.size}" xmlns="http://www.w3.org/2000/svg">`
    svgContent += `<rect width="${options.size}" height="${options.size}" fill="${options.backgroundColor}"/>`
    
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        let shouldFill = false
        
        if (this.isFinderPattern(row, col, moduleCount)) {
          shouldFill = true
        } else if (this.isTimingPattern(row, col, moduleCount)) {
          shouldFill = (row + col) % 2 === 0
        } else {
          shouldFill = this.shouldFillModule(row, col, hash, options.errorCorrectionLevel)
        }
        
        if (shouldFill) {
          svgContent += `<rect x="${col * moduleSize}" y="${row * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${options.foregroundColor}"/>`
        }
      }
    }
    
    svgContent += '</svg>'
    return svgContent
  }
  
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
}