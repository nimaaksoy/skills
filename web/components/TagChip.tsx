interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
  as?: "button" | "span";
}

export function TagChip({ label, active = false, onClick, as = "span" }: Props) {
  const cls = `inline-flex items-center rounded-pill border px-2.5 py-0.5 text-xs transition-colors duration-120 ease-out ${
    active
      ? "border-ink bg-ink text-accent-ink"
      : "border-line bg-surface text-ink-2 hover:border-ink-3"
  }`;
  if (as === "button" && onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {label}
      </button>
    );
  }
  return <span className={cls}>{label}</span>;
}
