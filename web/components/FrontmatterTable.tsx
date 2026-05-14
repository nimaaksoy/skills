import type { Skill } from "@/lib/data";

interface Props {
  skill: Skill;
}

export function FrontmatterTable({ skill }: Props) {
  const rows: [string, string][] = [
    ["Name", skill.name],
    ["Category", `${skill.category} · ${skill.subcategory}`],
    ["Tags", skill.tags.join(", ")],
    ["Author", skill.author.name],
    ["Version", skill.version],
    ["Created", skill.created || "—"],
    ["Updated", skill.updated || "—"],
    ["License", skill.license || "CC-BY-4.0"],
  ];
  return (
    <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="caps self-center">{k}</dt>
          <dd className="text-ink-2">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
