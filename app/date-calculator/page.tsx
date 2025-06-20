"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [result, setResult] = useState<{
    days: number
    weeks: number
    months: number
    years: number
    totalHours: number
    totalMinutes: number
  } | null>(null)
  const [error, setError] = useState("")

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates")
      setResult(null)
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Please enter valid dates")
      setResult(null)
      return
    }

    if (start > end) {
      setError("Start date must be before end date")
      setResult(null)
      return
    }

    const diffTime = Math.abs(end.getTime() - start.getTime())
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30.44) // Average days per month
    const years = Math.floor(days / 365.25) // Account for leap years
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60))
    const totalMinutes = Math.floor(diffTime / (1000 * 60))

    setResult({
      days,
      weeks,
      months,
      years,
      totalHours,
      totalMinutes,
    })
    setError("")
  }

  const setToday = (field: "start" | "end") => {
    const today = new Date().toISOString().split("T")[0]
    if (field === "start") {
      setStartDate(today)
    } else {
      setEndDate(today)
    }
  }

  // Add download function
  const downloadResult = () => {
    if (!result) return

    const content = [
      "DATE CALCULATION RESULT",
      "=".repeat(25),
      "",
      `Start Date: ${startDate}`,
      `End Date: ${endDate}`,
      "",
      "TIME DIFFERENCE:",
      `• Days: ${result.days}`,
      `• Weeks: ${result.weeks}`,
      `• Months: ${result.months}`,
      `• Years: ${result.years}`,
      "",
      "DETAILED BREAKDOWN:",
      `• Total hours: ${result.totalHours.toLocaleString()}`,
      `• Total minutes: ${result.totalMinutes.toLocaleString()}`,
      `• Weeks + remaining days: ${result.weeks} weeks, ${result.days % 7} days`,
      "",
      `Calculation performed on: ${new Date().toLocaleString()}`,
      "Powered by FreeTools.online",
    ].join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `date-calculation-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Date Calculator - Calculate Date Difference Online Free"
      description="Calculate the exact difference between two dates in days, weeks, months, and years. Perfect for project planning and age calculations."
      icon={<Calendar className="h-8 w-8 text-purple-500" />}
      toolCategory="utility-tools"
      howToSteps={[
        {
          name: "Select Start Date",
          text: "Choose or enter your start date using the date picker"
        },
        {
          name: "Select End Date", 
          text: "Choose or enter your end date using the date picker"
        },
        {
          name: "Calculate Difference",
          text: "Click 'Calculate Difference' to see the time between dates"
        },
        {
          name: "View Results",
          text: "See results in days, weeks, months, years, hours, and minutes"
        }
      ]}
      faqs={[
        {
          question: "How accurate are the calculations?",
          answer: "Our calculations are precise to the day. Months are calculated using an average of 30.44 days, and years account for leap years (365.25 days average)."
        },
        {
          question: "Can I calculate past dates?",
          answer: "Yes, you can calculate the difference between any two dates, whether they're in the past, present, or future."
        },
        {
          question: "What if I enter the dates in wrong order?",
          answer: "The tool will show an error if the start date is after the end date. Simply swap the dates to get the correct calculation."
        },
        {
          question: "Can I download the results?",
          answer: "Yes, you can download a detailed breakdown of the calculation results as a text file for your records."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Utility Tools", path: "/utility-tools" },
        { label: "Date Calculator", path: "/date-calculator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-4">
        {/* Date Inputs */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Start Date</label>
                <Button onClick={() => setToday("start")} variant="outline" size="sm" className="text-xs">
                  Today
                </Button>
              </div>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="touch-target"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">End Date</label>
                <Button onClick={() => setToday("end")} variant="outline" size="sm" className="text-xs">
                  Today
                </Button>
              </div>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="touch-target"
              />
            </div>
          </CardContent>
        </Card>

        {/* Calculate Button */}
        <Button onClick={calculateDifference} className="w-full touch-target">
          Calculate Difference
        </Button>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-3 animate-fade-in">
            <h3 className="font-semibold text-lg">Time Difference</h3>

            {/* Main Results */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Days</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-purple-500">{result.days}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Weeks</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-blue-500">{result.weeks}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Months</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-green-500">{result.months}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Years</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-orange-500">{result.years}</div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Details */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Detailed Breakdown</h4>
                  <Button onClick={downloadResult} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• Total hours: {result.totalHours.toLocaleString()}</p>
                  <p>• Total minutes: {result.totalMinutes.toLocaleString()}</p>
                  <p>• Exact days: {result.days}</p>
                  <p>
                    • Weeks + remaining days: {result.weeks} weeks, {result.days % 7} days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
