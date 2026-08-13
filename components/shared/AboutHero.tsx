'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

const stats = [
  { label: 'Experience',   value: '5 years'    },
  { label: 'Focus',        value: 'Product & Systems'  },
  { label: 'Currently',    value: 'Beauty Butler'    },
  { label: 'Availability', value: 'Always building'},
]

export default function AboutHero() {
  return (
    <section className="pt-36 pb-16">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Back */}
        <motion.div {...enter(0.05)} className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.28)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.28)')}
          >
            <ArrowLeft size={13} strokeWidth={2} />
            Back
          </Link>
        </motion.div>

        {/* Profile row */}
        <div className="flex items-center gap-10 md:gap-16 mb-14">

          {/* Profile photo — framed, matches hero section */}
          <motion.div
            {...enter(0.1)}
            className="shrink-0 relative"
            style={{ width: 160, height: 190 }}
          >
            {/* nail */}
            <div
              className="absolute rounded-full"
              style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 5,
                height: 5,
                background: '#2a2a2a',
                boxShadow: '0 1px 2px rgba(0,0,0,0.7)',
                zIndex: 2,
              }}
            />

            <motion.div
              style={{ position: 'absolute', top: 0, left: 0, width: 160, transformOrigin: 'top center' }}
              animate={{ rotate: [-3.5, 3.5, -3.5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width={160} height={28} style={{ position: 'absolute', top: 0, left: 0 }}>
                <line x1={80} y1={2} x2={16} y2={26} stroke="rgba(210,210,210,0.55)" strokeWidth={1} />
                <line x1={80} y1={2} x2={144} y2={26} stroke="rgba(210,210,210,0.55)" strokeWidth={1} />
              </svg>

              <motion.div
                className="p-2.5"
                style={{
                  marginTop: 28,
                  background: 'linear-gradient(135deg, #3a3a3a 0%, #202020 45%, #0a0a0a 100%)',
                  boxShadow: `
                    inset 0 1px 1px rgba(255,255,255,0.15),
                    inset 0 -2px 3px rgba(0,0,0,0.6),
                    inset 2px 0 2px rgba(255,255,255,0.06),
                    inset -2px 0 3px rgba(0,0,0,0.5),
                    0 25px 45px -16px rgba(0,0,0,0.65)
                  `,
                }}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
              >
                <div className="p-2" style={{ background: '#1e1e1e' }}>
                  <img
                    src="/assets/images/profile.jpg"
                    alt="Somkene"
                    className="w-32 h-32 object-cover object-[50%_30%] select-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }}
                    draggable={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Name + role */}
          <motion.div {...enter(0.15)}>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase mb-3"
              style={{ color: 'rgba(255,255,255,0.28)' }}>
              About me
            </p>
            <h1 className="font-bold tracking-tight leading-[1.08] mb-2"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#ffffff' }}>
              Somkene Ojukwu
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              Software Engineer &middot;{' '}
              <span style={{
                background: 'linear-gradient(90deg, #00a550 0%, #00a550 25%, #ffffff 50%, #00a550 75%, #00a550 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Lagos, Nigeria
              </span>
            </p>
          </motion.div>
        </div>

        {/* Stat cards — full width row */}
        <motion.div {...enter(0.25)} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl px-5 py-4"
              style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-1.5"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                {s.label}
              </p>
              <p className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>
                {s.value}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
