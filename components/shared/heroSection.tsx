'use client'

import { motion } from 'framer-motion'
import { ArrowDownToLine } from 'lucide-react'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function HeroSection() {
  return (
    <section className="pt-56 pb-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">
        <div className="flex items-center justify-between gap-8">

          <motion.div {...enter(0.1)}>
            <h1 className="font-bold leading-[1.15] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: '#ffffff' }}>
              I&apos;m Somkene ✌️
            </h1>
            <h1 className="font-bold leading-[1.15] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: '#ffffff' }}>
              Software engineer building
            </h1>
            <h1 className="font-bold leading-[1.15] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: 'rgba(255,255,255,0.38)' }}>
              products from{' '}
              <span style={{
                background: 'linear-gradient(90deg, #00a550 0%, #00a550 25%, #ffffff 50%, #00a550 75%, #00a550 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Lagos, Nigeria
              </span>
            </h1>

            <motion.a
              {...enter(0.3)}
              href="https://t4bg270yk4.ufs.sh/f/yvg0jlQbOFCvyv8c8ZybOFCvs3G4oILpNZdq7l10V6DzPMUn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-8"
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.55)',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              whileHover={{
                borderColor: 'rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
              }}
            >
              <ArrowDownToLine size={14} strokeWidth={1.8} />
              Download CV
            </motion.a>
          </motion.div>

          <motion.div {...enter(0.25)} className="hidden md:block shrink-0">
            <img
              src="/assets/images/bitmoji.avif"
              alt="Somkene"
              className="w-44 h-auto select-none"
              draggable={false}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
