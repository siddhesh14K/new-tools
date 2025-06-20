"use client";

import { HowToSchema } from "./how-to-schema";
import JsonLdSchema from "./json-ld-schema";
import { memo } from "react";
import { EnhancedBreadcrumb } from "./enhanced-breadcrumb";

interface EnhancedSchemaProps {
  schema: object;
  howTo?: any;
  breadcrumbs?: any;
}

function EnhancedSchemaComponent({ schema, howTo, breadcrumbs }: EnhancedSchemaProps) {
  return (
    <>
      <JsonLdSchema schema={schema} />
      {howTo && <HowToSchema {...howTo} />}
      {breadcrumbs && <EnhancedBreadcrumb items={breadcrumbs} />}
    </>
  );
}

export const EnhancedSchema = memo(EnhancedSchemaComponent);
