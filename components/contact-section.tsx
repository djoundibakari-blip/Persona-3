'use client'

import { useState } from 'react'
import { Download, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CrtBackground } from '@/components/crt-background'
import { useSectionIntro } from '@/hooks/use-section-intro'

/* Sum of the source GIF's frame delays — the moment its one play-through ends */
const CONTACT_GIF_DURATION_MS = 1650

export function ContactSection() {
  const { ref, playKey, revealed, hasEntered } = useSectionIntro<HTMLElement>(CONTACT_GIF_DURATION_MS)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error()
      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 4000)
    } catch {
      setError(true)
      setTimeout(() => setError(false), 4000)
    }
  }

  const coordinates = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: Phone,
      label: 'Téléphone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, '')}`,
    },
    { icon: MapPin, label: 'Localisation', value: profile.location },
  ]

  return (
    <section ref={ref} id="contact" className="relative min-h-screen py-24 snap-start snap-always">
      <CrtBackground>
        {!hasEntered ? (
          <div className="h-full w-full bg-background" />
        ) : !revealed ? (
          <img key={`gif-${playKey}`} src="/contact-red.gif" alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <img src="/contact-red-last.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-background/70" />
      </CrtBackground>
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div
        className="relative mx-auto max-w-6xl px-4 transition-opacity duration-700 md:px-6"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <SectionHeading index="04" kicker="Rendez-vous" title="Prenons contact" />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Coordinates */}
          <Reveal from="left">
            <div className="relative flex h-full flex-col justify-between gap-6 border-2 border-accent bg-primary p-7 text-primary-foreground shadow-[6px_6px_0_0_var(--accent)]">
              {/* Corner brackets — retro "select cursor" targeting marks (white so they read against the accent border) */}
              <span className="pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 border-l-2 border-t-2 border-primary-foreground" />
              <span className="pointer-events-none absolute -right-1.5 -top-1.5 size-3.5 border-r-2 border-t-2 border-primary-foreground" />
              <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-3.5 border-b-2 border-l-2 border-primary-foreground" />
              <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 size-3.5 border-b-2 border-r-2 border-primary-foreground" />

              {/* Scanline texture on the card face */}
              <div className="retro-scanlines pointer-events-none absolute inset-0" />

              <div className="relative">
                <h3 className="font-display text-2xl font-bold uppercase tracking-[0.1em]">
                  Coordonnées
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  Une idée de projet, une opportunité ou une simple question ? Écrivez-moi, je
                  réponds sous 24 h.
                </p>

                <ul className="mt-8 space-y-5">
                  {coordinates.map((c) => {
                    const content = (
                      <>
                        <span className="grid size-10 shrink-0 place-items-center border-2 border-accent bg-accent/20 text-accent">
                          <c.icon className="size-4" strokeWidth={2.4} />
                        </span>
                        <span>
                          <span className="block font-retro text-[9px] uppercase leading-none tracking-widest text-primary-foreground/70">
                            {c.label}
                          </span>
                          <span className="font-display text-sm font-semibold tracking-wide">
                            {c.value}
                          </span>
                        </span>
                      </>
                    )
                    return (
                      <li key={c.label}>
                        {c.href ? (
                          <a href={c.href} className="flex items-center gap-3 hover:text-accent">
                            {content}
                          </a>
                        ) : (
                          <span className="flex items-center gap-3">{content}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <a
                href="/cv.pdf"
                download
                className="relative inline-flex items-center justify-center gap-2 bg-accent px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-accent-foreground clip-arrow transition-transform hover:translate-x-1"
              >
                <Download className="size-4" strokeWidth={2.5} />
                Télécharger mon CV (PDF)
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal from="right">
            <form
              onSubmit={onSubmit}
              className="relative border-2 border-primary bg-card p-7 shadow-[6px_6px_0_0_var(--accent)]"
            >
              {/* Corner brackets — retro "select cursor" targeting marks */}
              <span className="pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 border-l-2 border-t-2 border-accent" />
              <span className="pointer-events-none absolute -right-1.5 -top-1.5 size-3.5 border-r-2 border-t-2 border-accent" />
              <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-3.5 border-b-2 border-l-2 border-accent" />
              <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 size-3.5 border-b-2 border-r-2 border-accent" />

              {/* Scanline texture on the card face */}
              <div className="retro-scanlines pointer-events-none absolute inset-0" />

              <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Nom" name="name" placeholder="Votre nom" />
                <Field label="Email" name="email" type="email" placeholder="vous@exemple.com" />
              </div>
              <div className="relative mt-5">
                <Field label="Sujet" name="subject" placeholder="Objet de votre message" />
              </div>
              <div className="relative mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block font-retro text-[10px] uppercase leading-none tracking-widest text-primary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre projet…"
                  className="w-full resize-none border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                />
              </div>

              <button
                type="submit"
                className="relative mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
              >
                {sent ? 'Message envoyé ✓' : error ? 'Erreur — réessayez' : 'Envoyer le message'}
                {!sent && !error && <Send className="size-4" strokeWidth={2.5} />}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-retro text-[10px] uppercase leading-none tracking-widest text-primary"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
      />
    </div>
  )
}
