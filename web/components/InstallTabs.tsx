"use client";

import { useState } from "react";

interface Props {
  skillSlug: string;
  zipPath: string;
  category: string;
  subcategory: string;
  rawUrl: string;
}

type Tab = "claude-ai" | "claude-code" | "api";

export function InstallTabs({ skillSlug, zipPath, category, subcategory, rawUrl }: Props) {
  const [tab, setTab] = useState<Tab>("claude-ai");

  const tabs: { id: Tab; label: string }[] = [
    { id: "claude-ai", label: "Claude.ai" },
    { id: "claude-code", label: "Claude Code" },
    { id: "api", label: "API" },
  ];

  return (
    <section className="rounded-card border border-line bg-surface p-5">
      <div className="caps mb-3">How to install</div>
      <div className="flex gap-1 border-b border-line">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm transition-colors duration-120 ease-out ${
                active
                  ? "border-ink text-ink"
                  : "border-transparent text-ink-3 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="pt-4 text-sm text-ink-2">
        {tab === "claude-ai" && (
          <ol className="list-decimal space-y-2 pl-5">
            <li>Download the .zip and unzip it locally.</li>
            <li>In Claude.ai, open the project where you want to install the skill.</li>
            <li>Add the unzipped folder under the project&apos;s skills tab.</li>
            <li>The model will load it automatically when its description matches your prompt.</li>
          </ol>
        )}
        {tab === "claude-code" && (
          <div className="space-y-3">
            <p>From your repo root, drop the SKILL folder into a project skills directory:</p>
            <pre className="rounded-2 border border-line bg-paper p-3 text-xs text-ink overflow-x-auto"><code>{`mkdir -p .claude/skills && \\
  curl -L ${zipPath} -o /tmp/skill.zip && \\
  unzip /tmp/skill.zip -d .claude/skills/${skillSlug}`}</code></pre>
            <p>Or copy the directory into <code>~/.claude/skills/</code> for a user-wide install.</p>
          </div>
        )}
        {tab === "api" && (
          <div className="space-y-3">
            <p>
              Reference the skill folder when you bootstrap an Agent SDK session, or fetch the raw
              SKILL.md and prepend it to your system prompt.
            </p>
            <pre className="rounded-2 border border-line bg-paper p-3 text-xs text-ink overflow-x-auto"><code>{`curl ${rawUrl}`}</code></pre>
            <p className="text-ink-3 text-xs">
              Category: {category} · {subcategory}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
