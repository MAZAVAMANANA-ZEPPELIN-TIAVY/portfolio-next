import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { footer, site } from "@/data/site";

const socialImageSize = { width: 1200, height: 630 };

/** Photo en data URL. Lecture mise en cache : sans cela, cacheComponents rendrait l'image dynamique. */
async function getPhotoDataUrl() {
  "use cache";
  cacheLife("max");
  const photo = await readFile(join(process.cwd(), "public/images/couverture/ZeppelinTiavy.jpg"));
  return `data:image/jpeg;base64,${photo.toString("base64")}`;
}

/** Image de partage (Open Graph / Twitter) générée au build avec la photo ZeppelinTiavy.jpg (Q5). */
export async function renderSocialImage() {
  const photoSrc = await getPhotoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 88px",
          color: "white",
          background: "linear-gradient(135deg, #020617 0%, #172554 60%, #1d4ed8 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: 22,
                fontSize: 40,
                fontWeight: 700,
                background: "linear-gradient(135deg, #1d4ed8, #2563eb, #22d3ee)",
              }}
            >
              Z
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24, color: "#a5f3fc" }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "#34d399" }} />
              {site.availability}
            </div>
          </div>
          <div style={{ marginTop: 44, fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 18, fontSize: 38, color: "#67e8f9" }}>{site.jobTitle}</div>
          <div style={{ marginTop: 36, fontSize: 26, color: "#cbd5e1" }}>{footer.techs.join(" • ")}</div>
          <div style={{ marginTop: 12, fontSize: 26, color: "#94a3b8" }}>{site.location}</div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse n'accepte que <img>. */}
        <img
          src={photoSrc}
          alt=""
          width={380}
          height={380}
          style={{ borderRadius: 48, border: "8px solid rgba(255,255,255,0.15)", objectFit: "cover" }}
        />
      </div>
    ),
    socialImageSize,
  );
}
