const words = [
  'FRONT-END',
  'BACK-END',
  'ACCESSIBILITÉ',
  'RESPONSIVE',
  'FULL-STACK',
  'DOCKER',
  'JAVA',
  'SPRING BOOT',
]

export function Ticker() {
  const row = [...words, ...words]
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[-8%] bottom-8 z-20 -rotate-2 border-y-[3px] border-accent-foreground/80 bg-accent py-2.5 text-accent-foreground shadow-[0_12px_28px_rgba(0,0,0,0.55)] md:bottom-12"
    >
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-sm font-bold uppercase tracking-[0.3em]">{w}</span>
              <span className="size-2 rotate-45 bg-accent-foreground" />
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8"
        >
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-sm font-bold uppercase tracking-[0.3em]">{w}</span>
              <span className="size-2 rotate-45 bg-accent-foreground" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
