'use client'

import { useEffect, useState } from 'react'

/**
 * Global CRT screen effect — color grading + scanlines + vignette + grain +
 * a slow sweep — fixed over the whole page instead of the old per-section
 * bezel/background treatment, so every section reads through the same tube.
 *
 * The color-grading layer uses backdrop-filter, which forces the browser to
 * resample everything behind it on every frame — cheap while idle, but it
 * measurably drags down scroll frame times (confirmed: ~2-3x longer frames
 * with it on). It's paused for the duration of the scroll and restored once
 * the page settles, so the look stays "always on" without paying that cost
 * mid-scroll.
 */
export function CrtOverlay() {
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setScrolling(false), 200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="crt-global" aria-hidden>
      {!scrolling && <div className="crt-global__grade" />}
      <div className="crt-overlay__vignette" />
      <div className="crt-overlay__scanlines" />
      <div className="crt-overlay__noise" />
      <div className="crt-overlay__sweep" />
    </div>
  )
}
