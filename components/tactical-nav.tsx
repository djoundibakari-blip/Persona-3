'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Moon } from 'lucide-react'
import { navLinks, profile } from '@/lib/portfolio-data'

/* Slight, alternating tilt + skew so the mobile menu cards read as "crooked" — like the P3R pause menu */
const CARD_TILT = [-2, 1.5, -2.5, 2, -1.5]
const CARD_SKEW = [-3, -5, 2, -2, 3]

export function TacticalNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // deterministic scroll on load/reload — don't let the browser silently
    // restore the previous scroll position behind our back
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  const resetPage = () => {
    // scroll to top *before* reloading — otherwise the browser's scroll
    // restoration re-applies the current scroll position after reload
    window.scrollTo(0, 0)
    window.location.reload()
  }

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-menu-cyan/25' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-4 pt-3 md:px-6">
          <button
            onClick={resetPage}
            title="Réinitialiser la page"
            className="group flex items-center gap-2 font-display text-lg font-bold uppercase italic tracking-[0.25em] text-foreground"
          >
            <span className="grid size-8 place-items-center bg-gradient-to-br from-menu-cyan to-menu-cyan-deep text-background clip-tag">
              <Moon className="size-4" strokeWidth={2.5} />
            </span>
            <span className="text-menu-red">S.E.E.S</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <li key={link.id} className="relative">
                <button
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered((h) => (h === link.id ? null : h))}
                  onClick={() => go(link.id)}
                  className="group relative flex items-center gap-2 px-4 py-2 font-display text-sm font-bold italic uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-150 hover:text-menu-red"
                >
                  {hovered === link.id && (
                    <motion.span
                      layoutId="nav-cursor"
                      className="absolute left-0 top-1/2 size-0 -translate-y-1/2 border-y-[6px] border-l-[9px] border-y-transparent border-l-menu-red"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="ml-2 rounded-[2px] bg-gradient-to-br from-menu-cyan to-menu-cyan-deep px-1.5 py-0.5 font-mono text-[10px] not-italic text-background">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center bg-menu-red text-background clip-tag md:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-5" strokeWidth={2.5} />
          </button>
        </nav>
      </header>

      {/* Full-screen game-style menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-hidden bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 grid-lines opacity-40" />

            {/* Oversized watermark label bleeding off-screen — echoes the pause menu's giant side text */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none font-display text-6xl font-black uppercase text-stroke-accent opacity-25"
              style={{ writingMode: 'vertical-rl' }}
            >
              S.E.E.S
            </span>

            <div className="relative flex h-full flex-col p-4 pb-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm uppercase italic tracking-[0.35em] text-menu-red">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center bg-menu-red text-background clip-tag"
                  aria-label="Fermer le menu"
                >
                  <X className="size-5" strokeWidth={2.5} />
                </button>
              </div>

              <ul className="mt-12 flex flex-1 flex-col justify-center gap-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 60, rotate: 0, skewX: 0 }}
                    animate={{
                      opacity: 1,
                      x: i * 10,
                      rotate: CARD_TILT[i % CARD_TILT.length],
                      skewX: CARD_SKEW[i % CARD_SKEW.length],
                    }}
                    whileHover={{ rotate: 0, skewX: 0, scale: 1.05, x: i * 10 + 10 }}
                    transition={{ delay: 0.06 * i, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left center' }}
                  >
                    <button
                      onClick={() => go(link.id)}
                      className="flex w-full items-center gap-4 bg-gradient-to-r from-menu-cyan-deep/85 to-menu-cyan/70 px-5 py-4 text-left clip-arrow transition-colors hover:from-menu-red/90 hover:to-menu-red/70"
                    >
                      <span className="grid size-7 place-items-center bg-background/20 font-mono text-sm font-bold text-background clip-cursor">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-2xl font-black italic uppercase tracking-[0.08em] text-background">
                        {link.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="flex gap-4 pt-6">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-menu-red"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
