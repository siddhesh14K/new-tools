"use client";

import { useState, useEffect } from "react";

interface ToolAuditProps {
  toolName: string;
  description: string;
  keywords: string[];
}

interface AuditResult {
  issue: string;
  recommendation: string;
  priority: "High" | "Medium" | "Low";
}

const priorityConfig = {
  High: {
    className: "border-red-500 bg-red-50",
    label: "High Priority",
  },
  Medium: {
    className: "border-yellow-500 bg-yellow-50",
    label: "Medium Priority",
  },
  Low: {
    className: "border-blue-500 bg-blue-50",
    label: "Low Priority",
  },
};

export function ToolAudit({ toolName, description, keywords }: ToolAuditProps) {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);

  useEffect(() => {
    const results: AuditResult[] = [];

    // Check 1: Description Length
    if (description.length < 70) {
      results.push({
        issue: "Description Too Short",
        recommendation: `The description is ${description.length} characters. It should be at least 70 characters to be effective for SEO.`,
        priority: "Medium",
      });
    } else if (description.length > 160) {
      results.push({
        issue: "Description Too Long",
        recommendation: `The description is ${description.length} characters. It should be under 160 characters to avoid being truncated in search results.`,
        priority: "Medium",
      });
    }

    // Check 2: Keyword Count
    if (keywords.length < 5) {
      results.push({
        issue: "Insufficient Keywords",
        recommendation: `Only ${keywords.length} keywords found. Add at least 5 relevant keywords to improve search visibility.`,
        priority: "Medium",
      });
    }

    // Check 3: Tool Name in Keywords
    if (!keywords.map(k => k.toLowerCase()).includes(toolName.toLowerCase())) {
      results.push({
        issue: "Tool Name Missing from Keywords",
        recommendation: "Include the tool's name in the keywords to improve its relevance for direct searches.",
        priority: "High",
      });
    }

    setAuditResults(results);
  }, [toolName, description, keywords]);

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h3 className="text-xl font-bold text-gray-800">Tool Health & SEO Audit</h3>
      <p className="text-sm text-gray-500 mb-4">Automated checks for performance, SEO, and best practices.</p>
      {auditResults.length > 0 ? (
        <ul className="space-y-3">
          {auditResults.map((result, index) => {
            const config = priorityConfig[result.priority];
            return (
              <li key={index} className={`p-4 border-l-4 rounded-r-lg ${config.className}`}>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">{result.issue}</p>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700">{config.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{result.recommendation}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center p-6 rounded-lg bg-green-50 border border-green-200">
          <p className="font-semibold text-green-800">🎉 All checks passed!</p>
          <p className="text-sm text-green-700">No major SEO or health issues found. Great job!</p>
        </div>
      )}
    </div>
  );
}
