import type { MetadataRoute } from "next";
import { skills, SITE_URL } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/skills/",
    "/contribute/",
    "/about/",
    "/standard/",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const skillUrls: MetadataRoute.Sitemap = skills.map((s) => ({
    url: `${SITE_URL}/${s.path}/`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: s.updated ? new Date(s.updated) : undefined,
  }));

  return [...staticUrls, ...skillUrls];
}
