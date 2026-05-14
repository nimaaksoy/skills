import Link from "next/link";
import { ArrowRight, Search, Copy, Wand2 } from "lucide-react";
import { skills, categoriesIndex } from "@/lib/data";
import { CategoryGrid } from "@/components/CategoryGrid";
import { SkillCard } from "@/components/SkillCard";
import { SponsorStrip } from "@/components/SponsorStrip";

export default function HomePage() {
  const featured = [...skills]
    .sort((a, b) => (b.updated || "").localeCompare(a.updated || ""))
    .slice(0, 6);

  return (
    <>
      <section className="mx-auto max-w-page px-6 pt-20 pb-16">
        <div className="max-w-container">
          <p className="caps mb-5">An open directory</p>
          <h1 className="text-3xl leading-tight tracking-tight text-ink sm:text-3xl">
            <span className="font-light">An open directory of AI</span>{" "}
            <span className="font-bold">Skills</span>
            <span className="font-light">.</span>
          </h1>
          <p className="mt-5 max-w-narrow text-md text-ink-2">
            Curated, copy-pasteable Skills for Claude and any agent that follows the open Skill
            standard. Free. CC-BY-4.0. No accounts.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/skills/"
              className="inline-flex items-center gap-2 rounded-2 bg-ink px-4 py-2.5 text-sm font-medium text-accent-ink no-underline transition-colors duration-120 ease-out hover:bg-accent-hover"
            >
              Browse skills
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link
              href="/contribute/"
              className="inline-flex items-center gap-2 rounded-2 border border-line bg-surface px-4 py-2.5 text-sm text-ink no-underline transition-colors duration-120 ease-out hover:border-ink-3"
            >
              Contribute a skill
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 pb-16">
        <p className="caps mb-4">How it works</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Step icon={<Search size={18} />} title="Find" body="Browse by category, search by name, filter by tag." />
          <Step icon={<Copy size={18} />} title="Copy" body="Grab the SKILL.md or download the .zip. No login." />
          <Step icon={<Wand2 size={18} />} title="Use" body="Drop it into Claude.ai, Claude Code, or any agent." />
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 pb-16">
        <div className="mb-5 flex items-end justify-between">
          <p className="caps">Categories</p>
          <Link href="/skills/" className="text-sm text-ink-2 no-underline border-b border-ink-4 hover:text-ink hover:border-ink">
            See all
          </Link>
        </div>
        <CategoryGrid categories={categoriesIndex.categories} />
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-page px-6 pb-16">
          <div className="mb-5 flex items-end justify-between">
            <p className="caps">Featured skills</p>
            <Link href="/skills/" className="text-sm text-ink-2 no-underline border-b border-ink-4 hover:text-ink hover:border-ink">
              All skills
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <SkillCard key={s.path} skill={s} />
            ))}
          </div>
        </section>
      )}

      <SponsorStrip />
    </>
  );
}

function Step({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex h-9 w-9 items-center justify-center rounded-2 bg-paper-2 text-ink">
        {icon}
      </div>
      <h3 className="mt-3 text-md font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-2">{body}</p>
    </div>
  );
}
