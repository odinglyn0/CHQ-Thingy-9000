"use client"

import * as React from "react"
import { VideoOff, RefreshCw } from "lucide-react"
import { Loader } from "rsuite"
import "rsuite/dist/rsuite-no-reset.min.css"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type StreamStatus = "loading" | "live" | "error"

const STREAM_ENDPOINT = "/api/stream"

export function CameraStream() {
  const [status, setStatus] = React.useState<StreamStatus>("loading")
  const [nonce, setNonce] = React.useState(0)

  React.useEffect(() => {
    setNonce(Date.now())
  }, [])

  const reconnect = React.useCallback(() => {
    setStatus("loading")
    setNonce(Date.now())
  }, [])

  return (
    <>
      {nonce !== 0 && (
        <img
          key={nonce}
          src={`${STREAM_ENDPOINT}?t=${nonce}`}
          alt="CHQ Building live camera feed"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 select-none",
            status === "live" ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setStatus("live")}
          onError={() => setStatus("error")}
        />
      )}

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader speed="fast" inverse />
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
    </>
  )
}
