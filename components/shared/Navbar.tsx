'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { navigationOnLargeScreen } from '@/constants/navigation'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed z-50 top-0 inset-x-0 transition-all duration-500"
      style={{
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        background: scrolled ? 'rgba(0,0,0,0.75)' : 'transparent',
      }}
    >
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
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
          <span
            className="hidden sm:block text-[13px] font-medium"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Somkene Ojukwu
          </span>
        </Link>

        {/* Desktop nav — right aligned */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navigationOnLargeScreen.map((nav) => (
            <Link
              key={nav.name}
              href={nav.href}
              {...(nav.name === 'Resume' && { target: '_blank', rel: 'noopener noreferrer' })}
              className="text-[13px] px-4 py-2 rounded-full transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.38)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.88)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.38)')}
            >
              {nav.name}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-4">
          <Link
            href="#projects"
            className="text-[12px] font-medium"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Work
          </Link>
          <Link
            href="https://t4bg270yk4.ufs.sh/f/yvg0jlQbOFCvyv8c8ZybOFCvs3G4oILpNZdq7l10V6DzPMUn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Resume
          </Link>
        </nav>

      </div>
    </header>
  )
}

export default Navbar
