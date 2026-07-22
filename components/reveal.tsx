'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** direction the element slides in from */
  from?: 'left' | 'right' | 'up' | 'down'
}

const offsets = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
}

export function Reveal({ children, className, delay = 0, from = 'up' }: RevealProps) {
  const offset = offsets[from]
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, skewX: from === 'left' || from === 'right' ? -6 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0, skewX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
