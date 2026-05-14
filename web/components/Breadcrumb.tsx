import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  items: Crumb[];
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1.5">
            {c.href && !isLast ? (
              <Link href={c.href} className="text-ink-3 no-underline hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ink-2" : "text-ink-3"}>{c.label}</span>
            )}
            {!isLast && <ChevronRight size={12} className="text-ink-4" aria-hidden="true" />}
          </span>
        );
      })}
    </nav>
  );
}
