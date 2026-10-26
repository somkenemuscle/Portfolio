'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { ACCENT, Container } from './Sketch'

const navLinks = [
  { label: 'Work', href: '/#work', color: ACCENT.sun },
  { label: 'Experience', href: '/#experience', color: ACCENT.peri },
  { label: 'Journal', href: '/blog', color: ACCENT.tomato },
  { label: 'About', href: '/about', color: ACCENT.mint },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  // Past the top: show the solid paper strip. Scrolling down: tuck the bar away;
  // any scroll up brings it straight back.
  useMotionValueEvent(scrollY, 'change', y => {
    const delta = y - lastY.current
    lastY.current = y
    setScrolled(y > 24)
    if (y < 160) setHidden(false)
    else if (delta > 6) setHidden(true)
    else if (delta < -6) setHidden(false)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        className="fixed z-50 top-0 inset-x-0"
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        onFocusCapture={() => setHidden(false)}
      >
        {/* paper strip taped across the top once you scroll */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-sb-paper border-b-[2.5px] border-sb-cream shadow-[0_4px_0_#000]"
          initial={false}
          animate={{ y: scrolled ? '0%' : '-105%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        />
        <Container className={`relative flex items-center justify-between gap-4 transition-[padding] duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
          <Link href="/" className="flex items-center gap-3 group" aria-label="Somkene Ojukwu, home">
            <span className="w-11 h-11 rounded-xl bg-sb-tomato border-[2.5px] border-sb-cream shadow-[3px_3px_0_#000] flex items-center justify-center font-extrabold text-xl text-sb-paper -rotate-6 transition-transform duration-300 group-hover:rotate-6">
              SO
            </span>
            <span className="hidden sm:inline font-extrabold text-xl text-sb-cream">
              somkene
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:flex gap-0.5 p-1.5 bg-sb-card border-[2.5px] border-sb-cream rounded-[18px] shadow-[4px_4px_0_#000]">
            {navLinks.map(({ label, href, color }) => (
              <Link key={label} href={href}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[15px] font-semibold text-sb-cream transition-colors hover:bg-sb-raised hover:text-sb-sun">
                <span aria-hidden="true" className="w-2 h-2 rounded-full self-center" style={{ background: color }} />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/#hi" className="sb-btn bg-sb-sun hidden sm:inline-flex">
              Say hi
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <button
              className="lg:hidden w-12 h-12 flex flex-col justify-center items-center gap-[5px] bg-sb-card border-[2.5px] border-sb-cream rounded-xl shadow-[3px_3px_0_#000]"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }}
                className="block h-[2.5px] w-5 rounded bg-sb-cream origin-center" />
              <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }}
                className="block h-[2.5px] w-5 rounded bg-sb-cream origin-center" />
              <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }}
                className="block h-[2.5px] w-5 rounded bg-sb-cream origin-center" />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col px-6 pt-28 pb-12 bg-sb-paper"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-3">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -24, rotate: -2 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22, delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-5 py-4 bg-sb-card border-[2.5px] border-sb-cream rounded-2xl text-3xl font-extrabold tracking-tight text-sb-cream"
                    style={{ boxShadow: `4px 4px 0 ${l.color}` }}
                  >
                    <span className="flex items-center gap-3">
                      <span aria-hidden="true" className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                      {l.label}
                    </span>
                    <span aria-hidden="true" style={{ color: l.color }}>↗</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link href="/#hi" onClick={() => setOpen(false)} className="sb-btn bg-sb-sun self-start mt-8">Say hi</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
