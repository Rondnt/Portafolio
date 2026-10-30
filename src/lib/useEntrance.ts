import { useEffect, useRef, useState, type RefObject } from 'react'

// Starts an entrance animation when the element scrolls into view. `scheduledMs` is its slot in the
// section's timeline, counted from the moment the first element of that section (sharing `clock`)
// appeared: elements visible together keep their order, while ones reached later by scrolling
// play right away instead of waiting out a delay that has already passed.
export function useEntrance<T extends Element>(
  clock: RefObject<number | null>,
  scheduledMs: number,
  amount = 0.2,
) {
  const ref = useRef<T>(null)
  const [state, setState] = useState({ visible: false, delay: 0 })
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || done.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const now = performance.now()
        clock.current ??= now
        done.current = true
        setState({ visible: true, delay: Math.max(0, scheduledMs - (now - clock.current)) })
        observer.disconnect()
      },
      { threshold: amount },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [clock, scheduledMs, amount])

  return { ref, ...state }
}
