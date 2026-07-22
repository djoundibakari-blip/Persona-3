'use client'

import { Code2, Palette, Rocket, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { CrtBackground } from '@/components/crt-background'
import { useSectionIntro } from '@/hooks/use-section-intro'

/* Sum of the source GIF's frame delays — the moment its one play-through ends */
const ABOUT_GIF_DURATION_MS = 1860

const pillars = [
  {
    icon: Code2,
    title: 'Développement',
    text: 'Code structuré (HTML, CSS, JavaScript, PHP, Java), respect des normes et des bonnes pratiques d’accessibilité.',
  },
  {
    icon: Palette,
    title: 'Design & UI/UX',
    text: 'Maquettes ergonomiques et accessibles, design systems cohérents et interfaces flat design responsive.',
  },
  {
    icon: ShieldCheck,
    title: 'Qualité & Sécurité',
    text: 'Authentification sécurisée, tests unitaires & d’intégration, respect du RGPD et de l’accessibilité.',
  },
  {
    icon: Rocket,
    title: 'Déploiement',
    text: 'Mise en ligne sur serveur, monitoring du lancement et amélioration continue selon les retours.',
  },
]

export function AboutSection() {
  const { ref, playKey, revealed, hasEntered } = useSectionIntro<HTMLElement>(ABOUT_GIF_DURATION_MS)

  return (
    <section ref={ref} id="about" className="relative min-h-screen py-24 snap-start snap-always">
      <CrtBackground>
        {!hasEntered ? (
          <div className="h-full w-full bg-background" />
        ) : !revealed ? (
          <img key={`gif-${playKey}`} src="/about-aigis.gif" alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <img src="/about-aigis-last.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-background/70" />
      </CrtBackground>
      <div
        className="relative mx-auto max-w-6xl px-4 transition-opacity duration-700 md:px-6"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <SectionHeading index="01" kicker="Profil" title="À propos de moi" />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal from="left">
            <div className="relative border-2 border-primary bg-card p-7 shadow-[6px_6px_0_0_var(--accent)]">
              {/* Corner brackets — retro "select cursor" targeting marks */}
              <span className="pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 border-l-2 border-t-2 border-accent" />
              <span className="pointer-events-none absolute -right-1.5 -top-1.5 size-3.5 border-r-2 border-t-2 border-accent" />
              <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-3.5 border-b-2 border-l-2 border-accent" />
              <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 size-3.5 border-b-2 border-r-2 border-accent" />

              {/* Scanline texture on the card face */}
              <div className="retro-scanlines pointer-events-none absolute inset-0" />

              <span className="relative font-retro text-[10px] uppercase leading-none tracking-widest text-accent">
                // biographie
              </span>
              <p className="relative mt-4 text-lg leading-relaxed text-foreground text-pretty">
                Étudiant en Web@cadémie à Epitech Lyon (2025–2027), je recherche une alternance en
                développement web. De la phase de cadrage (cahier des charges, spécifications)
                jusqu’au déploiement, j’accompagne chaque projet avec rigueur et persévérance.
              </p>
              <p className="relative mt-4 leading-relaxed text-muted-foreground text-pretty">
                Bac Général obtenu en 2024 (spécialités NSI et Histoire-Géopolitique) au Lycée
                Claude Louis Berthollet à Annecy. En dehors du code, je suis passionné par les
                mangas et les jeux vidéo (League of Legends, Guilty Gear, Armored Core 6).
              </p>

              <div className="relative mt-6 flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'PHP', 'Java', 'SQL', 'Docker', 'Git', 'Tailwind CSS', 'Bootstrap', 'Spring Boot'].map(
                  (t) => (
                    <span
                      key={t}
                      className="border border-border bg-secondary px-3 py-1 font-mono text-xs uppercase tracking-wider text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} from="right" delay={i * 0.08}>
                <div className="group relative h-full border-2 border-primary bg-card p-6 shadow-[6px_6px_0_0_var(--accent)] transition-colors hover:border-accent">
                  {/* Corner brackets — retro "select cursor" targeting marks */}
                  <span className="pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 border-l-2 border-t-2 border-accent" />
                  <span className="pointer-events-none absolute -right-1.5 -top-1.5 size-3.5 border-r-2 border-t-2 border-accent" />
                  <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-3.5 border-b-2 border-l-2 border-accent" />
                  <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 size-3.5 border-b-2 border-r-2 border-accent" />

                  {/* Scanline texture on the card face */}
                  <div className="retro-scanlines pointer-events-none absolute inset-0" />

                  <div className="relative mb-4 inline-grid size-11 place-items-center border-2 border-primary bg-primary/20 text-primary transition-colors group-hover:border-accent group-hover:bg-accent/20 group-hover:text-accent">
                    <p.icon className="size-5" strokeWidth={2.2} />
                  </div>
                  <h3 className="relative font-display text-lg font-bold uppercase tracking-[0.12em] text-foreground">
                    {p.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
