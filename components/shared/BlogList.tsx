'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { blogs } from '@/constants/blogs'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function BlogList() {
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

        <motion.h1
          {...enter(0.1)}
          className="font-bold tracking-tight leading-[1.08] mb-14"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: '#ffffff' }}
        >
          Thoughts, written down.
        </motion.h1>

        <div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
          {blogs.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="block py-8 group">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>·</span>
                      <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        {post.readTime}
                      </span>
                    </div>
                    <h2
                      className="font-semibold transition-colors duration-150 mb-2"
                      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', color: 'rgba(255,255,255,0.85)' }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-[14px] leading-[1.8] max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] px-3 py-1 rounded-full"
                          style={{ color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  />
                </div>
              </Link>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
