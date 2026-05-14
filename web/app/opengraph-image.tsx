import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "skills.nimaaksoy.com — An open directory of AI Skills";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            fontSize: 22,
            color: "#8a8a86",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 28, height: 28, background: "#111", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, background: "#f5f5f3", borderRadius: 999 }} />
          </div>
          <span>skills.nimaaksoy.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#111",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 400 }}>An open directory of AI&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Skills.</span>
          </div>
          <div style={{ fontSize: 30, color: "#4a4a48", lineHeight: 1.4, maxWidth: 900 }}>
            Find, copy, and use Skills compatible with Claude and the agentskills.io standard.
          </div>
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
          <span>Free · Open · Static</span>
          <span>By Nima Aksoy</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
