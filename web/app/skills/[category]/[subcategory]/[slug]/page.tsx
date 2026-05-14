import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { skills, findSkill } from "@/lib/data";
import { SkillDetail } from "@/components/SkillDetail";

interface Params {
  category: string;
  subcategory: string;
  slug: string;
}

export function generateStaticParams() {
  return skills.map((s) => ({
    category: s.category,
    subcategory: s.subcategory,
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, subcategory, slug } = await params;
  const skill = findSkill(category, subcategory, slug);
  if (!skill) return { title: "Skill not found" };
  return {
    title: skill.name,
    description: skill.description,
    openGraph: {
      title: skill.name,
      description: skill.description,
      type: "article",
    },
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory, slug } = await params;
  const skill = findSkill(category, subcategory, slug);
  if (!skill) notFound();
  return <SkillDetail skill={skill} />;
}
