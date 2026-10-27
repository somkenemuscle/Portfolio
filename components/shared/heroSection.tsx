'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ACCENT, Container, INK, Spark } from './Sketch'
import { latestWithPhoto } from './LogbookShared'

const RESUME_URL = 'https://ipw88zuno5.ufs.sh/f/rXxdhjbFRcsmn6PErT5l8kYXyHG2ceZvwRmFfOCbVuKPWIiB'

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

// The latest Logbook photo, tucked behind the bottom of the swinging frame
// (the sides would cover the headline). Hover or focus pulls it out to show
// it off; click opens that entry.
function PeekingPolaroid() {
  const entry = latestWithPhoto()
  const [out, setOut] = useState(false)
  // the entrance waits for the frame to drop; after that, hover reacts instantly
  const [landed, setLanded] = useState(false)
  if (!entry?.photos) return null
  const photo = entry.photos[0]

  const tucked = { x: 0, y: -80, rotate: 0, opacity: 0 }
  const rest = { x: 0, y: 0, rotate: -8, scale: 1, opacity: 1 }
  const pulled = { x: 8, y: 46, rotate: -3, scale: 1.05, opacity: 1 }

  return (
    <>
      <motion.div
        className="absolute z-0 left-[18px] -bottom-[66px]"
        initial={tucked}
        animate={out ? pulled : rest}
        transition={{ type: 'spring', stiffness: 260, damping: 17, delay: landed ? 0 : 1.1 }}
        onAnimationComplete={() => setLanded(true)}
        onPointerEnter={e => e.pointerType === 'mouse' && setOut(true)}
        onPointerLeave={e => e.pointerType === 'mouse' && setOut(false)}
      >
        <Link
          href={`/logbook#${entry.slug}`}
          aria-label={`Latest from my logbook: ${entry.title}`}
          onFocus={e => e.currentTarget.matches(':focus-visible') && setOut(true)}
          onBlur={() => setOut(false)}
          className="group relative block w-[128px] bg-[#FFFDF8] p-2 pb-2.5 border-[2.5px] border-sb-ink rounded-[5px] shadow-[4px_5px_0_rgba(26,20,16,0.35)] outline-none focus-visible:ring-[3px] focus-visible:ring-sb-ink focus-visible:ring-offset-2"
        >
          <span aria-hidden="true" className="absolute -top-2.5 left-1/2 -ml-7 w-14 h-5 -rotate-6 bg-sb-sun/85 border border-sb-ink/20" />
          <span className="block h-[124px] overflow-hidden rounded-[3px] border-2 border-sb-ink bg-sb-raised">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt="" draggable={false}
              className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-110" />
          </span>
          <span className="block mt-1.5 font-hand text-[17px] leading-tight text-sb-ink truncate">{entry.title}</span>
        </Link>
      </motion.div>

      {/* handwritten pointer, drawn in after the polaroid lands */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute z-20 flex items-start gap-1 font-hand text-[21px] leading-[0.95] text-sb-gum-deep left-[156px] -bottom-[58px]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0, rotate: out ? -2 : -6, scale: out ? 1.06 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: landed ? 0 : 1.6 }}
      >
        <span className="max-w-[110px]">fresh from the logbook</span>
        <svg width="38" height="30" viewBox="0 0 38 30" className="shrink-0 -scale-x-100 mt-1">
          <motion.path
            d="M4 4 C 14 6, 26 12, 30 24 M30 24 L 22 21 M30 24 L 33 16"
            stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 1.8 }}
          />
        </svg>
      </motion.span>
    </>
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
            Backend systems, multi-tenant platforms and the frontends that sit on top of them.
            This site is my sketchbook: what I&apos;m building, learning and thinking about, updated as it happens.
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
          className="flex-[1_1_320px] flex justify-center relative min-h-[460px] pb-20"
        >
          <Spark size={70} className="sb-spin absolute top-10 right-2" />
          <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" className="absolute bottom-24 right-2.5">
            <circle cx="12" cy="12" r="9" fill={ACCENT.gum} stroke={INK} strokeWidth="2" />
          </svg>

          <div className="sb-swing relative flex flex-col items-center pt-1.5">
            <PeekingPolaroid />
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
