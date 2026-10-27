import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The card that shows when a link to the site is shared: the homepage hero
// in miniature. Dotted paper, the headline, and the photo in its tomato frame.

export const alt = "Somkene Ojukwu, software engineer building products from Lagos, Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1A1410";

const file = (path: string) => readFileSync(join(process.cwd(), path));

export default function OpenGraphImage() {
  const photo = `data:image/jpeg;base64,${file("public/assets/images/profile.jpg").toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: "0 80px",
          backgroundColor: "#FBF5EA",
          backgroundImage: "radial-gradient(circle, rgba(26,20,16,0.18) 2px, transparent 3px)",
          backgroundSize: "28px 28px",
          color: INK, fontFamily: "Euclid",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 22 }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: "#C42D63" }}>hey, I&apos;m Somkene</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 74, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2.5 }}>
            <span>Software engineer</span>
            <span>building products</span>
            <span style={{ display: "flex" }}>
              <span>from</span>
              <span style={{ marginLeft: 20, textDecoration: "underline", textDecorationColor: "#FF6B4A" }}>Lagos, Nigeria</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
            {[
              { t: "Backend", c: "#6FE0B0", r: -3 },
              { t: "Frontend", c: "#8EA0FF", r: 2 },
              { t: "somkene.com", c: "#FFD23F", r: -2 },
            ].map(s => (
              <div key={s.t} style={{
                display: "flex", fontSize: 26, fontWeight: 700, padding: "10px 22px", borderRadius: 999,
                background: s.c, border: `3px solid ${INK}`, boxShadow: `3px 4px 0 ${INK}`, transform: `rotate(${s.r}deg)`,
              }}>{s.t}</div>
            ))}
          </div>
        </div>
        <div style={{
          display: "flex", padding: 16, background: "#FF6B4A", border: `4px solid ${INK}`, borderRadius: 26,
          boxShadow: `12px 12px 0 ${INK}`, transform: "rotate(3deg)",
        }}>
          <div style={{ display: "flex", padding: 12, background: "#F4EBDD", border: `3px solid ${INK}`, borderRadius: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={250} height={310} alt="" style={{ objectFit: "cover", borderRadius: 10, border: `3px solid ${INK}` }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Euclid", data: file("public/font/EuclidCircular-Medium.ttf"), weight: 500, style: "normal" },
        { name: "Euclid", data: file("public/font/EuclidCircular-Bold.ttf"), weight: 700, style: "normal" },
      ],
    },
  );
}
