"use client"

import { useState, useCallback } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/copy-button"
import { Lock, RefreshCw, Shield, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  })
  const [showPassword, setShowPassword] = useState(true)
  const [strength, setStrength] = useState({ score: 0, text: "", color: "" })

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    const similar = "il1Lo0O"
    const ambiguous = "{}[]()/\\'\"`~,;.<>"

    let charset = ""
    if (options.uppercase) charset += uppercase
    if (options.lowercase) charset += lowercase
    if (options.numbers) charset += numbers
    if (options.symbols) charset += symbols

    if (options.excludeSimilar) {
      charset = charset
        .split("")
        .filter((char) => !similar.includes(char))
        .join("")
    }

    if (options.excludeAmbiguous) {
      charset = charset
        .split("")
        .filter((char) => !ambiguous.includes(char))
        .join("")
    }

    if (!charset) {
      setPassword("")
      return
    }

    let result = ""
    const array = new Uint8Array(length[0])
    crypto.getRandomValues(array)

    for (let i = 0; i < length[0]; i++) {
      result += charset[array[i] % charset.length]
    }

    setPassword(result)
    calculateStrength(result)
  }, [length, options])

  const calculateStrength = (pwd: string) => {
    let score = 0
    const feedback = []

    // Length check
    if (pwd.length >= 12) score += 25
    else if (pwd.length >= 8) score += 15
    else feedback.push("Use at least 8 characters")

    // Character variety
    if (/[a-z]/.test(pwd)) score += 15
    else feedback.push("Add lowercase letters")

    if (/[A-Z]/.test(pwd)) score += 15
    else feedback.push("Add uppercase letters")

    if (/[0-9]/.test(pwd)) score += 15
    else feedback.push("Add numbers")

    if (/[^A-Za-z0-9]/.test(pwd)) score += 20
    else feedback.push("Add symbols")

    // Bonus for length
    if (pwd.length >= 16) score += 10

    let text = ""
    let color = ""

    if (score >= 80) {
      text = "Very Strong"
      color = "text-green-600"
    } else if (score >= 60) {
      text = "Strong"
      color = "text-blue-600"
    } else if (score >= 40) {
      text = "Medium"
      color = "text-yellow-600"
    } else if (score >= 20) {
      text = "Weak"
      color = "text-orange-600"
    } else {
      text = "Very Weak"
      color = "text-red-600"
    }

    setStrength({ score, text, color })
  }

  const handleOptionChange = (option: string, checked: boolean) => {
    setOptions((prev) => ({ ...prev, [option]: checked }))
  }

  // Generate initial password
  useState(() => {
    generatePassword()
  })

  return (
    <ToolLayout
      title="Secure Password Generator - Create Strong Passwords Online Free"
      description="Generate strong, secure passwords with customizable options. Create unbreakable passwords for your accounts with advanced security features."
      icon={<Lock className="h-8 w-8 text-red-500" />}
      toolCategory="security-tools"
      howToSteps={[
        {
          name: "Set Password Length",
          text: "Choose your desired password length (8-128 characters)"
        },
        {
          name: "Select Character Types",
          text: "Choose which character types to include: uppercase, lowercase, numbers, symbols"
        },
        {
          name: "Generate Password",
          text: "Click 'Generate Password' to create a secure password"
        },
        {
          name: "Copy and Use",
          text: "Copy the generated password and use it for your accounts"
        }
      ]}
      faqs={[
        {
          question: "How long should my password be?",
          answer: "We recommend at least 12-16 characters for strong security. Longer passwords are exponentially harder to crack."
        },
        {
          question: "Should I include symbols in my password?",
          answer: "Yes, including symbols significantly increases password strength by expanding the character set that attackers must consider."
        },
        {
          question: "How often should I change my passwords?",
          answer: "Change passwords immediately if there's a security breach, otherwise every 3-6 months for important accounts."
        },
        {
          question: "Is it safe to generate passwords online?",
          answer: "Yes, our password generator works entirely in your browser. Passwords are generated locally and never sent to our servers."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Security Tools", path: "/security-tools" },
        { label: "Password Generator", path: "/password-generator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-6">
        {/* Generated Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated Password
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={generatePassword}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={password}
                  readOnly
                  type={showPassword ? "text" : "password"}
                  className="font-mono text-lg pr-20"
                  placeholder="Click generate to create password"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CopyButton text={password} />
                </div>
              </div>

              {password && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className={`h-4 w-4 ${strength.color}`} />
                    <span className={`font-semibold ${strength.color}`}>{strength.text}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Length: {password.length}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Password Options */}
        <Card>
          <CardHeader>
            <CardTitle>Password Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Length Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Password Length</label>
                <span className="text-sm text-muted-foreground">{length[0]} characters</span>
              </div>
              <Slider value={length} onValueChange={setLength} max={128} min={4} step={1} className="w-full" />
            </div>

            {/* Character Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={options.uppercase}
                  onCheckedChange={(checked) => handleOptionChange("uppercase", checked as boolean)}
                />
                <label htmlFor="uppercase" className="text-sm font-medium">
                  Uppercase Letters (A-Z)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={options.lowercase}
                  onCheckedChange={(checked) => handleOptionChange("lowercase", checked as boolean)}
                />
                <label htmlFor="lowercase" className="text-sm font-medium">
                  Lowercase Letters (a-z)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={options.numbers}
                  onCheckedChange={(checked) => handleOptionChange("numbers", checked as boolean)}
                />
                <label htmlFor="numbers" className="text-sm font-medium">
                  Numbers (0-9)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={options.symbols}
                  onCheckedChange={(checked) => handleOptionChange("symbols", checked as boolean)}
                />
                <label htmlFor="symbols" className="text-sm font-medium">
                  Symbols (!@#$%^&*)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="excludeSimilar"
                  checked={options.excludeSimilar}
                  onCheckedChange={(checked) => handleOptionChange("excludeSimilar", checked as boolean)}
                />
                <label htmlFor="excludeSimilar" className="text-sm font-medium">
                  Exclude Similar (il1Lo0O)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="excludeAmbiguous"
                  checked={options.excludeAmbiguous}
                  onCheckedChange={(checked) => handleOptionChange("excludeAmbiguous", checked as boolean)}
                />
                <label htmlFor="excludeAmbiguous" className="text-sm font-medium">
                  Exclude Ambiguous ({"{}[]()"})
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button onClick={generatePassword} size="lg" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate New Password
        </Button>

        {/* Security Tips */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Tips:</strong> Use unique passwords for each account, enable two-factor authentication, and
            consider using a password manager to store your passwords securely.
          </AlertDescription>
        </Alert>

        {/* SEO Content */}
        <div className="prose max-w-none mt-12">
          <h2>How to Create Strong Passwords</h2>
          <p>
            A strong password is your first line of defense against cyber attacks. Our password generator creates
            cryptographically secure passwords that are virtually impossible to crack.
          </p>

          <h3>Password Security Best Practices</h3>
          <ul>
            <li>
              <strong>Use at least 12 characters:</strong> Longer passwords are exponentially harder to crack
            </li>
            <li>
              <strong>Include mixed characters:</strong> Combine uppercase, lowercase, numbers, and symbols
            </li>
            <li>
              <strong>Avoid personal information:</strong> Don't use names, birthdays, or common words
            </li>
            <li>
              <strong>Use unique passwords:</strong> Never reuse passwords across multiple accounts
            </li>
            <li>
              <strong>Enable 2FA:</strong> Add an extra layer of security with two-factor authentication
            </li>
          </ul>

          <h3>Why Use Our Password Generator?</h3>
          <ul>
            <li>✅ Cryptographically secure random generation</li>
            <li>✅ Customizable length and character sets</li>
            <li>✅ Real-time password strength analysis</li>
            <li>✅ No data stored or transmitted</li>
            <li>✅ Works offline in your browser</li>
            <li>✅ Mobile-friendly interface</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
