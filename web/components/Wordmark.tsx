import Link from "next/link";

interface Props {
  className?: string;
}

export function Wordmark({ className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`inline-flex items-baseline font-sans text-[18px] tracking-tight text-ink no-underline ${className}`}
      aria-label="skills.nimaaksoy.com home"
    >
      <span className="font-light">skills</span>
      <span className="font-bold">.nimaaksoy.com</span>
    </Link>
  );
}
