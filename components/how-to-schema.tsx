"use client";

import JsonLdSchema from "./json-ld-schema";
import { memo } from "react";

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: { name: string }[];
  tool?: { name: string }[];
  step: HowToStep[];
}

function HowToSchemaComponent({
  name,
  description,
  totalTime,
  estimatedCost,
  supply,
  tool,
  step,
}: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    estimatedCost,
    supply,
    tool,
    step: step.map((s, index) => ({
      "@type": "HowToStep",
      ...s,
      url: s.url || undefined,
      image: s.image || undefined,
    })),
  };

  return <JsonLdSchema schema={schema} />;
}

export const HowToSchema = memo(HowToSchemaComponent);
