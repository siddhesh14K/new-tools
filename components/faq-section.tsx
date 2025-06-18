import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FAQSection() {
  const faqs = [
    {
      question: "Are all tools completely free?",
      answer: "Yes! All our tools are 100% free with no hidden costs, no registration required, and no limitations.",
    },
    {
      question: "Is my data safe and private?",
      answer: "All processing happens locally in your browser. Your files never leave your device.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No registration required! You can start using any tool immediately without creating an account.",
    },
    {
      question: "Are there any file size limits?",
      answer:
        "Most tools have no file size limits. For very large files, processing may take longer but will still work.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
