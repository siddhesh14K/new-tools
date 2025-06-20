"use client";

import { memo } from "react";

interface JsonLdSchemaProps {
  schema: object;
}

function JsonLdSchema({ schema }: JsonLdSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default memo(JsonLdSchema);
