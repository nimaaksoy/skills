"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search skills..." }: Props) {
  return (
    <div className="relative flex items-center">
      <Search
        size={14}
        className="pointer-events-none absolute left-3 text-ink-3"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focus-ring w-full rounded-2 border border-line bg-surface py-2 pl-9 pr-9 text-sm text-ink placeholder:text-ink-4"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 flex h-6 w-6 items-center justify-center text-ink-3 hover:text-ink"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
