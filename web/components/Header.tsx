import Link from "next/link";
import { Github } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { GITHUB_REPO } from "@/lib/data";

export function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-5">
        <Wordmark />
        <nav className="flex items-center gap-6 text-sm text-ink-2">
          <Link href="/skills/" className="hover:text-ink no-underline">Browse</Link>
          <Link href="/contribute/" className="hover:text-ink no-underline">Contribute</Link>
          <Link href="/standard/" className="hover:text-ink no-underline">Standard</Link>
          <Link href="/about/" className="hover:text-ink no-underline">About</Link>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-xs text-ink no-underline transition-colors duration-120 ease-out hover:border-ink-3"
          >
            <Github size={14} aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
