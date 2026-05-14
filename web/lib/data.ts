import skillsData from "@/public/skills.json";
import categoriesData from "@/public/categories.json";

export interface SkillFileEntry {
  path: string;
  size: number;
}

export interface Skill {
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
  files: SkillFileEntry[];
  readmeExcerpt: string;
  body: string;
  zipPath: string;
}

export interface Subcategory {
  id: string;
  name: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  subcategories: Subcategory[];
}

export interface CategoriesIndex {
  categories: Category[];
}

export const skills: Skill[] = skillsData as Skill[];
export const categoriesIndex: CategoriesIndex = categoriesData as CategoriesIndex;

export function findSkill(category: string, subcategory: string, slug: string): Skill | undefined {
  return skills.find(
    (s) => s.category === category && s.subcategory === subcategory && s.slug === slug,
  );
}

export function findCategory(id: string): Category | undefined {
  return categoriesIndex.categories.find((c) => c.id === id);
}

export function findSubcategory(catId: string, subId: string): Subcategory | undefined {
  return findCategory(catId)?.subcategories.find((s) => s.id === subId);
}

export function relatedSkills(skill: Skill, max = 4): Skill[] {
  const sameSub = skills.filter(
    (s) => s !== skill && s.category === skill.category && s.subcategory === skill.subcategory,
  );
  const sameCat = skills.filter(
    (s) => s !== skill && s.category === skill.category && s.subcategory !== skill.subcategory,
  );
  const out: Skill[] = [];
  for (const s of [...sameSub, ...sameCat]) {
    if (out.length >= max) break;
    if (!out.includes(s)) out.push(s);
  }
  return out;
}

export const SITE_URL = "https://skills.nimaaksoy.com";
export const GITHUB_REPO = "https://github.com/nimaaksoy/skills";
