import { PDFDocument, PDFPage, rgb } from 'pdf-lib'

export interface CompressionOptions {
  quality: number // 1-100
  level: 'light' | 'balanced' | 'aggressive'
  removeMetadata: boolean
  optimizeImages: boolean
  removeAnnotations?: boolean
  removeBookmarks?: boolean
}

export class PDFProcessor {
  static async compressPDF(
    file: File, 
    options: CompressionOptions,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    try {
      if (onProgress) onProgress(5)

      // Read the PDF file
      const arrayBuffer = await file.arrayBuffer()
      if (onProgress) onProgress(15)

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      if (onProgress) onProgress(25)

      // Get document info
      const pageCount = pdfDoc.getPageCount()
      const pages = pdfDoc.getPages()

      if (onProgress) onProgress(35)

      // Remove metadata if requested
      if (options.removeMetadata) {
        pdfDoc.setTitle('')
        pdfDoc.setAuthor('')
        pdfDoc.setSubject('')
        pdfDoc.setKeywords([])
        pdfDoc.setProducer('')
        pdfDoc.setCreator('')
        pdfDoc.setCreationDate(new Date())
        pdfDoc.setModificationDate(new Date())
      }

      if (onProgress) onProgress(45)

      // Process pages based on compression level
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        await this.optimizePage(page, options)
        
        // Update progress
        const pageProgress = 45 + (i / pageCount) * 35
        if (onProgress) onProgress(Math.round(pageProgress))
      }

      if (onProgress) onProgress(85)

      // Save the optimized PDF
      const optimizedPdfBytes = await pdfDoc.save({
        useObjectStreams: options.level !== 'light',
        addDefaultPage: false,
        objectsPerTick: options.level === 'aggressive' ? 50 : 25,
        updateFieldAppearances: false
      })

      if (onProgress) onProgress(95)

      // Create blob
      const blob = new Blob([optimizedPdfBytes], { type: 'application/pdf' })
      
      if (onProgress) onProgress(100)

      return blob
    } catch (error) {
      console.error('PDF compression failed:', error)
      throw new Error(`PDF compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private static async optimizePage(page: PDFPage, options: CompressionOptions): Promise<void> {
    try {
      const { width, height } = page.getSize()

      // Scale down large pages for aggressive compression
      if (options.level === 'aggressive' && (width > 1200 || height > 1600)) {
        const scale = Math.min(1200 / width, 1600 / height, 0.8)
        page.scale(scale, scale)
      } else if (options.level === 'balanced' && (width > 1500 || height > 2000)) {
        const scale = Math.min(1500 / width, 2000 / height, 0.9)
        page.scale(scale, scale)
      }

      // Additional optimizations could be added here
      // For now, we rely on pdf-lib's built-in optimizations
    } catch (error) {
      console.warn('Page optimization failed:', error)
      // Continue processing other pages even if one fails
    }
  }

  static async mergePDFs(files: File[], onProgress?: (progress: number) => void): Promise<Blob> {
    try {
      if (onProgress) onProgress(5)

      const mergedPdf = await PDFDocument.create()
      let processedFiles = 0

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        
        copiedPages.forEach((page) => mergedPdf.addPage(page))
        
        processedFiles++
        const progress = 5 + (processedFiles / files.length) * 85
        if (onProgress) onProgress(Math.round(progress))
      }

      if (onProgress) onProgress(95)

      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      
      if (onProgress) onProgress(100)

      return blob
    } catch (error) {
      console.error('PDF merge failed:', error)
      throw new Error(`PDF merge failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static async splitPDF(file: File, onProgress?: (progress: number) => void): Promise<Blob[]> {
    try {
      if (onProgress) onProgress(5)

      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pageCount = pdfDoc.getPageCount()
      
      if (onProgress) onProgress(15)

      const splitPdfs: Blob[] = []
      
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create()
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i])
        newPdf.addPage(copiedPage)
        
        const pdfBytes = await newPdf.save()
        splitPdfs.push(new Blob([pdfBytes], { type: 'application/pdf' }))
        
        const progress = 15 + ((i + 1) / pageCount) * 80
        if (onProgress) onProgress(Math.round(progress))
      }

      if (onProgress) onProgress(100)

      return splitPdfs
    } catch (error) {
      console.error('PDF split failed:', error)
      throw new Error(`PDF split failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static getCompressionRatio(level: CompressionOptions['level']): number {
    switch (level) {
      case 'light': return 0.8
      case 'balanced': return 0.6
      case 'aggressive': return 0.4
      default: return 0.6
    }
  }

  static estimateCompressedSize(originalSize: number, options: CompressionOptions): number {
    const baseRatio = this.getCompressionRatio(options.level)
    const qualityFactor = options.quality / 100
    const finalRatio = baseRatio * (0.5 + qualityFactor * 0.5)
    
    return Math.round(originalSize * finalRatio)
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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