import type { Metadata } from "next";
import { GITHUB_REPO } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "About skills.nimaaksoy.com.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-container px-6 py-16">
      <p className="caps mb-3">About</p>
      <h1 className="text-3xl tracking-tight">
        <span className="font-light">A directory, </span>
        <span className="font-bold">not a platform</span>
      </h1>

      <div className="mt-8 space-y-6 text-md text-ink-2">
        <p>
          skills.nimaaksoy.com is an open directory of AI Skills compatible with Claude and the
          agentskills.io standard. It is a static site generated from a public GitHub repo. There
          is no backend, no account, no tracking. Browse, copy, contribute.
        </p>
        <p>
          The site exists because the Skill format is small and useful, and a directory makes it
          easier to share what works without re-discovering it every time.
        </p>
      </div>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <Block title="Founder">
          <p>
            Built and maintained by Nima Aksoy. I write{" "}
            <a
              href="https://nimaaksoy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink no-underline border-b border-ink-4 hover:border-ink"
            >
              short essays
            </a>{" "}
            and ship small tools. This directory is one of them.
          </p>
        </Block>
        <Block title="License">
          <p>
            Code: MIT. Skill content: CC-BY-4.0. Authors retain credit. You can use any skill in
            commercial work; just keep the attribution line.
          </p>
        </Block>
        <Block title="Compatibility">
          <p>
            Skills follow the agentskills.io frontmatter contract. They load into Claude.ai
            projects, Claude Code, and the Anthropic API. Other agents that read SKILL.md should
            work too.
          </p>
        </Block>
        <Block title="Source">
          <p>
            Everything lives in{" "}
            <a
              href={GITHUB_REPO}
              className="text-ink no-underline border-b border-ink-4 hover:border-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              the GitHub repo
            </a>
            . Open an issue, send a pull request, or fork it.
          </p>
        </Block>
      </section>

      <section className="mt-12">
        <p className="caps mb-4">Sponsors</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <SponsorBlock
            name="Bowora"
            url="https://bowora.com"
            blurb="Funds the directory's hosting and maintenance."
          />
          <SponsorBlock
            name="Vestoin"
            url="https://vestoin.com"
            blurb="Supports the open Skill standard."
          />
        </div>
      </section>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <p className="caps mb-2">{title}</p>
      <div className="text-sm text-ink-2">{children}</div>
    </div>
  );
}

function SponsorBlock({ name, url, blurb }: { name: string; url: string; blurb: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-card border border-line bg-surface p-5 no-underline shadow-card transition-shadow duration-200 ease-out hover:shadow-card-hover"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2 border border-dashed border-line-2 bg-paper text-xs text-ink-4">
        logo
      </div>
      <div>
        <h3 className="text-md font-semibold text-ink">{name}</h3>
        <p className="text-sm text-ink-2">{blurb}</p>
      </div>
    </a>
  );
}
