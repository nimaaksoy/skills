import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-page flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-ink-2">
          MIT (code) · CC-BY-4.0 (skills) · Sponsored by{" "}
          <a
            href="https://bowora.com"
            className="text-ink no-underline border-b border-ink-4 hover:border-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bowora
          </a>{" "}
          and{" "}
          <a
            href="https://vestoin.com"
            className="text-ink no-underline border-b border-ink-4 hover:border-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vestoin
          </a>
        </div>
        <div className="caps">FAST · SECURE · OPEN</div>
      </div>
    </footer>
  );
}
