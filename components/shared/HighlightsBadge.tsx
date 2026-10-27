'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { latestWithPhoto } from './HighlightsShared'

const MotionLink = motion(Link)

// A spinning "see my highlights" badge pinned to the bottom-right of the
// homepage. It rolls in once you've scrolled past the hero (where the tucked
// polaroid already points there), with the latest highlight photo in the middle,
// and ducks out while the Experience section passes behind it.
export default function HighlightsBadge() {
  const [scrolled, setScrolled] = useState(false)
  // the Experience rows keep their dates at the right edge, so step aside there
  const [overExperience, setOverExperience] = useState(false)
  const photo = latestWithPhoto()?.photos?.[0]
  const show = scrolled && !overExperience

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const section = document.getElementById('experience')
    if (!section) return
    // only the bottom of the screen matters, since that's where the badge sits
    const io = new IntersectionObserver(([e]) => setOverExperience(e.isIntersecting), { rootMargin: '-70% 0px 0px 0px' })
    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <MotionLink
          key="badge"
          href="/highlights"
          aria-label="See my highlights"
          initial={{ scale: 0, rotate: -120, x: 40 }}
          animate={{ scale: 1, rotate: 0, x: 0 }}
          exit={{ scale: 0, rotate: 90, x: 40, transition: { duration: 0.25, ease: 'easeIn' } }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          whileHover="hover"
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 block w-[92px] h-[92px] sm:w-[118px] sm:h-[118px] rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-sb-peri focus-visible:ring-offset-4 focus-visible:ring-offset-sb-paper"
        >
          <motion.span
            variants={{ hover: { scale: 1.08, rotate: -6 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
            className="absolute inset-0 rounded-full bg-sb-sun border-[2.5px] border-sb-ink shadow-[4px_4px_0_#1A1410]"
          >
            {/* the ring of text spins; speeds up on hover */}
            <svg viewBox="0 0 120 120" aria-hidden="true"
              className="absolute inset-0 w-full h-full animate-[sb-spin_14s_linear_infinite] group-hover:[animation-duration:5s]">
              <defs>
                <path id="badge-ring" d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" />
              </defs>
              <text fontSize="11" fill="#1A1410" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                <textPath href="#badge-ring" textLength="282" lengthAdjust="spacing">
                  SEE MY HIGHLIGHTS ✦ SEE MY HIGHLIGHTS ✦
                </textPath>
              </text>
            </svg>
            {/* the middle: latest photo, flips to an arrow on hover */}
            <span className="absolute inset-[24%] rounded-full overflow-hidden border-[2.5px] border-sb-ink bg-sb-gum">
              {photo && (
                <img src={photo.src} alt="" draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              )}
              <span aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-sb-gum text-sb-ink text-2xl font-extrabold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="inline-block -translate-x-1 translate-y-1 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">↗</span>
              </span>
            </span>
          </motion.span>
        </MotionLink>
      )}
    </AnimatePresence>
  )
}
