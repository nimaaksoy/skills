import type { Metadata } from "next";
import { skills, categoriesIndex } from "@/lib/data";
import { SkillsBrowser } from "./SkillsBrowser";

export const metadata: Metadata = {
  title: "Browse skills",
  description:
    "Search and filter the full directory of AI Skills. Sortable, taggable, and grouped by category.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Browse skills — skills.nimaaksoy.com",
    description: "Search and filter the full directory of AI Skills.",
    url: "/skills",
    type: "website",
  },
};

export default function SkillsPage() {
  return <SkillsBrowser skills={skills} categories={categoriesIndex.categories} />;
}
