import Link from "next/link";
import type { Category } from "@/lib/data";
import { CategoryIcon } from "./CategoryIcon";

interface Props {
  categories: Category[];
}

export function CategoryGrid({ categories }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/skills/?category=${c.id}`}
          className="group flex flex-col gap-3 rounded-card border border-line bg-surface p-5 no-underline shadow-card transition-shadow duration-200 ease-out hover:shadow-card-hover"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-2 bg-paper-2 text-ink">
              <CategoryIcon name={c.icon} size={18} />
            </div>
            <span className="caps">{c.count} {c.count === 1 ? "skill" : "skills"}</span>
          </div>
          <h3 className="text-md font-semibold text-ink">{c.name}</h3>
          <p className="text-sm text-ink-2">{c.description}</p>
        </Link>
      ))}
    </div>
  );
}
