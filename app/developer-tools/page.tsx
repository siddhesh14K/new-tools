import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, FileText, Hash, Key, Braces, Database } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { ToolLayout } from "@/components/tool-layout";

export const metadata: Metadata = {
  title: "Free Developer Tools Online 2024 - JSON, Base64, Hash Generator | FreeTools.online",
  description:
    "🔧 Best free developer tools online! JSON formatter, Base64 encoder, hash generator, and more. No registration, works on mobile, completely free.",
  keywords:
    "free developer tools, JSON formatter online, Base64 encoder, hash generator, developer utilities, coding tools, programming tools",
};

const developerTools = [
  {
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data instantly",
    icon: Braces,
    href: "/json-formatter",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    features: ["Format JSON", "Validate syntax", "Minify/Beautify", "Error detection"],
    popular: true,
    available: true,
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings securely",
    icon: Code,
    href: "/base64-encoder",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    features: ["Encode/Decode", "File support", "URL safe", "Batch processing"],
    popular: true,
    available: true,
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes for text and files",
    icon: Hash,
    href: "/hash-generator",
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
    features: ["Multiple algorithms", "File hashing", "Secure generation", "Compare hashes"],
    popular: true,
    available: true,
  },
  {
    name: "URL Encoder",
    description: "Encode and decode URLs for web development",
    icon: Key,
    href: "/url-encoder",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    available: false,
  },
  {
    name: "HTML Validator",
    description: "Validate HTML markup and find errors",
    icon: FileText,
    href: "/html-validator",
    color: "text-green-500",
    bgColor: "bg-green-50",
    available: false,
  },
  {
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    icon: Database,
    href: "/sql-formatter",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    available: false,
  },
];

export default function DeveloperToolsPage() {
  return (
    <ToolLayout
      title="Free Developer Tools Online 2024"
      description="Essential developer tools for coding, debugging, and web development. JSON formatter, Base64 encoder, hash generator, and more."
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Developer Tools", href: "/developer-tools" },
          ]}
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🔧 Free Developer Tools Online 2024</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Essential developer tools for coding, debugging, and web development. Format JSON, encode Base64, generate
            hashes, and more - all in your browser!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {developerTools.map((tool) => (
            <Card
              key={tool.href}
              className={`h-full transition-all duration-200 relative ${
                tool.available ? "hover:shadow-lg cursor-pointer" : "opacity-60"
              }`}
            >
              {tool.popular && tool.available && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  🔥 POPULAR
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`bg-background border rounded-lg p-3 ${tool.bgColor}`}>
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {tool.name}
                      {!tool.available && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      )}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(tool.features) && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tool.available ? (
                    <Link href={tool.href}>
                      <Button className="w-full">Use Tool</Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
