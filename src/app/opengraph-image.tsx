import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "AXORION: websites, software, AI & digital growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "src", "assets", "logo-mark-og.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          color: "#f2f5fb",
          background: "radial-gradient(900px 500px at 90% 0%, rgba(47,107,255,0.45), transparent 70%), #060912",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={210} height={128} alt="" />
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, marginTop: 30, letterSpacing: -2 }}>AXORION</div>
        <div style={{ display: "flex", fontSize: 38, color: "#9fb6e6", marginTop: 12 }}>
          Websites, Software, AI &amp; Digital Growth
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5fb0ff", marginTop: 34 }}>
          AI Automation · Custom Software · Web &amp; E-Commerce
        </div>
      </div>
    ),
    size,
  );
}
