"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, ArrowUpDown, Download } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

const conversions = {
  weight: {
    name: "Weight",
    units: {
      kg: { name: "Kilograms", factor: 1 },
      lb: { name: "Pounds", factor: 2.20462 },
      g: { name: "Grams", factor: 1000 },
      oz: { name: "Ounces", factor: 35.274 },
      stone: { name: "Stone", factor: 0.157473 },
    },
  },
  length: {
    name: "Length",
    units: {
      m: { name: "Meters", factor: 1 },
      ft: { name: "Feet", factor: 3.28084 },
      cm: { name: "Centimeters", factor: 100 },
      in: { name: "Inches", factor: 39.3701 },
      km: { name: "Kilometers", factor: 0.001 },
      mi: { name: "Miles", factor: 0.000621371 },
      yd: { name: "Yards", factor: 1.09361 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      c: { name: "Celsius", factor: 1 },
      f: { name: "Fahrenheit", factor: 1 },
      k: { name: "Kelvin", factor: 1 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      l: { name: "Liters", factor: 1 },
      gal: { name: "Gallons (US)", factor: 0.264172 },
      ml: { name: "Milliliters", factor: 1000 },
      cup: { name: "Cups", factor: 4.22675 },
      pt: { name: "Pints", factor: 2.11338 },
      qt: { name: "Quarts", factor: 1.05669 },
    },
  },
}

export default function UnitConverterPage() {
  const [category, setCategory] = useState("weight")
  const [fromUnit, setFromUnit] = useState("kg")
  const [toUnit, setToUnit] = useState("lb")
  const [inputValue, setInputValue] = useState("")
  const [result, setResult] = useState("")

  const convertValue = (value: string) => {
    if (!value || isNaN(Number(value))) {
      setResult("")
      return
    }

    const num = Number.parseFloat(value)
    const categoryData = conversions[category as keyof typeof conversions]

    if (category === "temperature") {
      // Special handling for temperature conversions
      let celsius = num

      // Convert input to Celsius first
      if (fromUnit === "f") {
        celsius = ((num - 32) * 5) / 9
      } else if (fromUnit === "k") {
        celsius = num - 273.15
      }

      // Convert from Celsius to target unit
      let converted = celsius
      if (toUnit === "f") {
        converted = (celsius * 9) / 5 + 32
      } else if (toUnit === "k") {
        converted = celsius + 273.15
      }

      setResult(converted.toFixed(4).replace(/\.?0+$/, ""))
    } else {
      // Standard unit conversions
      const fromUnitData = categoryData.units[fromUnit as keyof typeof categoryData.units] as any
      const toUnitData = categoryData.units[toUnit as keyof typeof categoryData.units] as any
      const fromFactor = fromUnitData?.factor || 1
      const toFactor = toUnitData?.factor || 1
      const converted = (num / fromFactor) * toFactor
      setResult(converted.toFixed(6).replace(/\.?0+$/, ""))
    }
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    convertValue(value)
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    if (inputValue) {
      convertValue(inputValue)
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    const categoryData = conversions[newCategory as keyof typeof conversions]
    const units = Object.keys(categoryData.units)
    setFromUnit(units[0])
    setToUnit(units[1])
    setInputValue("")
    setResult("")
  }

  const currentCategory = conversions[category as keyof typeof conversions]

  const downloadResult = () => {
    if (!inputValue || !result) return

    const categoryData = conversions[category as keyof typeof conversions]
    const fromUnitData = categoryData.units[fromUnit as keyof typeof categoryData.units] as any
    const toUnitData = categoryData.units[toUnit as keyof typeof categoryData.units] as any
    const fromUnitName = fromUnitData?.name || fromUnit
    const toUnitName = toUnitData?.name || toUnit

    const content = [
      "UNIT CONVERSION RESULT",
      "=".repeat(25),
      "",
      `Category: ${categoryData.name}`,
      `From: ${inputValue} ${fromUnitName}`,
      `To: ${result} ${toUnitName}`,
      "",
      `Conversion performed on: ${new Date().toLocaleString()}`,
      "Powered by FreeTools.online",
    ].join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `unit-conversion-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Unit Converter - Convert Units Online Free"
      description="Convert between different units instantly. Weight, length, temperature, volume conversions with accurate results."
      icon={<Scale className="h-8 w-8 text-orange-500" />}
      toolCategory="utility-tools"
      howToSteps={[
        {
          name: "Select Conversion Type",
          text: "Choose the type of unit you want to convert (weight, length, temperature, volume)"
        },
        {
          name: "Choose Units",
          text: "Select your source and target units from the dropdown menus"
        },
        {
          name: "Enter Value",
          text: "Input the value you want to convert"
        },
        {
          name: "View Results",
          text: "See the converted result instantly as you type"
        }
      ]}
      faqs={[
        {
          question: "What types of units can I convert?",
          answer: "You can convert weight (kg, lb, g, oz), length (m, ft, cm, in, km, mi), temperature (°C, °F, K), and volume (L, gal, mL, cups) units."
        },
        {
          question: "How accurate are the conversions?",
          answer: "Our conversions use precise conversion factors and are accurate to 6 decimal places for most units."
        },
        {
          question: "Can I swap the from and to units quickly?",
          answer: "Yes, use the swap button (↕) between the unit selectors to quickly reverse the conversion direction."
        },
        {
          question: "Can I download my conversion results?",
          answer: "Yes, you can download your conversion results as a text file for your records."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Utility Tools", path: "/utility-tools" },
        { label: "Unit Converter", path: "/unit-converter" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-4">
        {/* Category Selection */}
        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-medium mb-2">Conversion Type</label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="touch-target">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Unit Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">From</label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="touch-target">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currentCategory.units).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={swapUnits} variant="outline" size="icon" className="mt-6 touch-target">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">To</label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="touch-target">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currentCategory.units).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input and Result */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter Value</label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="0"
                className="touch-target text-lg"
              />
            </div>

            {result && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium mb-2">Result</label>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{result}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {(currentCategory.units[toUnit as keyof typeof currentCategory.units] as any)?.name || toUnit}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CopyButton text={result} />
                      <Button onClick={downloadResult} variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Conversions */}
        {inputValue && result && (
          <Card className="animate-fade-in">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Quick Reference</h3>
              <div className="text-sm text-muted-foreground">
                <p>
                  {inputValue} {(currentCategory.units[fromUnit as keyof typeof currentCategory.units] as any)?.name || fromUnit} = {result}{" "}
                  {(currentCategory.units[toUnit as keyof typeof currentCategory.units] as any)?.name || toUnit}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  )
}
