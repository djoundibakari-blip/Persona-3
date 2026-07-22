import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Chakra_Petch, Geist, Geist_Mono, Rajdhani } from 'next/font/google'
import { CrtOverlay } from '@/components/crt-overlay'
import { TacticalNav } from '@/components/tactical-nav'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
/* Persona 3 Reload's actual in-game UI face is a proprietary licensed font
   (not distributable) — Rajdhani's bold geometric cut is the closest
   freely-hostable stand-in for its display headings. */
const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['500', '600', '700'],
})
/* Chakra Petch's angle-clipped letterforms echo the site's own
   clip-path corner motifs — used for the small tech/HUD labels. */
const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  variable: '--font-chakra-petch',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Djoundi Bakari',
  description:
    'Portfolio de Djoundi Bakari, alternant développeur web (Epitech Lyon). Design inspiré de Persona 3 Reload : projets, compétences RNCP et contact.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1026',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`dark bg-background ${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} ${chakraPetch.variable}`}
    >
      <body className="font-sans antialiased">
        <TacticalNav />
        {children}
        <CrtOverlay />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
