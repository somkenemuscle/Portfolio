'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationOnLargeScreen } from '@/constants/navigation'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/somkene-ojukwu/' },
  { label: 'Twitter', href: 'https://x.com/somkeneOj' },
  { label: 'Instagram', href: 'https://www.instagram.com/codes.by.oj/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@codes.by.oj' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className="fixed z-50 top-0 inset-x-0 transition-all duration-500"
        style={{
          borderBottom: scrolled && !menuOpen ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          backdropFilter: scrolled && !menuOpen ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled && !menuOpen ? 'blur(24px) saturate(160%)' : 'none',
          background: scrolled && !menuOpen ? 'rgba(0,0,0,0.75)' : 'transparent',
        }}
      >
        <div className="max-w-screen-lg mx-auto px-8 md:px-16 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            {/* <span
              className="w-7 h-7 flex items-center justify-center rounded-md text-[11px] font-bold"
              style={{
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              SO
            </span> */}
            <span className="font-medium">
              Somkene Ojukwu
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navigationOnLargeScreen.map((nav) => (
              <Link
                key={nav.name}
                href={nav.href}
                {...(nav.name === 'Resume' && { target: '_blank', rel: 'noopener noreferrer' })}
                className="text-[13px] px-4 py-2 rounded-full transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.38)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fbcfe8')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.38)')}
              >
                {nav.name}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="block h-px w-6 bg-white origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-6 bg-white origin-center"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="block h-px w-6 bg-white origin-center"
            />
          </button>

        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: '#000' }}
          >
            {/* Dot grid */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Menu content */}
            <div className="relative z-10 flex flex-col justify-center flex-1 px-10 pb-16 pt-24">

              {/* Nav links */}
              <nav className="flex flex-col gap-1 mb-16">
                {navigationOnLargeScreen.map((nav, i) => (
                  <motion.div
                    key={nav.name}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={nav.href}
                      {...(nav.name === 'Resume' && { target: '_blank', rel: 'noopener noreferrer' })}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between py-4 transition-colors duration-200"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <span
                        className="text-[2.2rem] font-bold tracking-tight text-white/70 group-hover:text-pink-200 transition-colors duration-200"
                      >
                        {nav.name}
                      </span>
                      <span className="text-white/20 group-hover:text-pink-200 transition-colors duration-200 text-xl">
                        ↗
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="text-[12px] font-medium text-white/25 hover:text-pink-200 transition-colors duration-150"
                  >
                    {s.label}
                  </a>
                ))}
              </motion.div>

            </div>

            {/* Bottom tag */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 text-center pb-8 text-[11px] text-white/15"
            >
              somkene.com
            </motion.p>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
