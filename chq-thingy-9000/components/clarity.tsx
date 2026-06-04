"use client"

import * as React from "react"
import Clarity from "@microsoft/clarity"

export function ClarityAnalytics({ projectId }: { projectId: string }) {
  React.useEffect(() => {
    if (!projectId) {
      return
    }

    Clarity.init(projectId)
  }, [projectId])

  return null
}
