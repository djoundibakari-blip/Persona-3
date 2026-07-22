import { Moon } from 'lucide-react'
import { profile, navLinks } from '@/lib/portfolio-data'

export function SiteFooter() {
  return (
    <footer className="snap-end border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center bg-accent text-accent-foreground clip-tag">
                <Moon className="size-4" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold uppercase tracking-[0.25em] text-primary">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {profile.role}. Portfolio hybride d’apprentissage et de présentation — titre RNCP
              Développeur Web.
            </p>
          </div>

          <nav aria-label="Pied de page">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Navigation
            </span>
            <ul className="mt-3 space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="font-display text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Réseaux
            </span>
            <ul className="mt-3 space-y-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {profile.name} · Memento Mori
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Design inspiré de Persona 3 Reload
          </span>
        </div>
      </div>
    </footer>
  )
}
