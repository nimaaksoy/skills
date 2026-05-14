import Link from "next/link";
import { Download, Github, FileEdit } from "lucide-react";
import type { Skill } from "@/lib/data";
import { Breadcrumb } from "./Breadcrumb";
import { TagChip } from "./TagChip";
import { CopyButton } from "./CopyButton";
import { MarkdownViewer } from "./MarkdownViewer";
import { InstallTabs } from "./InstallTabs";
import { SkillCard } from "./SkillCard";
import { GITHUB_REPO, relatedSkills, findCategory, findSubcategory } from "@/lib/data";
import matter from "gray-matter";

interface Props {
  skill: Skill;
}

export function SkillDetail({ skill }: Props) {
  const cat = findCategory(skill.category);
  const sub = findSubcategory(skill.category, skill.subcategory);
  const ghPath = `${GITHUB_REPO}/tree/main/${skill.path}`;
  const ghEdit = `${GITHUB_REPO}/edit/main/${skill.path}/SKILL.md`;
  const rawUrl = `${GITHUB_REPO.replace("github.com", "raw.githubusercontent.com")}/main/${skill.path}/SKILL.md`;

  // Reconstruct full SKILL.md text with frontmatter for the copy button.
  const frontmatter = matter.stringify(skill.body, {
    name: skill.name,
    description: skill.description,
    dependencies: skill.dependencies,
    category: skill.category,
    subcategory: skill.subcategory,
    tags: skill.tags,
    author: skill.author,
    license: skill.license,
    version: skill.version,
    created: skill.created,
    updated: skill.updated,
  });

  const related = relatedSkills(skill, 4);

  return (
    <article className="mx-auto max-w-page px-6 py-12">
      <Breadcrumb
        items={[
          { label: "Skills", href: "/skills/" },
          { label: cat?.name ?? skill.category, href: `/skills/?category=${skill.category}` },
          { label: sub?.name ?? skill.subcategory },
        ]}
      />

      <header className="mt-6 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <h1 className="text-3xl leading-tight tracking-tight text-ink">
            <span className="font-light">{splitName(skill.name).first}</span>
            <span className="font-bold"> {splitName(skill.name).rest}</span>
          </h1>
          <p className="max-w-container text-md text-ink-2">{skill.description}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {skill.tags.map((t) => (
              <TagChip key={t} label={t} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-3">
            <span>
              By{" "}
              {skill.author.github ? (
                <a
                  href={`https://github.com/${skill.author.github}`}
                  className="text-ink no-underline border-b border-ink-4 hover:border-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {skill.author.name}
                </a>
              ) : (
                <span className="text-ink">{skill.author.name}</span>
              )}
            </span>
            <span>·</span>
            <span>v{skill.version}</span>
            {skill.updated && (
              <>
                <span>·</span>
                <span>Updated {skill.updated}</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <CopyButton text={frontmatter} />
            <a
              href={skill.zipPath}
              download
              className="inline-flex items-center gap-2 rounded-2 border border-line bg-surface px-4 py-2.5 text-sm text-ink no-underline transition-colors duration-120 ease-out hover:border-ink-3"
            >
              <Download size={14} strokeWidth={1.5} />
              <span>Download .zip</span>
            </a>
            <a
              href={ghPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2 border border-line bg-surface px-4 py-2.5 text-sm text-ink no-underline transition-colors duration-120 ease-out hover:border-ink-3"
            >
              <Github size={14} strokeWidth={1.5} />
              <span>View on GitHub</span>
            </a>
            <a
              href={ghEdit}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink-2 no-underline border-b border-ink-4 hover:text-ink hover:border-ink"
            >
              <FileEdit size={14} strokeWidth={1.5} />
              <span>Suggest edit</span>
            </a>
          </div>
        </div>

        <aside className="space-y-6">
          <section className="rounded-card border border-line bg-surface p-5">
            <div className="caps mb-3">Files in this skill</div>
            <ul className="space-y-1.5 font-mono text-xs text-ink-2">
              {skill.files.map((f) => (
                <li key={f.path} className="flex items-center justify-between gap-3">
                  <span className="truncate">{f.path}</span>
                  <span className="text-ink-3">{formatBytes(f.size)}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </header>

      <hr className="my-12 border-t border-line" />

      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <MarkdownViewer source={skill.body} />
        <div className="space-y-6">
          <InstallTabs
            skillSlug={skill.slug}
            zipPath={skill.zipPath}
            category={skill.category}
            subcategory={skill.subcategory}
            rawUrl={rawUrl}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="caps mb-4">Related skills</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {related.map((s) => (
              <SkillCard key={s.path} skill={s} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 text-center">
        <Link href="/skills/" className="text-sm text-ink-2 no-underline border-b border-ink-4 hover:text-ink hover:border-ink">
          Back to all skills
        </Link>
      </div>
    </article>
  );
}

function splitName(name: string): { first: string; rest: string } {
  const parts = name.split(/\s+/);
  if (parts.length === 1) return { first: parts[0], rest: "" };
  const first = parts[0];
  const rest = parts.slice(1).join(" ");
  return { first, rest };
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}
