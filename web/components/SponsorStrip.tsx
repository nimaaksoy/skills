export function SponsorStrip() {
  return (
    <section className="border-y border-line bg-paper py-8">
      <div className="mx-auto flex max-w-page flex-col items-center gap-3 px-6 text-center sm:flex-row sm:justify-center sm:gap-10">
        <span className="caps">Sponsored by</span>
        <div className="flex items-center gap-8">
          <a
            href="https://bowora.com"
            className="text-md text-ink no-underline border-b border-ink-4 hover:border-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bowora
          </a>
          <span className="text-ink-4">·</span>
          <a
            href="https://vestoin.com"
            className="text-md text-ink no-underline border-b border-ink-4 hover:border-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vestoin
          </a>
        </div>
      </div>
    </section>
  );
}
