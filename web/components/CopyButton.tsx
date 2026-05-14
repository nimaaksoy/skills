"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = "Copy SKILL.md", className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Silent. Some browsers may block clipboard in insecure contexts.
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-2 bg-ink px-4 py-2.5 text-sm font-medium text-accent-ink transition-colors duration-120 ease-out hover:bg-accent-hover ${className}`}
    >
      {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.5} />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}
