"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Download } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

export default function PercentageCalculatorPage() {
  const [calculations, setCalculations] = useState({
    // What is X% of Y?
    percentOf: { percent: "", number: "", result: "" },
    // X is what percent of Y?
    whatPercent: { part: "", whole: "", result: "" },
    // What is the percentage increase/decrease from X to Y?
    percentChange: { original: "", new: "", result: "", type: "" },
    // Add X% to Y
    addPercent: { percent: "", number: "", result: "" },
    // Subtract X% from Y
    subtractPercent: { percent: "", number: "", result: "" },
  })

  const calculatePercentOf = (percent: string, number: string) => {
    if (!percent || !number) return ""
    const p = Number.parseFloat(percent)
    const n = Number.parseFloat(number)
    if (isNaN(p) || isNaN(n)) return ""
    return ((p / 100) * n).toFixed(2)
  }

  const calculateWhatPercent = (part: string, whole: string) => {
    if (!part || !whole) return ""
    const p = Number.parseFloat(part)
    const w = Number.parseFloat(whole)
    if (isNaN(p) || isNaN(w) || w === 0) return ""
    return ((p / w) * 100).toFixed(2)
  }

  const calculatePercentChange = (original: string, newValue: string) => {
    if (!original || !newValue) return { result: "", type: "" }
    const o = Number.parseFloat(original)
    const n = Number.parseFloat(newValue)
    if (isNaN(o) || isNaN(n) || o === 0) return { result: "", type: "" }

    const change = ((n - o) / o) * 100
    const type = change >= 0 ? "increase" : "decrease"
    return { result: Math.abs(change).toFixed(2), type }
  }

  const calculateAddPercent = (percent: string, number: string) => {
    if (!percent || !number) return ""
    const p = Number.parseFloat(percent)
    const n = Number.parseFloat(number)
    if (isNaN(p) || isNaN(n)) return ""
    return (n + (n * p) / 100).toFixed(2)
  }

  const calculateSubtractPercent = (percent: string, number: string) => {
    if (!percent || !number) return ""
    const p = Number.parseFloat(percent)
    const n = Number.parseFloat(number)
    if (isNaN(p) || isNaN(n)) return ""
    return (n - (n * p) / 100).toFixed(2)
  }

  const updateCalculation = (type: string, field: string, value: string) => {
    setCalculations((prev) => {
      const updated = { ...prev }
      const currentCalc = updated[type as keyof typeof calculations] as any
      updated[type as keyof typeof calculations] = {
        ...currentCalc,
        [field]: value,
      } as any

      // Recalculate based on type
      switch (type) {
        case "percentOf":
          updated.percentOf.result = calculatePercentOf(updated.percentOf.percent, updated.percentOf.number)
          break
        case "whatPercent":
          updated.whatPercent.result = calculateWhatPercent(updated.whatPercent.part, updated.whatPercent.whole)
          break
        case "percentChange":
          const change = calculatePercentChange(updated.percentChange.original, updated.percentChange.new)
          updated.percentChange.result = change.result
          updated.percentChange.type = change.type
          break
        case "addPercent":
          updated.addPercent.result = calculateAddPercent(updated.addPercent.percent, updated.addPercent.number)
          break
        case "subtractPercent":
          updated.subtractPercent.result = calculateSubtractPercent(
            updated.subtractPercent.percent,
            updated.subtractPercent.number,
          )
          break
      }

      return updated
    })
  }

  const downloadResults = () => {
    const results = [
      "PERCENTAGE CALCULATOR RESULTS",
      "=".repeat(35),
      "",
      `1. What is ${calculations.percentOf.percent}% of ${calculations.percentOf.number}?`,
      `   Answer: ${calculations.percentOf.result || "N/A"}`,
      "",
      `2. ${calculations.whatPercent.part} is what percent of ${calculations.whatPercent.whole}?`,
      `   Answer: ${calculations.whatPercent.result || "N/A"}%`,
      "",
      `3. Percentage change from ${calculations.percentChange.original} to ${calculations.percentChange.new}:`,
      `   Answer: ${calculations.percentChange.result || "N/A"}% ${calculations.percentChange.type || ""}`,
      "",
      `4. Add ${calculations.addPercent.percent}% to ${calculations.addPercent.number}:`,
      `   Answer: ${calculations.addPercent.result || "N/A"}`,
      "",
      `5. Subtract ${calculations.subtractPercent.percent}% from ${calculations.subtractPercent.number}:`,
      `   Answer: ${calculations.subtractPercent.result || "N/A"}`,
      "",
      `Generated on: ${new Date().toLocaleString()}`,
      "Powered by FreeTools.online",
    ].join("\n")

    const blob = new Blob([results], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `percentage-calculations-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Percentage Calculator - Calculate Percentages Online Free"
      description="Calculate percentages, percentage increase/decrease, discounts, tips, and more. Fast and accurate percentage calculations for all your needs."
      icon={<Calculator className="h-8 w-8 text-rose-500" />}
      toolCategory="utility-tools"
      howToSteps={[
        {
          name: "Choose Calculation Type",
          text: "Select the type of percentage calculation you need"
        },
        {
          name: "Enter Values",
          text: "Input the numbers for your calculation"
        },
        {
          name: "View Results",
          text: "Results are calculated automatically as you type"
        },
        {
          name: "Copy or Download",
          text: "Copy individual results or download all calculations"
        }
      ]}
      faqs={[
        {
          question: "How do I calculate what percentage one number is of another?",
          answer: "Use the 'X is what percent of Y?' calculator. Enter the part (X) and the whole (Y), and the result will show the percentage."
        },
        {
          question: "How do I calculate percentage increase or decrease?",
          answer: "Use the 'Percentage Increase/Decrease' calculator. Enter the original value and new value to see the percentage change."
        },
        {
          question: "How do I add or subtract a percentage from a number?",
          answer: "Use the 'Add X% to Y' or 'Subtract X% from Y' calculators. These are useful for calculating tips, discounts, or tax."
        },
        {
          question: "Can I download my calculation results?",
          answer: "Yes, you can download all your percentage calculations as a text file for your records."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Utility Tools", path: "/utility-tools" },
        { label: "Percentage Calculator", path: "/percentage-calculator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT2M"
    >
      <div className="space-y-6">
        {/* What is X% of Y? */}
        <Card>
          <CardHeader>
            <CardTitle>What is X% of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Percentage (%)</label>
                <Input
                  type="number"
                  placeholder="25"
                  value={calculations.percentOf.percent}
                  onChange={(e) => updateCalculation("percentOf", "percent", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Of Number</label>
                <Input
                  type="number"
                  placeholder="200"
                  value={calculations.percentOf.number}
                  onChange={(e) => updateCalculation("percentOf", "number", e.target.value)}
                />
              </div>
            </div>
            {calculations.percentOf.result && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Result:</p>
                    <p className="text-2xl font-bold text-primary">{calculations.percentOf.result}</p>
                  </div>
                  <CopyButton text={calculations.percentOf.result} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* X is what percent of Y? */}
        <Card>
          <CardHeader>
            <CardTitle>X is what percent of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Part (X)</label>
                <Input
                  type="number"
                  placeholder="50"
                  value={calculations.whatPercent.part}
                  onChange={(e) => updateCalculation("whatPercent", "part", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Whole (Y)</label>
                <Input
                  type="number"
                  placeholder="200"
                  value={calculations.whatPercent.whole}
                  onChange={(e) => updateCalculation("whatPercent", "whole", e.target.value)}
                />
              </div>
            </div>
            {calculations.whatPercent.result && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Result:</p>
                    <p className="text-2xl font-bold text-green-600">{calculations.whatPercent.result}%</p>
                  </div>
                  <CopyButton text={`${calculations.whatPercent.result}%`} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Percentage Change */}
        <Card>
          <CardHeader>
            <CardTitle>Percentage Increase/Decrease</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Original Value</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={calculations.percentChange.original}
                  onChange={(e) => updateCalculation("percentChange", "original", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">New Value</label>
                <Input
                  type="number"
                  placeholder="120"
                  value={calculations.percentChange.new}
                  onChange={(e) => updateCalculation("percentChange", "new", e.target.value)}
                />
              </div>
            </div>
            {calculations.percentChange.result && (
              <div
                className={`p-4 rounded-lg ${
                  calculations.percentChange.type === "increase" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Percentage {calculations.percentChange.type}:</p>
                    <p
                      className={`text-2xl font-bold ${
                        calculations.percentChange.type === "increase" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {calculations.percentChange.result}%
                    </p>
                  </div>
                  <CopyButton text={`${calculations.percentChange.result}%`} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Subtract Percentage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add X% to Y</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Percentage to Add (%)</label>
                <Input
                  type="number"
                  placeholder="15"
                  value={calculations.addPercent.percent}
                  onChange={(e) => updateCalculation("addPercent", "percent", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Original Number</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={calculations.addPercent.number}
                  onChange={(e) => updateCalculation("addPercent", "number", e.target.value)}
                />
              </div>
              {calculations.addPercent.result && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Result:</p>
                      <p className="text-xl font-bold text-blue-600">{calculations.addPercent.result}</p>
                    </div>
                    <CopyButton text={calculations.addPercent.result} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subtract X% from Y</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Percentage to Subtract (%)</label>
                <Input
                  type="number"
                  placeholder="20"
                  value={calculations.subtractPercent.percent}
                  onChange={(e) => updateCalculation("subtractPercent", "percent", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Original Number</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={calculations.subtractPercent.number}
                  onChange={(e) => updateCalculation("subtractPercent", "number", e.target.value)}
                />
              </div>
              {calculations.subtractPercent.result && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Result:</p>
                      <p className="text-xl font-bold text-orange-600">{calculations.subtractPercent.result}</p>
                    </div>
                    <CopyButton text={calculations.subtractPercent.result} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Download Results */}
        <Card>
          <CardContent className="p-6">
            <Button onClick={downloadResults} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download All Results
            </Button>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}
