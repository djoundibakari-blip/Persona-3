'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, GitFork, RotateCw, Star } from 'lucide-react'
import { projects } from '@/lib/portfolio-data'
import { SectionHeading } from '@/components/section-heading'
import { CrtBackground } from '@/components/crt-background'
import { useSectionIntro } from '@/hooks/use-section-intro'

/* Sum of the source GIF's frame delays — the moment its one play-through ends */
const PROJECTS_GIF_DURATION_MS = 2220

/* Card width (incl. gap) the arrow buttons scroll the rail by */
const SCROLL_STEP_PX = 312

export function ProjectsSection() {
  const { ref, playKey, revealed, hasEntered } = useSectionIntro<HTMLElement>(PROJECTS_GIF_DURATION_MS)
  const trackRef = useRef<HTMLDivElement>(null)
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set())

  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * SCROLL_STEP_PX, behavior: 'smooth' })
  }

  /* Hover-driven flip only fires where the browser reports a real pointer
     (@media (hover: hover)) — this tap toggle is the fallback for touch. */
  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section ref={ref} id="projects" className="relative h-screen snap-start snap-always">
      <CrtBackground>
        {!hasEntered ? (
          <div className="h-full w-full bg-background" />
        ) : !revealed ? (
          <img key={`gif-${playKey}`} src="/projects-blood.gif" alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <img src="/projects-blood-last.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-background/70" />
      </CrtBackground>
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div
        className="relative mx-auto flex h-full max-w-6xl flex-col px-4 pt-16 transition-opacity duration-700 md:px-6 md:pt-20"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <div className="flex shrink-0 items-end justify-between gap-4">
          <SectionHeading index="02" kicker="Social Links" title="Projets & réalisations" className="flex-1" />
          <div className="mb-1 flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Projet précédent"
              onClick={() => scrollByCard(-1)}
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Projet suivant"
              onClick={() => scrollByCard(1)}
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-8 flex flex-1 items-center gap-6 overflow-x-auto snap-x snap-mandatory px-1 pb-10"
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => toggleFlip(p.id)}
              className="group relative h-[26rem] w-64 shrink-0 cursor-pointer snap-start [perspective:1600px] sm:h-[30rem] sm:w-72"
            >
              <div
                className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${flippedIds.has(p.id) ? '[transform:rotateY(180deg)]' : ''}`}
              >
                {/* FRONT — the arcana card face */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-primary shadow-[6px_6px_0_0_var(--accent)] [backface-visibility:hidden]">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-primary/90 px-3 py-2 text-primary-foreground backdrop-blur-sm">
                    <span className="font-retro text-[9px] uppercase leading-none tracking-widest">{p.arcana}</span>
                    <span className="flex items-center gap-1 font-display text-xs font-bold">
                      <Star className="size-3 fill-current" />
                      {p.rank}
                    </span>
                  </div>

                  <span
                    className={`absolute right-3 top-12 flex size-8 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-transform duration-500 group-hover:rotate-[180deg] ${flippedIds.has(p.id) ? 'rotate-[180deg]' : ''}`}
                  >
                    <RotateCw className="size-3.5" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-4 pt-10">
                    <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-[0.04em] text-white">
                      {p.title}
                    </h3>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-accent">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* BACK — live screenshot + full project detail block */}
                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 border-primary bg-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="relative h-24 shrink-0 overflow-hidden border-b-2 border-primary sm:h-28">
                    <img
                      src={p.screenshot}
                      alt={`Aperçu du site ${p.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                    <span className="absolute left-2 top-2 bg-primary/90 px-1.5 py-0.5 font-mono text-[8px] uppercase leading-none tracking-widest text-primary-foreground">
                      Live
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3">
                    <div className="retro-scrollbar flex-1 overflow-y-auto pr-1">
                      <span className="font-display text-3xl font-bold leading-none text-stroke-accent">
                        {p.id}
                      </span>
                      <h3 className="mt-1.5 font-display text-sm font-bold uppercase leading-tight tracking-[0.05em] text-foreground">
                        {p.title}
                      </h3>
                      <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-accent">
                        {p.category}
                      </span>
                      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{p.description}</p>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="border border-border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wide text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="mt-2 border-t border-border pt-1.5">
                        <span className="font-retro text-[7px] uppercase leading-none tracking-widest text-primary">
                          Compétences RNCP
                        </span>
                        <p className="mt-1 text-[10px] leading-snug text-muted-foreground">
                          {p.competences.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 flex shrink-0 gap-2">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 bg-secondary px-2 py-2 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-secondary-foreground clip-arrow transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <GitFork className="size-3" strokeWidth={2.5} />
                        Code
                      </a>
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 bg-primary px-2 py-2 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-primary-foreground clip-arrow transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        Voir le site
                        <ArrowUpRight className="size-3" strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
