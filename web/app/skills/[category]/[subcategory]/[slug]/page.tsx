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
  const path = `/skills/${category}/${subcategory}/${slug}`;
  return {
    title: skill.name,
    description: skill.description,
    keywords: ["AI skill", skill.name, ...(skill.tags ?? []), category, subcategory],
    authors: skill.author?.name ? [{ name: skill.author.name, url: skill.author.url }] : undefined,
    alternates: { canonical: path },
    openGraph: {
      title: `${skill.name} — skills.nimaaksoy.com`,
      description: skill.description,
      url: path,
      type: "article",
      tags: skill.tags,
      authors: skill.author?.name ? [skill.author.name] : undefined,
      publishedTime: skill.created,
      modifiedTime: skill.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: skill.name,
      description: skill.description,
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
