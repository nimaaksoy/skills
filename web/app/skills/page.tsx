import type { Metadata } from "next";
import { skills, categoriesIndex } from "@/lib/data";
import { SkillsBrowser } from "./SkillsBrowser";

export const metadata: Metadata = {
  title: "Browse skills",
  description: "Search and filter the full skill directory.",
};

export default function SkillsPage() {
  return <SkillsBrowser skills={skills} categories={categoriesIndex.categories} />;
}
