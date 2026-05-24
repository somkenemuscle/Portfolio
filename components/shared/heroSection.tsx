'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay, ease: 'easeOut' },
})

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/somkene-ojukwu/' },
  { label: 'Twitter', href: 'https://x.com/somkeneOj' },
  { label: 'Instagram', href: 'https://www.instagram.com/codes.by.oj/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@codes.by.oj' },
]

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="relative overflow-x-clip min-h-screen flex flex-col">

      {/* Mouse spotlight */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px,
            rgba(255,255,255,0.022), transparent 50%)`,
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 20% 50%, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 20% 50%, black 10%, transparent 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-screen-lg mx-auto px-8 md:px-16 pt-28 pb-24">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-8">

          {/* LEFT: Name + role + tagline */}
          <div className="lg:flex-1">

            {/* Name */}
            <div className="-ml-1 mb-14">
              <motion.h1
                {...enter(0.1)}
                className="block font-bold leading-[0.85] tracking-tight"
                style={{ fontSize: 'clamp(3.8rem, 10vw, 8.5rem)', color: '#f5f5f7' }}
              >
                Somkene
              </motion.h1>
              <motion.h1
                {...enter(0.2)}
                className="block font-bold leading-[0.85] tracking-tight text-pink-200"
                style={{ fontSize: 'clamp(3.8rem, 10vw, 8.5rem)'}}
              >
                Ojukwu.
              </motion.h1>
            </div>
            

            {/* Role row — prominent, right under the name */}
            <motion.div {...enter(0.3)} className="flex items-center gap-3 mb-8">
              <span className="tracking-tight ">
                Software Engineer
              </span>
              <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
              <span
                className="text-[14px] font-medium"
                style={{
                  background: 'linear-gradient(90deg, #16a34a 0%, #ffffff 50%, #16a34a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Lagos, Nigeria
              </span>
            </motion.div>

          

            {/* Tagline */}
            <motion.p
              {...enter(0.42)}
              className="text-[15px] leading-[1.75] max-w-[420px]"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              I build scalable systems and clean interfaces.{' '}
              <span style={{ color: 'rgba(255,255,255,0.58)' }}>
                Focused on the details that make software feel right.
              </span>
            </motion.p>
          </div>

          {/* RIGHT: CTAs + socials */}
          <motion.div
            {...enter(0.35)}
            className="lg:w-[200px] flex flex-col gap-6"
          >

            {/* CTAs */}
            <div className="flex flex-col gap-2">
              <Link
                href="#projects"
                className="w-full text-center px-5 py-2.5 rounded-full bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-colors duration-200"
              >
                View Work
              </Link>
              <Link
                href="mailto:somkeneoj@gmail.com"
                className="w-full text-center px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors duration-200"
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  background: 'rgba(255,255,255,0.03)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)'
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)'
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                Get in touch
              </Link>
            </div>

            {/* Thin rule */}
            <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Socials */}
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.25)')}
                >
                  {s.label}
                </a>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  )
}
