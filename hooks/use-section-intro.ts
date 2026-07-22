'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Replays a section's background GIF every time the section scrolls into
 * view: hides the info, restarts the GIF from its first frame, then once
 * it has had time to play through once (`durationMs`, the GIF's own total
 * frame duration), freezes on its last frame and reveals the section info.
 */
export function useSectionIntro<T extends HTMLElement>(durationMs: number) {
  const ref = useRef<T>(null)
  const [playKey, setPlayKey] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // A low threshold — sections taller than the viewport (common on narrow/
    // mobile layouts, where content stacks into a single column) can never
    // satisfy a high one, since only a fraction of their height ever fits
    // on screen at once. Firing as soon as the section starts entering is
    // enough signal that the user has scrolled to it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(false)
          setPlayKey((k) => k + 1)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (playKey === 0) return
    setRevealed(false)
    const t = setTimeout(() => setRevealed(true), durationMs)
    return () => clearTimeout(t)
  }, [playKey, durationMs])

  return { ref, playKey, revealed, hasEntered: playKey > 0 }
}
