import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto max-w-container px-6 py-24 text-center">
      <p className="caps mb-3">404</p>
      <h1 className="text-3xl tracking-tight">
        <span className="font-light">This skill hasn&apos;t been </span>
        <span className="font-bold">written yet</span>
        <span className="font-light">.</span>
      </h1>
      <p className="mt-5 text-md text-ink-2">
        The page you tried to load does not exist. Want to contribute it?
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/contribute/"
          className="inline-flex items-center gap-2 rounded-2 bg-ink px-4 py-2.5 text-sm font-medium text-accent-ink no-underline transition-colors duration-120 ease-out hover:bg-accent-hover"
        >
          Contribute
        </Link>
        <Link
          href="/skills/"
          className="inline-flex items-center gap-2 rounded-2 border border-line bg-surface px-4 py-2.5 text-sm text-ink no-underline transition-colors duration-120 ease-out hover:border-ink-3"
        >
          Browse skills
        </Link>
      </div>
    </article>
  );
}
