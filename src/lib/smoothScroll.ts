import type Lenis from 'lenis'
import { useEffect } from 'react'

// Lower = smoother and slower to stop; Lenis default is 0.1.
const LERP = 0.1
// Loaded after first paint so it never competes with the initial load.
const START_DELAY_MS = 1500

function startSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  let lenis: Lenis | null = null
  let cancelled = false
  const timer = window.setTimeout(async () => {
    const { default: LenisCtor } = await import('lenis')
    if (cancelled) return
    // Anchor jumps already honor the scroll-margin-top set for [id] in index.css.
    lenis = new LenisCtor({ lerp: LERP, autoRaf: true, anchors: true })
  }, START_DELAY_MS)

  return () => {
    cancelled = true
    window.clearTimeout(timer)
    lenis?.destroy()
  }
}

export function useSmoothScroll(): void {
  useEffect(() => startSmoothScroll(), [])
}
