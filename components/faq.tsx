import React from 'react'

interface FAQProps {
  category: string
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQ({ category, questions }: FAQProps) {
  return (
    <>
      <div className="space-y-4 mt-8">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {questions.map((faq, index) => (
            <div key={index} className="p-4 rounded-lg bg-card">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": questions.map(q => ({
              "@type": "Question",
              "name": q.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
          })
        }}
      />
    </>
  )
}
