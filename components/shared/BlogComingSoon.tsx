'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

const topics = [
  'Engineering decisions',
  'Building in public',
  'Frontend craft',
  'Backend systems',
  'Career & growth',
  'Creative process',
]

export default function BlogComingSoon() {
  return (
    <section className="min-h-screen flex flex-col pt-36 pb-24">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16 flex flex-col flex-1">

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

        {/* Main content */}
        <div className="flex flex-col gap-8 max-w-2xl">

          <motion.div {...enter(0.1)}>
            <span
              className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-6"
              style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Coming soon
            </span>
            <h1
              className="font-bold tracking-tight leading-[1.08]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: '#ffffff' }}
            >
              Thoughts, written down.
            </h1>
          </motion.div>

          <motion.p
            {...enter(0.18)}
            className="text-[16px] leading-[1.9]"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            I&apos;m working on a space to write about the things I care about —
            engineering decisions, building products, lessons from shipping real software,
            and the occasional creative tangent. It&apos;s coming.
          </motion.p>

          {/* Topics preview */}
          <motion.div {...enter(0.25)}>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4"
              style={{ color: 'rgba(255,255,255,0.22)' }}>
              What I&apos;ll write about
            </p>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="text-[13px] px-3 py-1.5 rounded-full"
                  style={{
                    color: 'rgba(255,255,255,0.38)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Follow CTA */}
          <motion.div {...enter(0.32)} className="flex items-center gap-3 pt-2">
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Follow along on
            </p>
            <Link
              href="https://x.com/somkeneOj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')}
            >
              Twitter ↗
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
