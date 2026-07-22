'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { Ticker } from '@/components/ticker'
import { CrtBackground } from '@/components/crt-background'
import { useSectionIntro } from '@/hooks/use-section-intro'

/* Sum of the source GIF's frame delays — the moment its one play-through ends */
const HERO_GIF_DURATION_MS = 1470

export function HeroSection() {
  const { ref, playKey, revealed, hasEntered } = useSectionIntro<HTMLElement>(HERO_GIF_DURATION_MS)

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-background pt-24 snap-start snap-always"
    >
      {/* Cinematic intro — the GIF replays each time the hero scrolls into view, then freezes on its last frame */}
      <CrtBackground>
        {!hasEntered ? (
          <div className="h-full w-full bg-background" />
        ) : !revealed ? (
          <img key={`gif-${playKey}`} src="/hero-makoto.gif" alt="" className="h-full w-full object-cover" />
        ) : (
          <img src="/hero-makoto-last.jpg" alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-background/75" />
      </CrtBackground>

      {/* Background layers */}
      <div className="absolute inset-0 grid-lines opacity-25" />
      <div className="pointer-events-none absolute -right-40 top-1/2 hidden aspect-square w-[46rem] -translate-y-1/2 rotate-12 bg-primary/10 clip-card md:block" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 -rotate-12 border-2 border-accent/25" />

      {/* Vertical marquee-ish side label */}
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 md:block">
        <span className="font-mono text-xs uppercase tracking-[0.6em] text-muted-foreground">
          Memento Mori · 2026
        </span>
      </div>

      <div
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 transition-opacity duration-700 md:grid-cols-[1.15fr_0.85fr] md:px-6"
        style={{ opacity: revealed ? 1 : 0, pointerEvents: revealed ? 'auto' : 'none' }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-5 inline-flex items-center gap-2 bg-accent px-3 py-1.5 clip-tag"
          >
            <span className="size-2 bg-accent-foreground" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground">
              Portfolio · Développeur Web
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-balance sm:text-6xl md:text-7xl"
          >
            <span className="block text-foreground">Bonjour, je suis</span>
            <span className="block text-primary">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            {profile.tagline} Titre RNCP · {profile.role} basé à {profile.location}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => go('projects')}
              className="group inline-flex items-center gap-3 bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground clip-arrow transition-transform hover:translate-x-1"
            >
              Voir les projets
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-3 border border-border bg-card px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="size-4" strokeWidth={2.5} />
              Télécharger le CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex gap-8"
          >
            {[
              { k: '6', v: 'Projets' },
              { k: '3', v: 'Blocs RNCP' },
              { k: '2025', v: 'Promo' },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl font-bold text-accent">{s.k}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-3 -rotate-3 border-2 border-primary/40" />
          <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-card clip-card">
            <img
              src="/profile.jpg"
              alt="Portrait de Djoundi Bakari, développeur web"
              className="aspect-square w-3/4 rounded-full object-cover ring-2 ring-primary/40"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur-sm">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
                {profile.name}
              </span>
              <span className="font-mono text-xs text-accent">ID · 0311</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Commercial-banner ticker, integrated as a diagonal streamer across the hero */}
      <Ticker />
    </section>
  )
}
