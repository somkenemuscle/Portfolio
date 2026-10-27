'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Pauses the looping CSS animations in any <section> that's off-screen and
// resumes them just before it scrolls back in, so dozens of idle loops
// (the desk, the drawings, the story strip) never compete with scrolling.
export default function AnimationPauser() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('sb-paused', !e.isIntersecting)),
      { rootMargin: '200px 0px' },
    )
    const watch = () => document.querySelectorAll('section').forEach(s => io.observe(s))
    watch()
    // sections that mount a moment later (client-only parts) get picked up too
    const t = setTimeout(watch, 1000)
    return () => { clearTimeout(t); io.disconnect() }
  }, [pathname])

  return null
}
