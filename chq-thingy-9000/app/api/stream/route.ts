import https from "node:https"
import type { IncomingMessage } from "node:http"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const fetchCache = "force-no-store"

const CAMERA_HOST = "89.101.110.214"
const CAMERA_PORT = 8443
const CAMERA_PATH = "/axis-cgi/mjpg/video.cgi?camera=1"
const LEGACY_CIPHERS = "DEFAULT@SECLEVEL=0"

function openUpstream(): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const proxyReq = https.request(
      {
        host: CAMERA_HOST,
        port: CAMERA_PORT,
        path: CAMERA_PATH,
        method: "GET",
        rejectUnauthorized: false,
        ciphers: LEGACY_CIPHERS,
        minVersion: "TLSv1",
        headers: {
          "User-Agent": "CHQThingy9000/1.0",
          Accept: "multipart/x-mixed-replace, image/jpeg",
        },
      },
      resolve
    )

    proxyReq.on("error", reject)
    proxyReq.setTimeout(15000, () => {
      proxyReq.destroy(new Error("Upstream camera connection timed out"))
    })
    proxyReq.end()
  })
}

export async function GET(request: NextRequest) {
  const upstream = await openUpstream().catch((error: Error) => error)

  if (upstream instanceof Error) {
    return new Response(`Camera unavailable: ${upstream.message}`, {
      status: 502,
      headers: { "Content-Type": "text/plain" },
    })
  }

  if (!upstream.statusCode || upstream.statusCode >= 400) {
    upstream.destroy()
    return new Response(
      `Camera returned status ${upstream.statusCode ?? "unknown"}`,
      { status: 502, headers: { "Content-Type": "text/plain" } }
    )
  }

  const contentType =
    upstream.headers["content-type"] ??
    "multipart/x-mixed-replace; boundary=myboundary"

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false

      const close = () => {
        if (closed) return
        closed = true
        try {
          controller.close()
        } catch {
          upstream.destroy()
        }
      }

      upstream.on("data", (chunk: Buffer) => {
        if (closed) return
        try {
          controller.enqueue(new Uint8Array(chunk))
        } catch {
          upstream.destroy()
        }
      })

      upstream.on("end", close)
      upstream.on("close", close)
      upstream.on("error", () => {
        if (closed) return
        closed = true
        try {
          controller.error(new Error("Camera stream interrupted"))
        } catch {
          upstream.destroy()
        }
      })

      request.signal.addEventListener("abort", () => {
        upstream.destroy()
        close()
      })
    },
    cancel() {
      upstream.destroy()
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Connection: "close",
    },
  })
}
