"use client"

import * as React from "react"
import { Loader2, VideoOff, RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type StreamStatus = "loading" | "live" | "error"

const STREAM_ENDPOINT = "/api/stream"

export function CameraStream({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<StreamStatus>("loading")
  const [nonce, setNonce] = React.useState(0)

  React.useEffect(() => {
    setNonce(Date.now())
  }, [])

  const src = `${STREAM_ENDPOINT}?t=${nonce}`

  const reconnect = React.useCallback(() => {
    setStatus("loading")
    setNonce(Date.now())
  }, [])

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl border bg-black shadow-2xl",
        className
      )}
    >
      {nonce !== 0 && (
        <img
          key={nonce}
          src={src}
          alt="CHQ live camera feed"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            status === "live" ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setStatus("live")}
          onError={() => setStatus("error")}
        />
      )}

      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="size-7 animate-spin" />
          <span className="text-sm tracking-wide">Connecting to camera</span>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <VideoOff className="size-8" />
          <span className="text-sm tracking-wide">Stream unavailable</span>
          <Button variant="secondary" size="sm" onClick={reconnect}>
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
