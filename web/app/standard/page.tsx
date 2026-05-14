import type { Metadata } from "next";
import { readSkillTemplate } from "@/lib/template";

export const metadata: Metadata = {
  title: "The SKILL.md standard",
  description:
    "Plain-language explainer of the SKILL.md format — frontmatter fields, body structure, and how the directory's metadata extends the Anthropic Agent Skills spec.",
  alternates: { canonical: "/standard" },
  openGraph: {
    title: "The SKILL.md standard — skills.nimaaksoy.com",
    description:
      "How the SKILL.md format works, what fields are required, and how to author one that passes validation.",
    url: "/standard",
    type: "article",
  },
};

export default function StandardPage() {
  const template = readSkillTemplate();
  return (
    <article className="mx-auto max-w-container px-6 py-16">
      <p className="caps mb-3">The spec</p>
      <h1 className="text-3xl tracking-tight">
        <span className="font-light">The </span>
        <span className="font-bold">SKILL.md</span>
        <span className="font-light"> format</span>
      </h1>

      <div className="mt-8 space-y-5 text-md text-ink-2">
        <p>
          A skill is one Markdown file plus an optional <code>resources/</code> folder. The file
          starts with YAML frontmatter that the model uses to decide whether to load it, and a
          body that gives it concrete instructions and examples.
        </p>
        <p>
          The format is deliberately tiny so it stays readable, hand-editable, and portable across
          tools. The fields below are the only required ones.
        </p>
      </div>

      <section className="mt-12 space-y-4">
        <Field name="name" required>
          Human-readable title. ≤ 64 characters.
        </Field>
        <Field name="description" required>
          One sentence describing when to use the skill. ≤ 200 characters. The model reads this to
          decide whether to load the skill.
        </Field>
        <Field name="category" required>
          One of the top-level category ids in <code>categories.yml</code>.
        </Field>
        <Field name="subcategory" required>
          A subcategory id under the chosen category.
        </Field>
        <Field name="tags" required>
          Array of 1–8 kebab-case strings.
        </Field>
        <Field name="author.name" required>
          Author display name. <code>author.url</code> and <code>author.github</code> are optional.
        </Field>
        <Field name="dependencies">
          Optional array of strings. Free-form. Often the names of other skills this one assumes.
        </Field>
        <Field name="version, created, updated, license">
          Optional but recommended. Dates are ISO. License defaults to CC-BY-4.0.
        </Field>
      </section>

      <section className="mt-12">
        <p className="caps mb-3">Body sections</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink-2">
          <li>Overview — one paragraph.</li>
          <li>When to use this skill — bulleted triggers.</li>
          <li>Instructions — numbered steps for the model.</li>
          <li>Examples — at least one worked example.</li>
          <li>Resources — files in <code>resources/</code> and what they are for.</li>
          <li>Notes & limitations — known edge cases.</li>
          <li>Changelog — short, semver-ish.</li>
        </ul>
      </section>

      <section className="mt-12">
        <p className="caps mb-3">Template</p>
        <pre className="overflow-x-auto rounded-card border border-line bg-surface p-4 text-xs"><code>{template}</code></pre>
      </section>

      <section className="mt-12 rounded-card border border-line bg-surface p-6">
        <p className="caps mb-2">Related</p>
        <ul className="space-y-2 text-sm text-ink-2">
          <li>
            <a
              href="https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink no-underline border-b border-ink-4 hover:border-ink"
            >
              Anthropic Agent Skills documentation
            </a>
          </li>
          <li>
            <a
              href="https://agentskills.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink no-underline border-b border-ink-4 hover:border-ink"
            >
              agentskills.io — the open standard this directory follows
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}

function Field({
  name,
  children,
  required,
}: {
  name: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4 border-b border-line pb-3">
      <div>
        <code className="text-sm text-ink">{name}</code>
        {required && <span className="ml-2 caps text-ink-3">required</span>}
      </div>
      <div className="text-sm text-ink-2">{children}</div>
    </div>
  );
}
