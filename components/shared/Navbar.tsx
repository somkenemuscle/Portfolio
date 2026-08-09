'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Mail, Github } from 'lucide-react'
import Link from 'next/link'

const links = [
  { label: 'GitHub', href: 'https://github.com/somkenemuscle', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/somkene-ojukwu/', icon: Linkedin },
  { label: 'Email', href: 'mailto:somkeneoj@gmail.com', icon: Mail },
]

const navLinks = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="fixed z-50 top-5 inset-x-0">
        <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">
          <div
            className="flex items-center justify-between w-full"
            style={{
              background: 'rgba(17,17,17,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '10px 20px',
            }}
          >
            <Link href="/"
              className="text-[12px] font-semibold tracking-[0.16em] uppercase select-none transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.75)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)')}
            >
              Somkene Ojukwu
            </Link>

            <div className="hidden lg:flex items-center gap-5">
              {/* Text nav links */}
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href}
                  className="text-[13px] font-medium transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.38)')}>
                  {label}
                </a>
              ))}

              {/* Divider */}
              <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />

              {/* Icon links */}
              {links.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href}
                  target={label === 'Email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.42)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.42)')}>
                  <Icon size={14} strokeWidth={1.7} />
                </a>
              ))}
            </div>

            <button
              className="lg:hidden flex flex-col justify-center items-center w-7 h-7 gap-[5px]"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }}
                className="block h-px w-5 origin-center" style={{ background: 'rgba(255,255,255,0.7)' }} />
              <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }}
                className="block h-px w-5 origin-center" style={{ background: 'rgba(255,255,255,0.7)' }} />
              <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }}
                className="block h-px w-5 origin-center" style={{ background: 'rgba(255,255,255,0.7)' }} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col px-8 pt-28 pb-12"
            style={{ background: '#111111' }}
          >
            <nav className="flex flex-col gap-0">
              {navLinks.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={() => setOpen(false)}
                  className="py-5 flex items-center justify-between text-[2rem] font-bold tracking-tight"
                  style={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)')}
                >
                  {n.label}
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem' }}>↗</span>
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4 mt-12">
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'Email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
