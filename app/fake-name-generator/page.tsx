"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, RefreshCw, Copy, Download, Globe, Mail, Phone, MapPin } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

interface FakeIdentity {
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  dateOfBirth: string
  age: number
  gender: string
  username: string
  password: string
  ssn: string
  creditCard: string
  company: string
  jobTitle: string
  website: string
}

export default function FakeNameGeneratorPage() {
  const [identity, setIdentity] = useState<FakeIdentity | null>(null)
  const [gender, setGender] = useState("random")
  const [country, setCountry] = useState("US")
  const [generating, setGenerating] = useState(false)

  const firstNames = {
    male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Christopher", "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua"],
    female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle"]
  }

  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"]

  const companies = ["Tech Solutions Inc", "Global Dynamics", "Innovation Labs", "Digital Ventures", "Creative Studios", "Business Partners", "Enterprise Solutions", "Modern Systems", "Advanced Technologies", "Professional Services"]

  const jobTitles = ["Software Engineer", "Marketing Manager", "Sales Representative", "Project Manager", "Data Analyst", "Graphic Designer", "Account Executive", "Operations Manager", "Business Analyst", "Customer Success Manager"]

  const generateRandomDate = () => {
    const start = new Date(1950, 0, 1)
    const end = new Date(2005, 11, 31)
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split('T')[0]
  }

  const generateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const generatePhone = () => {
    const areaCode = Math.floor(Math.random() * 900) + 100
    const exchange = Math.floor(Math.random() * 900) + 100
    const number = Math.floor(Math.random() * 9000) + 1000
    return `(${areaCode}) ${exchange}-${number}`
  }

  const generateSSN = () => {
    const area = Math.floor(Math.random() * 900) + 100
    const group = Math.floor(Math.random() * 90) + 10
    const serial = Math.floor(Math.random() * 9000) + 1000
    return `${area}-${group}-${serial}`
  }

  const generateCreditCard = () => {
    const prefix = "4" // Visa
    let number = prefix
    for (let i = 0; i < 15; i++) {
      number += Math.floor(Math.random() * 10)
    }
    return number.replace(/(.{4})/g, '$1 ').trim()
  }

  const generateUsername = (firstName: string, lastName: string) => {
    const variations = [
      `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}`,
      `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`
    ]
    return variations[Math.floor(Math.random() * variations.length)]
  }

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const generateIdentity = () => {
    setGenerating(true)
    
    setTimeout(() => {
      const selectedGender = gender === "random" ? (Math.random() > 0.5 ? "male" : "female") : gender
      const firstName = firstNames[selectedGender as keyof typeof firstNames][Math.floor(Math.random() * firstNames[selectedGender as keyof typeof firstNames].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const fullName = `${firstName} ${lastName}`
      const dateOfBirth = generateRandomDate()
      const age = generateAge(dateOfBirth)
      const company = companies[Math.floor(Math.random() * companies.length)]
      const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)]

      const newIdentity: FakeIdentity = {
        firstName,
        lastName,
        fullName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: generatePhone(),
        address: `${Math.floor(Math.random() * 9999) + 1} ${["Main St", "Oak Ave", "Pine Rd", "Elm Dr", "Cedar Ln"][Math.floor(Math.random() * 5)]}`,
        city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"][Math.floor(Math.random() * 10)],
        state: ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"][Math.floor(Math.random() * 10)],
        zipCode: String(Math.floor(Math.random() * 90000) + 10000),
        country: country,
        dateOfBirth,
        age,
        gender: selectedGender,
        username: generateUsername(firstName, lastName),
        password: generatePassword(),
        ssn: generateSSN(),
        creditCard: generateCreditCard(),
        company,
        jobTitle,
        website: `www.${company.toLowerCase().replace(/\s+/g, '')}.com`
      }

      setIdentity(newIdentity)
      setGenerating(false)
    }, 500)
  }

  const downloadIdentity = () => {
    if (!identity) return

    const content = [
      "GENERATED FAKE IDENTITY",
      "=".repeat(30),
      "",
      "PERSONAL INFORMATION:",
      `Full Name: ${identity.fullName}`,
      `First Name: ${identity.firstName}`,
      `Last Name: ${identity.lastName}`,
      `Gender: ${identity.gender}`,
      `Date of Birth: ${identity.dateOfBirth}`,
      `Age: ${identity.age}`,
      "",
      "CONTACT INFORMATION:",
      `Email: ${identity.email}`,
      `Phone: ${identity.phone}`,
      "",
      "ADDRESS:",
      `Street: ${identity.address}`,
      `City: ${identity.city}`,
      `State: ${identity.state}`,
      `ZIP Code: ${identity.zipCode}`,
      `Country: ${identity.country}`,
      "",
      "ONLINE ACCOUNTS:",
      `Username: ${identity.username}`,
      `Password: ${identity.password}`,
      "",
      "FINANCIAL (FAKE):",
      `SSN: ${identity.ssn}`,
      `Credit Card: ${identity.creditCard}`,
      "",
      "PROFESSIONAL:",
      `Company: ${identity.company}`,
      `Job Title: ${identity.jobTitle}`,
      `Website: ${identity.website}`,
      "",
      "DISCLAIMER:",
      "This is completely fake data generated for testing purposes only.",
      "Do not use for illegal activities or fraud.",
      "",
      `Generated on: ${new Date().toLocaleString()}`,
      "Powered by FreeTools.online"
    ].join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fake-identity-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Fake Name Generator - Generate Random Names & Identities Free"
      description="Generate fake names, addresses, emails, and complete identities for testing purposes. Perfect for developers, testers, and privacy protection. Free random identity generator."
      icon={<User className="h-8 w-8 text-blue-600" />}
      keywords="fake name generator, random name generator, fake identity generator, test data generator, dummy data, fake person generator"
      toolCategory="utility-tools"
      howToSteps={[
        {
          name: "Choose Options",
          text: "Select gender preference and country for the generated identity"
        },
        {
          name: "Generate Identity",
          text: "Click 'Generate Random Identity' to create a complete fake profile"
        },
        {
          name: "Copy Information",
          text: "Copy individual fields or the entire identity to your clipboard"
        },
        {
          name: "Download Data",
          text: "Download the complete identity as a text file for your records"
        }
      ]}
      faqs={[
        {
          question: "Is this data completely fake?",
          answer: "Yes, all generated data is completely fictional and randomly created. No real personal information is used or stored."
        },
        {
          question: "Can I use this for testing applications?",
          answer: "Absolutely! This tool is perfect for testing forms, databases, and applications that require sample user data."
        },
        {
          question: "Is it legal to use fake names?",
          answer: "Using fake names for testing, privacy, or legitimate purposes is generally legal. However, using fake identities for fraud or illegal activities is prohibited."
        },
        {
          question: "Do you store the generated data?",
          answer: "No, all data is generated locally in your browser and is not stored on our servers."
        }
      ]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Utility Tools", path: "/utility-tools" },
        { label: "Fake Name Generator", path: "/fake-name-generator" }
      ]}
      lastUpdated="2024-01-15"
      estimatedTime="PT1M"
    >
      <div className="space-y-6">
        {/* Generator Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Identity Generator Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Gender</label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={generateIdentity} 
              disabled={generating}
              className="w-full"
              size="lg"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Generate Random Identity
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Identity */}
        {identity && (
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </span>
                  <div className="flex gap-2">
                    <Button onClick={downloadIdentity} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={generateIdentity} variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate New
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{identity.fullName}</p>
                      </div>
                      <CopyButton text={identity.fullName} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">First Name</p>
                        <p className="font-medium">{identity.firstName}</p>
                      </div>
                      <CopyButton text={identity.firstName} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Last Name</p>
                        <p className="font-medium">{identity.lastName}</p>
                      </div>
                      <CopyButton text={identity.lastName} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium capitalize">{identity.gender}</p>
                      </div>
                      <CopyButton text={identity.gender} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{identity.dateOfBirth}</p>
                      </div>
                      <CopyButton text={identity.dateOfBirth} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Age</p>
                        <p className="font-medium">{identity.age} years old</p>
                      </div>
                      <CopyButton text={identity.age.toString()} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">SSN (Fake)</p>
                        <p className="font-medium font-mono">{identity.ssn}</p>
                      </div>
                      <CopyButton text={identity.ssn} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Credit Card (Fake)</p>
                        <p className="font-medium font-mono">{identity.creditCard}</p>
                      </div>
                      <CopyButton text={identity.creditCard} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{identity.email}</p>
                    </div>
                    <CopyButton text={identity.email} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{identity.phone}</p>
                    </div>
                    <CopyButton text={identity.phone} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Street Address</p>
                        <p className="font-medium">{identity.address}</p>
                      </div>
                      <CopyButton text={identity.address} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">City</p>
                        <p className="font-medium">{identity.city}</p>
                      </div>
                      <CopyButton text={identity.city} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">State</p>
                        <p className="font-medium">{identity.state}</p>
                      </div>
                      <CopyButton text={identity.state} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">ZIP Code</p>
                        <p className="font-medium">{identity.zipCode}</p>
                      </div>
                      <CopyButton text={identity.zipCode} />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Address</p>
                      <p className="font-medium">{identity.address}, {identity.city}, {identity.state} {identity.zipCode}</p>
                    </div>
                    <CopyButton text={`${identity.address}, ${identity.city}, ${identity.state} ${identity.zipCode}`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Online Accounts & Professional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Username</p>
                        <p className="font-medium">{identity.username}</p>
                      </div>
                      <CopyButton text={identity.username} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Password</p>
                        <p className="font-medium font-mono">{identity.password}</p>
                      </div>
                      <CopyButton text={identity.password} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="font-medium">{identity.company}</p>
                      </div>
                      <CopyButton text={identity.company} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Job Title</p>
                        <p className="font-medium">{identity.jobTitle}</p>
                      </div>
                      <CopyButton text={identity.jobTitle} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="font-medium">{identity.website}</p>
                      </div>
                      <CopyButton text={identity.website} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SEO Content */}
        <div className="prose max-w-none mt-12 bg-muted/30 rounded-2xl p-8">
          <h2>🎭 Free Fake Name Generator 2024</h2>
          <p>
            Generate realistic fake names and complete identities for testing, privacy, and development purposes. 
            Our tool creates comprehensive fake profiles with names, addresses, contact information, and more.
          </p>

          <h3>🎯 Common Use Cases</h3>
          <ul>
            <li><strong>Software Testing:</strong> Generate test data for applications and databases</li>
            <li><strong>Privacy Protection:</strong> Use fake names for online accounts and services</li>
            <li><strong>Creative Writing:</strong> Create character names and backgrounds for stories</li>
            <li><strong>Form Testing:</strong> Test website forms and user registration systems</li>
            <li><strong>Database Population:</strong> Fill databases with sample user data</li>
            <li><strong>Demo Purposes:</strong> Create realistic demo accounts and profiles</li>
          </ul>

          <h3>🔒 Privacy & Security</h3>
          <p>
            All generated data is completely fictional and created randomly. We don't store any generated information, 
            and all processing happens locally in your browser for maximum privacy and security.
          </p>

          <h3>⚖️ Legal Disclaimer</h3>
          <p>
            This tool is intended for legitimate purposes only. Using fake identities for fraud, identity theft, 
            or other illegal activities is strictly prohibited and may be punishable by law. Always use generated 
            data responsibly and in accordance with applicable laws and terms of service.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}