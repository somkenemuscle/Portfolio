'use client'
import React from 'react'
import { motion } from 'framer-motion'

// Shared Sketchbook bits: accent colours, section headings, and the pop-in
// used as sections scroll into view.

export const ACCENT = {
  sun: '#FFD23F',
  gum: '#FF8FB1',
  mint: '#6FE0B0',
  peri: '#8EA0FF',
  tomato: '#FF6B4A',
  cream: '#F4EBDD',
} as const

export type Accent = keyof typeof ACCENT

// Ink for outlines, shadows and text on the light paper.
export const INK = '#1A1410'

// The accents are too bright to read as text on paper, so text uses these
// darker twins (all pass WCAG AA on the paper colour).
const DEEP: Record<string, string> = {
  [ACCENT.sun]: '#8A6500',
  [ACCENT.gum]: '#C42D63',
  [ACCENT.mint]: '#0E7A4F',
  [ACCENT.peri]: '#3E4FD0',
  [ACCENT.tomato]: '#C63A18',
  [ACCENT.cream]: INK,
}
export const deep = (color: string) => DEEP[color] ?? color

// Cycles through stickers so lists get varied colours and tilts without
// hand-picking each one.
const CYCLE: Accent[] = ['gum', 'sun', 'mint', 'peri', 'tomato', 'cream']
const TILTS = [-4, 3, -2, 5, -5, 2, -1, 4]
export const cycleAccent = (i: number) => ACCENT[CYCLE[i % CYCLE.length]]
export const cycleTilt = (i: number) => TILTS[i % TILTS.length]

// Content written as "[SOMETHING]" is a placeholder still to be filled in.
export const isPlaceholder = (s: string) => /^\[.*\]$/.test(s.trim())

// Style helper for CSS custom properties (TS doesn't allow them on CSSProperties).
export const vars = (v: Record<string, string>) => v as React.CSSProperties

export function Pop({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  label,
  title,
  accent,
  aside,
}: {
  label: string
  title: string
  accent: Accent
  aside?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[13px] tracking-[0.1em]" style={{ color: deep(ACCENT[accent]) }}>
          {label}
        </span>
        <h2 className="m-0 font-extrabold tracking-[-0.03em] leading-none text-[clamp(40px,5vw,64px)]">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-28 pt-28 md:pt-32 flex flex-col gap-9 ${className}`}>
      {children}
    </section>
  )
}

export const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1200px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>
)

export const Spark = ({ size = 70, fill = ACCENT.sun, className = '', style }: {
  size?: number
  fill?: string
  className?: string
  style?: React.CSSProperties
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
    <path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6z" fill={fill} stroke={INK} strokeWidth="1" />
  </svg>
)
