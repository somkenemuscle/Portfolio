'use client'

import { motion } from 'framer-motion'
import { blogs } from '@/constants/blogs'
import { BackLink } from './AboutHero'
import { JournalEntry, sortedPosts } from './JournalPreview'
import { ACCENT, Container, Pop, Spark } from './Sketch'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

export default function BlogList() {
  const posts = sortedPosts()
  const tags = Array.from(new Set(blogs.flatMap(b => b.tags)))

  return (
    <Container>
      <section className="min-h-screen pt-32 pb-24 flex flex-col gap-12">
        <motion.div {...enter(0.05)}><BackLink /></motion.div>

        <div className="relative flex flex-col gap-4">
          <Spark size={56} fill={ACCENT.tomato} className="sb-spin absolute -top-6 right-0 sm:right-10" />
          <motion.span {...enter(0.08)} className="font-mono text-[13px] tracking-[0.1em] text-sb-tomato-deep">
            THE JOURNAL · {posts.length} {posts.length === 1 ? 'ENTRY' : 'ENTRIES'}
          </motion.span>
          <motion.h1 {...enter(0.12)} className="m-0 font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,6.4vw,84px)]">
            Thoughts, <span className="sb-wavy">written down</span>.
          </motion.h1>
          <motion.p {...enter(0.18)} className="m-0 text-xl leading-relaxed text-sb-soft max-w-[620px]">
            Notes from the build: engineering decisions, things I got wrong, and the occasional creative tangent.
          </motion.p>
          {tags.length > 0 && (
            <motion.p {...enter(0.24)} className="m-0 pt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-hand text-[24px] text-sb-muted">filed under</span>
              {tags.map(t => (
                <span key={t} className="font-mono text-sm text-sb-soft lowercase">#{t}</span>
              ))}
            </motion.p>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {posts.map((post, i) => (
            <Pop key={post.id} delay={0.1 + i * 0.08}>
              <JournalEntry post={post} showCover />
            </Pop>
          ))}
        </div>

        <p className="m-0 font-hand text-[26px] text-sb-muted text-center -rotate-1">more pages coming soon…</p>
      </section>
    </Container>
  )
}
