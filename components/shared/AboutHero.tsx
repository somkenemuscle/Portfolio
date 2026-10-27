'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ACCENT, Container, INK, Spark, deep, vars } from './Sketch'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

const stats = [
  { label: 'Experience', value: '5 years', accent: ACCENT.gum },
  { label: 'Focus', value: 'Product & Systems', accent: ACCENT.sun },
  { label: 'Currently', value: 'Alkademy', accent: ACCENT.mint },
  { label: 'Availability', value: 'Always building', accent: ACCENT.peri },
]

export function BackLink({ href = '/', label = 'back home' }: { href?: string; label?: string }) {
  return (
    <Link href={href}
      className="inline-flex items-center gap-2 font-mono text-[13px] text-sb-muted px-3 py-2 -ml-3 rounded-lg transition-colors hover:text-sb-tomato-deep hover:bg-sb-card">
      <span aria-hidden="true">←</span> {label}
    </Link>
  )
}

export default function AboutHero() {
  return (
    <Container>
      <section className="pt-32 pb-6">
        <motion.div {...enter(0.05)} className="mb-10">
          <BackLink />
        </motion.div>

        <div className="flex flex-wrap items-center gap-x-14 gap-y-10 mb-14">
          {/* Mini version of the homepage's swinging frame */}
          <motion.div
            initial={{ opacity: 0, y: -40, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.1 }}
            className="relative shrink-0"
          >
            <Spark size={46} className="sb-spin absolute -top-2 -right-8 z-10" />
            <div className="sb-swing flex flex-col items-center">
              <svg width="150" height="50" viewBox="0 0 150 50" aria-hidden="true" className="block -mb-1">
                <circle cx="75" cy="7" r="6" fill={ACCENT.sun} stroke={INK} strokeWidth="2.5" />
                <path d="M75 9 L16 48 M75 9 L134 48" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              <div className="bg-sb-peri border-[3px] border-sb-ink rounded-[18px] p-3 shadow-[8px_8px_0_#1A1410]">
                <div className="bg-sb-cream rounded-[10px] p-2 border-[2.5px] border-sb-ink">
                  <img
                    src="/assets/images/profile.jpg"
                    alt="Somkene"
                    draggable={false}
                    className="block w-[150px] h-[170px] object-cover object-[50%_30%] rounded-md border-[2.5px] border-sb-ink select-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...enter(0.15)} className="flex-[1_1_320px] min-w-0 flex flex-col gap-3">
            <span className="font-mono text-[13px] tracking-[0.1em] text-sb-gum-deep">ABOUT ME</span>
            <h1 className="m-0 font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,6.4vw,84px)]">
              Somkene Ojukwu
            </h1>
            <p className="m-0 text-xl text-sb-soft font-medium">
              Software Engineer · <span className="sb-wavy">Lagos, Nigeria</span>
            </p>
            <p className="m-0 mt-2 font-hand text-[26px] text-sb-mint-deep -rotate-1 origin-left">
              artist first, engineer second (or both at once)
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...enter(0.25 + i * 0.06)}>
              <div className="sb-card sb-card-hover px-5 py-4 h-full"
                style={vars({ '--sh': s.accent })}>
                <p className="m-0 mb-1.5 font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: deep(s.accent) }}>
                  {s.label}
                </p>
                <p className="m-0 text-lg font-extrabold leading-tight">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Container>
  )
}
