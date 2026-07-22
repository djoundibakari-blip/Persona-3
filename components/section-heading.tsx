import { Reveal } from '@/components/reveal'

type Props = {
  index: string
  kicker: string
  title: string
  className?: string
}

export function SectionHeading({ index, kicker, title, className }: Props) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4">
        <span className="bg-accent px-2.5 py-1 font-mono text-sm font-bold text-accent-foreground clip-tag">
          {index}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary">{kicker}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-foreground text-balance sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  )
}
