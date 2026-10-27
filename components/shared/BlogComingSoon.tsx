'use client'

import { motion } from 'framer-motion'
import { BackLink } from './AboutHero'
import { ACCENT, Container, Spark, cycleAccent, cycleTilt, vars } from './Sketch'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

const topics = [
  'Engineering decisions',
  'Building in public',
  'Frontend craft',
  'Backend systems',
  'Career & growth',
  'Creative process',
]

export default function BlogComingSoon() {
  return (
    <Container>
      <section className="min-h-screen pt-32 pb-24 flex flex-col gap-10">
        <motion.div {...enter(0.05)}><BackLink /></motion.div>

        <motion.div {...enter(0.1)} className="sb-card sb-lined relative max-w-[760px] py-12 pr-8 pl-16 sm:pl-20 flex flex-col gap-6"
          style={vars({ '--sh': ACCENT.tomato })}>
          <span aria-hidden="true" className="absolute left-10 sm:left-12 inset-y-0 w-0.5 bg-sb-tomato" />
          <Spark size={60} fill={ACCENT.sun} className="sb-spin absolute -top-6 -right-6" />
          <span className="self-start font-mono text-xs font-bold px-3 py-1 border-2 border-dashed border-sb-tomato text-sb-tomato-deep rounded-md rotate-2">
            COMING SOON
          </span>
          <h1 className="m-0 font-extrabold tracking-[-0.03em] leading-none text-[clamp(40px,5.5vw,68px)] text-sb-ink">
            Thoughts, written down.
          </h1>
          <p className="m-0 text-[17px] leading-relaxed text-[#3B332B]">
            I&apos;m working on a space to write about the things I care about: engineering decisions, building
            products, lessons from shipping real software, and the occasional creative tangent. It&apos;s coming.
          </p>
          <p className="m-0 font-hand text-[26px] text-sb-ink">what I&apos;ll write about:</p>
          <div className="flex flex-wrap gap-3">
            {topics.map((t, i) => (
              <span key={t} className="sb-sticker !text-sm !px-3.5 !py-1.5 !border-sb-ink"
                style={{ ...vars({ '--r': `${cycleTilt(i)}deg` }), background: cycleAccent(i) }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...enter(0.2)}>
          <a href="https://x.com/somkeneOj" target="_blank" rel="noopener noreferrer" className="sb-btn bg-sb-sun">
            Follow along on X ↗
          </a>
        </motion.div>
      </section>
    </Container>
  )
}
