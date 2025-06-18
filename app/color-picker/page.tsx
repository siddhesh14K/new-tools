"use client"

import { useState, useEffect, useRef } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/copy-button"
import { Palette, Shuffle } from "lucide-react"

export default function ColorPickerPage() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [colorFormats, setColorFormats] = useState({
    hex: "#3b82f6",
    rgb: "rgb(59, 130, 246)",
    hsl: "hsl(217, 91%, 60%)",
    hsv: "hsv(217, 76%, 96%)",
    cmyk: "cmyk(76%, 47%, 0%, 4%)",
  })
  const [colorHistory, setColorHistory] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Convert hex to other formats
  const convertColor = (hex: string) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)

    // RGB
    const rgb = `rgb(${r}, ${g}, ${b})`

    // HSL
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const diff = max - min

    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

      switch (max) {
        case rNorm:
          h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6
          break
        case gNorm:
          h = ((bNorm - rNorm) / diff + 2) / 6
          break
        case bNorm:
          h = ((rNorm - gNorm) / diff + 4) / 6
          break
      }
    }

    const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`

    // HSV
    const v = max
    const sHsv = max === 0 ? 0 : diff / max
    const hsv = `hsv(${Math.round(h * 360)}, ${Math.round(sHsv * 100)}%, ${Math.round(v * 100)}%)`

    // CMYK
    const k = 1 - max
    const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k)
    const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k)
    const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k)
    const cmyk = `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`

    setColorFormats({
      hex: hex.toUpperCase(),
      rgb,
      hsl,
      hsv,
      cmyk,
    })
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    convertColor(color)

    // Add to history
    if (!colorHistory.includes(color)) {
      setColorHistory((prev) => [color, ...prev.slice(0, 11)])
    }
  }

  const generateRandomColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    handleColorChange(randomColor)
  }

  const generateColorPalette = () => {
    const baseHue = Math.floor(Math.random() * 360)
    const palette = []

    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * 72) % 360
      const saturation = 70 + Math.random() * 30
      const lightness = 40 + Math.random() * 40

      const color = hslToHex(hue, saturation, lightness)
      palette.push(color)
    }

    return palette
  }

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100
    l /= 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2

    let r = 0,
      g = 0,
      b = 0

    if (0 <= h && h < 60) {
      r = c
      g = x
      b = 0
    } else if (60 <= h && h < 120) {
      r = x
      g = c
      b = 0
    } else if (120 <= h && h < 180) {
      r = 0
      g = c
      b = x
    } else if (180 <= h && h < 240) {
      r = 0
      g = x
      b = c
    } else if (240 <= h && h < 300) {
      r = x
      g = 0
      b = c
    } else if (300 <= h && h < 360) {
      r = c
      g = 0
      b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const [palette, setPalette] = useState<string[]>([])

  useEffect(() => {
    setPalette(generateColorPalette())
  }, [])

  useEffect(() => {
    convertColor(selectedColor)
  }, [])

  return (
    <ToolLayout
      title="Color Picker & Palette Generator"
      description="Pick colors, generate palettes, and get color codes in HEX, RGB, HSL, HSV, and CMYK formats. Perfect for designers and developers."
      icon={<Palette className="h-8 w-8 text-pink-500" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Picker Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Color Display */}
              <div className="text-center">
                <div
                  className="w-32 h-32 mx-auto rounded-lg border-4 border-white shadow-lg"
                  style={{ backgroundColor: selectedColor }}
                />
                <p className="mt-2 font-mono text-lg">{selectedColor.toUpperCase()}</p>
              </div>

              {/* Color Input */}
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-16 h-12 p-1 border-2"
                />
                <Input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="flex-1 font-mono"
                  placeholder="#000000"
                />
                <Button onClick={generateRandomColor} variant="outline" size="icon">
                  <Shuffle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Color Formats */}
          <Card>
            <CardHeader>
              <CardTitle>Color Formats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(colorFormats).map(([format, value]) => (
                <div key={format} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <span className="font-semibold text-sm uppercase">{format}</span>
                    <p className="font-mono text-sm text-muted-foreground">{value}</p>
                  </div>
                  <CopyButton text={value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Palettes and History */}
        <div className="space-y-6">
          {/* Generated Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Color Palette
                <Button onClick={() => setPalette(generateColorPalette())} variant="outline" size="sm">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {palette.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-full h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    />
                    <p className="text-xs font-mono mt-1">{color.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Color History */}
          {colorHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2">
                  {colorHistory.map((color, index) => (
                    <div
                      key={index}
                      className="w-full h-12 rounded border cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Accessibility Info */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <span style={{ color: selectedColor }} className="font-semibold">
                    Text on White
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {getContrastRatio(selectedColor, "#ffffff") > 4.5 ? "✅ Good" : "❌ Poor"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black rounded border">
                  <span style={{ color: selectedColor }} className="font-semibold">
                    Text on Black
                  </span>
                  <span className="text-sm text-white">
                    {getContrastRatio(selectedColor, "#000000") > 4.5 ? "✅ Good" : "❌ Poor"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose max-w-none mt-12">
        <h2>Professional Color Picker Tool</h2>
        <p>
          Our advanced color picker tool helps designers, developers, and creatives work with colors efficiently. Get
          precise color codes in multiple formats and generate harmonious color palettes.
        </p>

        <h3>Color Format Support</h3>
        <ul>
          <li>
            <strong>HEX:</strong> Most common format for web development (#FF0000)
          </li>
          <li>
            <strong>RGB:</strong> Red, Green, Blue values for digital displays
          </li>
          <li>
            <strong>HSL:</strong> Hue, Saturation, Lightness for intuitive color selection
          </li>
          <li>
            <strong>HSV:</strong> Hue, Saturation, Value for design applications
          </li>
          <li>
            <strong>CMYK:</strong> Cyan, Magenta, Yellow, Key for print design
          </li>
        </ul>

        <h3>Features</h3>
        <ul>
          <li>✅ Multiple color format conversion</li>
          <li>✅ Random color generation</li>
          <li>✅ Harmonious palette creation</li>
          <li>✅ Color history tracking</li>
          <li>✅ Accessibility contrast checking</li>
          <li>✅ One-click color copying</li>
        </ul>
      </div>
    </ToolLayout>
  )
}

// Helper function for contrast ratio calculation
function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string) => {
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255

    const sRGB = [r, g, b].map((c) => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
  }

  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}
