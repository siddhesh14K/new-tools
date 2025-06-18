import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Are these tools completely free to use?",
    answer:
      "Yes, all our tools are 100% free to use. There are no hidden charges, subscription fees, or premium features. We believe everyone should have access to essential online tools.",
  },
  {
    question: "Do I need to create an account or register?",
    answer:
      "No registration required! All tools work instantly without creating an account. Simply visit the tool page and start using it immediately.",
  },
  {
    question: "Are my files safe and secure?",
    answer:
      "Absolutely. All file processing happens directly in your browser. Your files never get uploaded to our servers, ensuring complete privacy and security.",
  },
  {
    question: "Do these tools work on mobile devices?",
    answer:
      "Yes! All our tools are designed with mobile-first approach and work perfectly on smartphones and tablets. The interface is optimized for touch interactions.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "File size limits depend on your device's memory and browser capabilities. Most tools can handle files up to 100MB efficiently on modern devices.",
  },
  {
    question: "Can I use these tools offline?",
    answer:
      "Once a tool page is loaded, most functionality works offline since processing happens in your browser. However, you need an internet connection to initially load the tool.",
  },
  {
    question: "How do you make money if tools are free?",
    answer:
      "We display non-intrusive advertisements to cover our hosting and development costs. This allows us to keep all tools completely free for users.",
  },
  {
    question: "Can I suggest new tools or features?",
    answer:
      "We love hearing from our users. Contact us with your suggestions and we'll consider adding new tools based on user demand.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

export function FAQSection() {
  return (
    <section className="py-16" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
