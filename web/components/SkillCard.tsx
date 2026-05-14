import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Skill } from "@/lib/data";
import { TagChip } from "./TagChip";

interface Props {
  skill: Skill;
}

export function SkillCard({ skill }: Props) {
  const href = `/${skill.path}/`;
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-card border border-line bg-surface p-5 no-underline shadow-card transition-shadow duration-200 ease-out hover:shadow-card-hover"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-md font-semibold leading-snug text-ink">{skill.name}</h3>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-ink-3 transition-colors duration-120 ease-out group-hover:text-ink"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm leading-snug text-ink-2 line-clamp-3">{skill.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {skill.tags.slice(0, 4).map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
      </div>
    </Link>
  );
}
