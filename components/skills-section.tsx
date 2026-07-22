'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { competenceBlocks } from '@/lib/portfolio-data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CrtBackground } from '@/components/crt-background'
import { useSectionIntro } from '@/hooks/use-section-intro'

/* Sum of the source GIF's frame delays — the moment its one play-through ends */
const SKILLS_GIF_DURATION_MS = 1980

export function SkillsSection() {
  const { ref, playKey, revealed, hasEntered } = useSectionIntro<HTMLElement>(SKILLS_GIF_DURATION_MS)

  return (
    <section ref={ref} id="skills" className="relative min-h-screen py-24 snap-start snap-always">
      <CrtBackground>
        {!hasEntered ? (
          <div className="h-full w-full bg-secondary/40" />
        ) : !revealed ? (
          <img key={`gif-${playKey}`} src="/skills-grey.gif" alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <img src="/skills-grey-last.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-background/70" />
      </CrtBackground>
      <div
        className="relative mx-auto max-w-6xl px-4 transition-opacity duration-700 md:px-6"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <SectionHeading
          index="03"
          kicker="Status"
          title="Compétences & progression"
        />

        <Reveal>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground text-pretty">
            Auto-évaluation de ma progression sur les trois blocs de compétences du titre RNCP.
            Chaque bloc est relié à mes réalisations : de la conception au déploiement, jusqu’à
            l’assurance qualité.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {competenceBlocks.map((b, i) => (
            <motion.div
              key={b.block}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col border-2 border-primary bg-card p-6 shadow-[6px_6px_0_0_var(--accent)]"
            >
              {/* Corner brackets — retro "select cursor" targeting marks */}
              <span className="pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 border-l-2 border-t-2 border-accent" />
              <span className="pointer-events-none absolute -right-1.5 -top-1.5 size-3.5 border-r-2 border-t-2 border-accent" />
              <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-3.5 border-b-2 border-l-2 border-accent" />
              <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 size-3.5 border-b-2 border-r-2 border-accent" />

              {/* Scanline texture on the card face */}
              <div className="retro-scanlines pointer-events-none absolute inset-0" />

              <div className="relative flex items-center justify-between gap-3">
                <span className="font-retro text-[10px] leading-none tracking-widest text-primary">
                  BLOC {String(i + 1).padStart(2, '0')}
                </span>
                <span className="size-2 shrink-0 animate-pulse bg-accent" />
              </div>

              <h3 className="relative mt-3 font-display text-lg font-bold uppercase leading-tight tracking-[0.06em] text-foreground">
                {b.block}
              </h3>

              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{b.summary}</p>

              <ul className="relative mt-5 space-y-2.5">
                {b.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-mono text-sm text-foreground/90">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center border border-accent bg-accent/20 text-accent">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
