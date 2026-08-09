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
              href="https://ipw88zuno5.ufs.sh/f/rXxdhjbFRcsmBXN272AUhgmKYwtQzGVMp1x37cAZOrsqafbd"
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

          <motion.div
            {...enter(0.25)}
            className="hidden md:block shrink-0 relative"
            style={{ width: 220, height: 258 }}
          >
            {/* nail */}
            <div
              className="absolute rounded-full"
              style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 6,
                height: 6,
                background: '#2a2a2a',
                boxShadow: '0 1px 2px rgba(0,0,0,0.7)',
                zIndex: 2,
              }}
            />

            <motion.div
              style={{ position: 'absolute', top: 0, left: 0, width: 220, transformOrigin: 'top center' }}
              animate={{ rotate: [-3.5, 3.5, -3.5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width={220} height={38} style={{ position: 'absolute', top: 0, left: 0 }}>
                <line x1={110} y1={2} x2={22} y2={36} stroke="rgba(210,210,210,0.55)" strokeWidth={1} />
                <line x1={110} y1={2} x2={198} y2={36} stroke="rgba(210,210,210,0.55)" strokeWidth={1} />
              </svg>

              <motion.div
                className="p-3"
                style={{
                  marginTop: 38,
                  background: 'linear-gradient(135deg, #8a5a34 0%, #5e3c20 45%, #3d2712 100%)',
                  boxShadow: `
                    inset 0 1px 1px rgba(255,255,255,0.35),
                    inset 0 -2px 3px rgba(0,0,0,0.5),
                    inset 2px 0 2px rgba(255,255,255,0.12),
                    inset -2px 0 3px rgba(0,0,0,0.4),
                    0 25px 45px -16px rgba(0,0,0,0.65)
                  `,
                }}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
              >
                <div className="p-2.5" style={{ background: '#efe8da' }}>
                  <img
                    src="/assets/images/profile.jpg"
                    alt="Somkene"
                    className="w-44 h-44 object-cover object-[50%_30%] select-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }}
                    draggable={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
