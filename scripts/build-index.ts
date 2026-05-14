#!/usr/bin/env tsx
import { mkdirSync, statSync, createWriteStream, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import archiver from "archiver";
import {
  ROOT,
  findSkillFiles,
  listFiles,
  loadCategories,
  parseSkill,
  stripMarkdown,
  validateSkill,
} from "./lib.js";

interface SkillIndexEntry {
  slug: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  author: { name: string; url?: string; github?: string };
  version: string;
  created: string;
  updated: string;
  license?: string;
  dependencies: string[];
  path: string;
  files: { path: string; size: number }[];
  readmeExcerpt: string;
  body: string;
  zipPath: string;
}

async function zipFolder(srcDir: string, outZip: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    mkdirSync(dirname(outZip), { recursive: true });
    const output = createWriteStream(outZip);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => resolve());
    output.on("error", reject);
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(srcDir, false);
    archive.finalize();
  });
}

function isoDate(v: unknown): string {
  if (!v) return "";
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

async function main() {
  const categories = loadCategories();
  const files = findSkillFiles();

  // Validate first.
  const errors: string[] = [];
  const parsed = files.map(parseSkill);
  for (const s of parsed) {
    const r = validateSkill(s, categories);
    if (!r.ok) errors.push(...r.errors);
  }
  if (errors.length > 0) {
    for (const e of errors) console.error("ERROR " + e);
    console.error(`\nIndex build aborted: ${errors.length} validation error(s).`);
    process.exit(1);
  }

  const webPublic = join(ROOT, "web", "public");
  const zipsDir = join(webPublic, "zips");
  // Wipe previous zips so renamed/removed skills do not linger.
  if (existsSync(zipsDir)) rmSync(zipsDir, { recursive: true, force: true });
  mkdirSync(zipsDir, { recursive: true });

  const entries: SkillIndexEntry[] = [];
  const counts = new Map<string, number>(); // category id
  const subCounts = new Map<string, number>(); // category/sub

  for (const skill of parsed) {
    const d = skill.data as Record<string, any>;
    const folderAbs = skill.filePath.replace(/\/SKILL\.md$/, "");
    const slug = folderAbs.split("/").pop() as string;
    const category = String(d.category);
    const subcategory = String(d.subcategory);

    const folderFiles = listFiles(folderAbs).map((f) => ({
      path: relative(folderAbs, f).split("\\").join("/"),
      size: statSync(f).size,
    }));

    const zipFile = `${category}-${subcategory}-${slug}.zip`;
    const zipAbs = join(zipsDir, zipFile);
    await zipFolder(folderAbs, zipAbs);

    const excerpt = stripMarkdown(skill.body).slice(0, 240);

    entries.push({
      slug,
      name: String(d.name),
      description: String(d.description),
      category,
      subcategory,
      tags: Array.isArray(d.tags) ? d.tags.map(String) : [],
      author: {
        name: String(d.author?.name ?? ""),
        url: d.author?.url ? String(d.author.url) : undefined,
        github: d.author?.github ? String(d.author.github) : undefined,
      },
      version: String(d.version ?? "0.1.0"),
      created: isoDate(d.created),
      updated: isoDate(d.updated),
      license: d.license ? String(d.license) : undefined,
      dependencies: Array.isArray(d.dependencies) ? d.dependencies.map(String) : [],
      path: `skills/${category}/${subcategory}/${slug}`,
      files: folderFiles,
      readmeExcerpt: excerpt,
      body: skill.body,
      zipPath: `/zips/${zipFile}`,
    });

    counts.set(category, (counts.get(category) ?? 0) + 1);
    const subKey = `${category}/${subcategory}`;
    subCounts.set(subKey, (subCounts.get(subKey) ?? 0) + 1);
  }

  entries.sort((a, b) => (b.updated || "").localeCompare(a.updated || ""));

  mkdirSync(webPublic, { recursive: true });
  writeFileSync(join(webPublic, "skills.json"), JSON.stringify(entries, null, 2));

  const categoriesOut = {
    categories: categories.categories.map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      description: c.description,
      count: counts.get(c.id) ?? 0,
      subcategories: c.subcategories.map((s) => ({
        id: s.id,
        name: s.name,
        count: subCounts.get(`${c.id}/${s.id}`) ?? 0,
      })),
    })),
  };
  writeFileSync(join(webPublic, "categories.json"), JSON.stringify(categoriesOut, null, 2));

  console.log(
    `Built index: ${entries.length} skill(s), ${entries.length} zip(s) → web/public/{skills,categories}.json`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
