'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ACCENT, Container, Spark } from './Sketch'

const RESUME_URL = 'https://ipw88zuno5.ufs.sh/f/rXxdhjbFRcsmn6PErT5l8kYXyHG2ceZvwRmFfOCbVuKPWIiB'

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

export default function HeroSection() {
  return (
    <Container>
      <section id="top" className="flex flex-wrap items-center gap-14 pt-36 pb-20">
        <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-6">
          <motion.p {...enter(0)} className="m-0 font-hand text-[34px] text-sb-gum -rotate-2 origin-left">
            hey, I&apos;m Somkene
          </motion.p>
          <motion.h1 {...enter(0.08)} className="m-0 font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,6.4vw,84px)]">
            Software engineer building products from{' '}
            <span className="sb-wavy text-sb-sun">Lagos, Nigeria</span>.
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
          className="flex-[1_1_320px] flex justify-center relative min-h-[460px]"
        >
          <Spark size={70} className="sb-spin absolute top-10 right-2" />
          <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" className="absolute bottom-10 left-2.5">
            <circle cx="12" cy="12" r="9" fill={ACCENT.gum} stroke={ACCENT.cream} strokeWidth="2" />
          </svg>

          <div className="sb-swing flex flex-col items-center pt-1.5">
            {/* nail + string */}
            <svg width="200" height="70" viewBox="0 0 200 70" aria-hidden="true" className="block -mb-1.5">
              <circle cx="100" cy="8" r="7" fill={ACCENT.sun} stroke={ACCENT.cream} strokeWidth="2.5" />
              <path d="M100 10 L22 68 M100 10 L178 68" stroke={ACCENT.cream} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
            <div className="bg-sb-tomato border-[3px] border-sb-cream rounded-[22px] p-4 shadow-[10px_10px_0_#000]">
              <div className="bg-sb-cream rounded-xl p-3 border-[2.5px] border-sb-paper">
                <img
                  src="/assets/images/profile.jpg"
                  alt="Portrait of Somkene"
                  className="block w-[240px] h-[290px] sm:w-[260px] sm:h-[310px] object-cover rounded-lg border-[2.5px] border-sb-paper"
                />
              </div>
            </div>
          </div>
          <p className="absolute -bottom-2 right-2.5 m-0 font-hand text-2xl text-sb-mint -rotate-6">that&apos;s me, swinging</p>
        </motion.div>
      </section>
    </Container>
  )
}
