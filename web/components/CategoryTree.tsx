"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/lib/data";
import { CategoryIcon } from "./CategoryIcon";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  selectedSubcategory?: string | null;
  onSelectCategory: (id: string | null) => void;
  onSelectSubcategory: (catId: string, subId: string | null) => void;
}

export function CategoryTree({
  categories,
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    if (selectedCategory) init[selectedCategory] = true;
    return init;
  });

  function toggle(id: string) {
    setOpen((o) => ({ ...o, [id]: !o[id] }));
  }

  return (
    <nav aria-label="Categories" className="flex flex-col">
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex items-center justify-between px-2 py-1.5 text-sm rounded-1 hover:bg-paper-2 ${
          !selectedCategory ? "text-ink font-semibold" : "text-ink-2"
        }`}
      >
        <span>All categories</span>
      </button>
      <div className="my-2 h-px bg-line" />
      {categories.map((c) => {
        const isOpen = !!open[c.id];
        const isActive = selectedCategory === c.id;
        return (
          <div key={c.id} className="flex flex-col">
            <div className="flex items-center">
              <button
                aria-label={`Toggle ${c.name}`}
                onClick={() => toggle(c.id)}
                className="flex h-7 w-7 items-center justify-center text-ink-3 hover:text-ink"
              >
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-200 ease-out ${isOpen ? "rotate-90" : ""}`}
                />
              </button>
              <button
                onClick={() => onSelectCategory(c.id)}
                className={`flex flex-1 items-center justify-between gap-2 rounded-1 px-2 py-1.5 text-left text-sm hover:bg-paper-2 ${
                  isActive ? "text-ink font-semibold" : "text-ink-2"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <CategoryIcon name={c.icon} size={14} />
                  {c.name}
                </span>
                <span className="text-xs text-ink-3">{c.count}</span>
              </button>
            </div>
            {isOpen && (
              <ul className="ml-7 flex flex-col border-l border-line pl-3">
                {c.subcategories.map((s) => {
                  const subActive = selectedCategory === c.id && selectedSubcategory === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => onSelectSubcategory(c.id, s.id)}
                        className={`flex w-full items-center justify-between gap-2 rounded-1 px-2 py-1 text-left text-sm hover:bg-paper-2 ${
                          subActive ? "text-ink font-semibold" : "text-ink-2"
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-xs text-ink-3">{s.count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
