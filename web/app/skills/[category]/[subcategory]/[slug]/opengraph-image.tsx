import { ImageResponse } from "next/og";
import { skills, findSkill, categoriesIndex } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "AI Skill on skills.nimaaksoy.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return skills.map((s) => ({
    category: s.category,
    subcategory: s.subcategory,
    slug: s.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: { category: string; subcategory: string; slug: string };
}) {
  const skill = findSkill(params.category, params.subcategory, params.slug);
  const cat = categoriesIndex.categories.find((c) => c.id === params.category);
  const sub = cat?.subcategories.find((s) => s.id === params.subcategory);

  const name = skill?.name ?? "Skill";
  const description = skill?.description ?? "";
  const breadcrumb = `${cat?.name ?? params.category} · ${sub?.name ?? params.subcategory}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f5f5f3",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 20,
            color: "#8a8a86",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 24, height: 24, background: "#111", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 7, height: 7, background: "#f5f5f3", borderRadius: 999 }} />
          </div>
          <span>skills.nimaaksoy.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 22,
              color: "#8a8a86",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {breadcrumb}
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#111",
              fontWeight: 700,
            }}
          >
            {name}
          </div>
          {description && (
            <div
              style={{
                fontSize: 28,
                color: "#4a4a48",
                lineHeight: 1.4,
                maxWidth: 1040,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e5e5e0",
            paddingTop: 24,
            fontSize: 20,
            color: "#8a8a86",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span>AI Skill</span>
          <span>Free to use · Free to fork</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
