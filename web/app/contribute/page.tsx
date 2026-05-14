import type { Metadata } from "next";
import Link from "next/link";
import { Github, GitPullRequest, Terminal } from "lucide-react";
import { readSkillTemplate } from "@/lib/template";
import { GITHUB_REPO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contribute a skill",
  description:
    "Add a Skill to the directory. Fork the repo, scaffold from the template, validate locally, open a pull request. The site rebuilds on merge.",
  alternates: { canonical: "/contribute" },
  openGraph: {
    title: "Contribute a skill — skills.nimaaksoy.com",
    description:
      "Step-by-step contribution flow for adding an Agent Skill (SKILL.md) to the public directory.",
    url: "/contribute",
    type: "article",
  },
};

export default function ContributePage() {
  const template = readSkillTemplate();
  return (
    <article className="mx-auto max-w-container px-6 py-16">
      <p className="caps mb-3">Contribute</p>
      <h1 className="text-3xl tracking-tight">
        <span className="font-light">Add a </span>
        <span className="font-bold">skill</span>
      </h1>
      <p className="mt-5 text-md text-ink-2">
        Every skill is a Markdown file with frontmatter. The directory rebuilds itself from the
        files in this repo. Add yours and open a pull request.
      </p>

      <section className="mt-12 space-y-6">
        <Step n={1} title="Fork the repo">
          <p>
            Fork{" "}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink no-underline border-b border-ink-4 hover:border-ink"
            >
              nimaaksoy/skills
            </a>{" "}
            and clone it locally.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-2 border border-line bg-surface p-3 text-xs"><code>{`git clone https://github.com/<you>/skills.git
cd skills
npm install`}</code></pre>
        </Step>

        <Step n={2} title="Scaffold a skill" icon={<Terminal size={16} />}>
          <p>Use the interactive scaffolder. It picks the right folder and frontmatter for you.</p>
          <pre className="mt-3 overflow-x-auto rounded-2 border border-line bg-surface p-3 text-xs"><code>npm run new-skill</code></pre>
          <p className="mt-3">
            Or copy <code>skills/_TEMPLATE/</code> into{" "}
            <code>skills/&lt;category&gt;/&lt;subcategory&gt;/&lt;slug&gt;/</code> by hand.
          </p>
        </Step>

        <Step n={3} title="Write the SKILL.md">
          <p>The body has six sections: Overview, When to use, Instructions, Examples, Resources, Notes & limitations, Changelog.</p>
          <p className="mt-3">Keep the description under 200 characters and trigger-focused — the model uses it to decide whether to load the skill.</p>
        </Step>

        <Step n={4} title="Validate locally">
          <pre className="overflow-x-auto rounded-2 border border-line bg-surface p-3 text-xs"><code>npm run validate</code></pre>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            <li><code>name</code> ≤ 64 chars; <code>description</code> ≤ 200 chars</li>
            <li><code>category</code> and <code>subcategory</code> exist in <code>categories.yml</code></li>
            <li>Folder path matches <code>skills/&lt;cat&gt;/&lt;sub&gt;/&lt;slug&gt;/</code>, slug is kebab-case</li>
            <li>1–8 kebab-case tags</li>
            <li>Body has at least one <code>##</code> heading</li>
            <li>No file over 5 MB; no nested SKILL.md</li>
          </ul>
        </Step>

        <Step n={5} title="Open a pull request" icon={<GitPullRequest size={16} />}>
          <p>
            Push your branch and open a PR. CI runs the same validator.{" "}
            <Link href={`${GITHUB_REPO}/blob/main/CONTRIBUTING.md`} className="text-ink no-underline border-b border-ink-4 hover:border-ink">
              Read CONTRIBUTING.md
            </Link>{" "}
            for the full checklist.
          </p>
        </Step>
      </section>

      <section className="mt-16">
        <p className="caps mb-3">SKILL.md template</p>
        <pre className="overflow-x-auto rounded-card border border-line bg-surface p-4 text-xs"><code>{template}</code></pre>
      </section>

      <section className="mt-16 rounded-card border border-line bg-surface p-6">
        <p className="caps mb-2">Need a new category?</p>
        <p className="text-sm text-ink-2">
          Open an issue using the Category proposal template before adding skills under it.
        </p>
        <a
          href={`${GITHUB_REPO}/issues/new/choose`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-2 border border-line px-3 py-1.5 text-sm text-ink no-underline transition-colors duration-120 ease-out hover:border-ink-3"
        >
          <Github size={14} />
          New issue
        </a>
      </section>
    </article>
  );
}

function Step({
  n,
  title,
  icon,
  children,
}: {
  n: number;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-line bg-surface p-6">
      <div className="flex items-center gap-3">
        <span className="caps">Step {n}</span>
        {icon && <span className="text-ink-3">{icon}</span>}
      </div>
      <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-3 text-sm text-ink-2">{children}</div>
    </div>
  );
}
