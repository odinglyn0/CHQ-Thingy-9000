import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "CHQ Thingy 9000 live camera feed"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const fontData = await readFile(
    join(process.cwd(), "public/fonts/coolvetica.woff")
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <div style={{ fontFamily: "Coolvetica", fontSize: 140 }}>
          CHQ Thingy 9000
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 30,
            color: "#a1a1a1",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          CHQ Building, Dublin
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Coolvetica",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  )
}
