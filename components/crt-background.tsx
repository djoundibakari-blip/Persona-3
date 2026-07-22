import type { ReactNode } from 'react'

/**
 * Positions a section's own background (a flat color, an image, or a GIF).
 * The CRT color grading/scanlines/vignette live in the global overlay
 * (see CrtOverlay) so every section reads through the same screen instead
 * of each re-applying its own.
 */
export function CrtBackground({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden>
      {children}
    </div>
  )
}
