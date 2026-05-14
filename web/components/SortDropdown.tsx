"use client";

import { ArrowUpDown } from "lucide-react";

export type SortKey = "updated" | "created" | "name";

interface Props {
  value: SortKey;
  onChange: (v: SortKey) => void;
}

export function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="relative inline-flex items-center gap-2">
      <span className="caps">Sort</span>
      <span className="relative inline-flex items-center">
        <ArrowUpDown
          size={12}
          className="pointer-events-none absolute left-2.5 text-ink-3"
          aria-hidden="true"
        />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="focus-ring appearance-none rounded-2 border border-line bg-surface py-1.5 pl-7 pr-6 text-sm text-ink"
        >
          <option value="updated">Updated</option>
          <option value="created">Newest</option>
          <option value="name">A–Z</option>
        </select>
      </span>
    </label>
  );
}
