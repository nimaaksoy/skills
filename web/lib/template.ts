import { readFileSync } from "node:fs";
import { join } from "node:path";

export function readSkillTemplate(): string {
  const path = join(process.cwd(), "..", "skills", "_TEMPLATE", "SKILL.md");
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "# Template not found at build time.";
  }
}
