import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    "PDF Tools": [
      { name: "PDF Compressor", href: "/pdf-compressor" },
      { name: "PDF Merger", href: "/pdf-merger" },
      { name: "PDF Splitter", href: "/pdf-splitter" },
      { name: "PDF to Word", href: "/pdf-to-word" },
    ],
    "Image Tools": [
      { name: "Image Compressor", href: "/image-compressor" },
      { name: "Image Resizer", href: "/image-resizer" },
      { name: "Image Converter", href: "/image-converter" },
      { name: "Background Remover", href: "/background-remover" },
    ],
    "Text Tools": [
      { name: "Word Counter", href: "/word-counter" },
      { name: "Case Converter", href: "/case-converter" },
      { name: "Text Formatter", href: "/text-formatter" },
      { name: "Lorem Generator", href: "/lorem-generator" },
    ],
    "Other Tools": [
      { name: "QR Code Generator", href: "/qr-generator" },
      { name: "Password Generator", href: "/password-generator" },
      { name: "Color Picker", href: "/color-picker" },
      { name: "Hash Generator", href: "/hash-generator" },
    ],
  }

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">FT</span>
              </div>
              <span className="font-semibold">FreeTools.online</span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
              <span>© {currentYear} FreeTools.online. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
