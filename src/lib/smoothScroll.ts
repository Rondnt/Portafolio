import type Lenis from 'lenis'
import { useEffect } from 'react'

// Lower = smoother and slower to stop; Lenis default is 0.1.
const LERP = 0.1
// Loaded after first paint so it never competes with the initial load.
const START_DELAY_MS = 1500

let lenis: Lenis | null = null

function startSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

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
    lenis = null
  }
}

export function useSmoothScroll(): void {
  useEffect(() => startSmoothScroll(), [])
}

// Freezes the page behind an overlay (mobile menu). Lenis drives wheel scrolling with scrollTo,
// which ignores overflow: hidden, so it has to be paused too.
export function setScrollLocked(locked: boolean): void {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) lenis?.stop()
  else lenis?.start()
}

// Code-driven scroll (mobile menu links). With Lenis running it has to go through Lenis, or both
// fight over the scroll position.
export function smoothScrollTo(target: HTMLElement): void {
  if (lenis) {
    lenis.scrollTo(target)
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
