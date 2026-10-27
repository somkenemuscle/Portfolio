'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ACCENT, Container, INK, Spark } from './Sketch'
import { latestWithPhoto } from './HighlightsShared'

const RESUME_URL = 'https://ipw88zuno5.ufs.sh/f/rXxdhjbFRcsmn6PErT5l8kYXyHG2ceZvwRmFfOCbVuKPWIiB'

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

// The latest Highlights photo, tucked into the frame's top-right corner like a
// photo slipped into a mirror. It wiggles every few seconds until someone
// finds it; hover or focus lifts it off the frame; click opens that entry.
function TuckedPolaroid() {
  const entry = latestWithPhoto()
  const [out, setOut] = useState(false)
  // the entrance waits for the frame to drop; after that, hover reacts instantly
  const [landed, setLanded] = useState(false)
  // once someone has found it, stop nudging
  const [found, setFound] = useState(false)
  if (!entry?.photos) return null
  const nudge = landed && !found
  const photo = entry.photos[0]

  return (
    <motion.div
      className="absolute z-20 top-[54px] -right-[20px]"
      style={{ transformOrigin: '30% 80%' }}
      initial={{ x: 40, y: -40, rotate: 28, scale: 0.8, opacity: 0 }}
      animate={out
        ? { x: 10, y: -12, rotate: 3, scale: 1.12, opacity: 1 }
        : { x: 0, y: 0, rotate: 9, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 16, delay: landed ? 0 : 1.1 }}
      onAnimationComplete={() => setLanded(true)}
      onPointerEnter={e => { setFound(true); if (e.pointerType === 'mouse') setOut(true) }}
      onPointerLeave={e => e.pointerType === 'mouse' && setOut(false)}
      onFocus={() => setFound(true)}
    >
      <motion.div
        animate={nudge ? { rotate: [0, -8, 7, -4, 2, 0], y: [0, -6, -3, -4, 0, 0] } : { rotate: 0, y: 0 }}
        transition={nudge ? { duration: 0.75, ease: 'easeInOut', delay: 1.5, repeat: Infinity, repeatDelay: 5.5 } : { type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Link
          href={`/highlights#${entry.slug}`}
          aria-label={`Latest from my highlights: ${entry.title}`}
          onFocus={e => e.currentTarget.matches(':focus-visible') && setOut(true)}
          onBlur={() => setOut(false)}
          className={`group relative block w-[112px] bg-[#FFFDF8] p-1.5 pb-2 border-[2.5px] border-sb-ink rounded-[5px] outline-none transition-shadow duration-300 focus-visible:ring-[3px] focus-visible:ring-sb-ink focus-visible:ring-offset-2 ${out ? 'shadow-[9px_12px_0_rgba(26,20,16,0.35)]' : 'shadow-[3px_4px_0_rgba(26,20,16,0.35)]'}`}
        >
          <span aria-hidden="true" className="absolute -top-2.5 left-1/2 -ml-6 w-12 h-[18px] rotate-[-8deg] bg-sb-sun/85 border border-sb-ink/20" />
          <span className="block h-[104px] overflow-hidden rounded-[3px] border-2 border-sb-ink bg-sb-raised">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt="" draggable={false}
              className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-110" />
          </span>
          <span className="flex items-center justify-between gap-1 mt-1.5 px-0.5">
            <span className="font-hand text-[17px] leading-none text-sb-ink">latest</span>
            <span aria-hidden="true" className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-sb-gum border-[1.5px] border-sb-ink text-sb-ink transition-transform group-hover:-rotate-6 group-hover:scale-110">
              SEE ↗
            </span>
          </span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <Container>
      <section id="top" className="flex flex-wrap items-center gap-14 pt-36 pb-20">
        <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-6">
          <motion.p {...enter(0)} className="m-0 font-hand text-[34px] text-sb-gum-deep -rotate-2 origin-left">
            hey, I&apos;m Somkene
          </motion.p>
          <motion.h1 {...enter(0.08)} className="m-0 font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,6.4vw,84px)]">
            Software engineer building products from{' '}
            <span className="sb-wavy">Lagos, Nigeria</span>.
          </motion.h1>
          <motion.p {...enter(0.16)} className="m-0 text-xl leading-relaxed text-sb-soft max-w-[560px]">
            I build products end to end, from the backend systems that run them to the frontends people use.
            This site is my sketchbook: what I&apos;m building, learning and thinking about.
          </motion.p>
          <motion.div {...enter(0.24)} className="flex flex-wrap items-center gap-3.5 pt-1.5">
            <Link href="#work" className="sb-btn bg-sb-mint">See my work</Link>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="sb-btn bg-sb-cream">
              Download resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -60, rotate: -12 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
          className="flex-[1_1_320px] flex justify-center relative min-h-[460px]"
        >
          <Spark size={70} className="sb-spin absolute top-10 left-2" />
          <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" className="absolute bottom-10 left-2.5">
            <circle cx="12" cy="12" r="9" fill={ACCENT.gum} stroke={INK} strokeWidth="2" />
          </svg>

          <div className="sb-swing relative flex flex-col items-center pt-1.5">
            <TuckedPolaroid />
            {/* nail + string */}
            <svg width="200" height="70" viewBox="0 0 200 70" aria-hidden="true" className="block -mb-1.5">
              <circle cx="100" cy="8" r="7" fill={ACCENT.sun} stroke={INK} strokeWidth="2.5" />
              <path d="M100 10 L22 68 M100 10 L178 68" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
            <div className="relative z-10 bg-sb-tomato border-[3px] border-sb-ink rounded-[22px] p-4 shadow-[10px_10px_0_#1A1410]">
              <div className="bg-sb-cream rounded-xl p-3 border-[2.5px] border-sb-ink">
                <img
                  src="/assets/images/profile.jpg"
                  alt="Portrait of Somkene"
                  className="block w-[240px] h-[290px] sm:w-[260px] sm:h-[310px] object-cover rounded-lg border-[2.5px] border-sb-ink"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </Container>
  )
}
