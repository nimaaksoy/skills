"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { Skill, Category } from "@/lib/data";
import { SkillCard } from "@/components/SkillCard";
import { CategoryTree } from "@/components/CategoryTree";
import { SearchBar } from "@/components/SearchBar";
import { SortDropdown, type SortKey } from "@/components/SortDropdown";
import { TagChip } from "@/components/TagChip";

interface Props {
  skills: Skill[];
  categories: Category[];
}

export function SkillsBrowser({ skills, categories }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("updated");
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Pick up ?category= from URL on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    const s = params.get("subcategory");
    const t = params.get("tag");
    if (c) setCategory(c);
    if (s) setSubcategory(s);
    if (t) setActiveTags([t]);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(skills, {
        keys: [
          { name: "name", weight: 0.5 },
          { name: "description", weight: 0.3 },
          { name: "tags", weight: 0.2 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [skills],
  );

  const filtered = useMemo(() => {
    let list = query.trim() ? fuse.search(query.trim()).map((r) => r.item) : [...skills];

    if (category) list = list.filter((s) => s.category === category);
    if (subcategory) list = list.filter((s) => s.subcategory === subcategory);
    if (activeTags.length > 0) {
      list = list.filter((s) => activeTags.every((t) => s.tags.includes(t)));
    }

    list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "created") return (b.created || "").localeCompare(a.created || "");
      return (b.updated || "").localeCompare(a.updated || "");
    });

    return list;
  }, [skills, query, category, subcategory, activeTags, sort, fuse]);

  function clearAll() {
    setQuery("");
    setCategory(null);
    setSubcategory(null);
    setActiveTags([]);
  }

  function toggleTag(t: string) {
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  const hasFilters = !!query || !!category || !!subcategory || activeTags.length > 0;

  return (
    <div className="mx-auto max-w-page px-6 py-12">
      <header className="mb-8 flex items-baseline justify-between gap-6">
        <div>
          <p className="caps mb-2">All skills</p>
          <h1 className="text-2xl tracking-tight text-ink">
            <span className="font-light">Browse the </span>
            <span className="font-bold">directory</span>
          </h1>
        </div>
        <span className="text-sm text-ink-3">
          {filtered.length} of {skills.length}
        </span>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <CategoryTree
            categories={categories}
            selectedCategory={category}
            selectedSubcategory={subcategory}
            onSelectCategory={(id) => {
              setCategory(id);
              setSubcategory(null);
            }}
            onSelectSubcategory={(catId, subId) => {
              setCategory(catId);
              setSubcategory(subId);
            }}
          />
        </aside>

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:max-w-sm sm:flex-1">
              <SearchBar value={query} onChange={setQuery} />
            </div>
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {(activeTags.length > 0 || hasFilters) && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {activeTags.map((t) => (
                <TagChip key={t} label={`#${t}`} active onClick={() => toggleTag(t)} as="button" />
              ))}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-ink-3 no-underline border-b border-ink-5 hover:text-ink hover:border-ink"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-card border border-dashed border-line-2 bg-surface p-10 text-center">
              <p className="text-md text-ink">
                {skills.length === 0
                  ? "No skills yet. Be the first to contribute one."
                  : "No skills match. Try clearing filters."}
              </p>
              {skills.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-4 inline-flex items-center gap-2 rounded-2 border border-line bg-paper px-3 py-1.5 text-sm text-ink-2 hover:text-ink"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((s) => (
                <SkillCard key={s.path} skill={s} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
