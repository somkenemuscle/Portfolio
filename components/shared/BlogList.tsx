'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { blogs } from '@/constants/blogs'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function BlogList() {
  return (
    <section className="min-h-screen flex flex-col pt-36 pb-24">
      <div className="w-full max-w-screen-xl mx-auto px-8 md:px-16 flex flex-col flex-1">

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden transition-colors duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.02)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.22)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.09)')}
              >
                {/* Image */}
                <div
                  className="relative w-full aspect-video overflow-hidden shrink-0"
                  style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.09)' }}
                >
                  {post.coverImage?.src ? (
                    <img
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>No image</span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 p-6">
                  <span
                    className="text-[11px] font-medium tracking-[0.14em] uppercase mb-3"
                    style={{ color: '#D7FF5E' }}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>

                  <h2
                    className="font-bold leading-snug mb-2.5"
                    style={{ fontSize: 18, color: 'rgba(255,255,255,0.95)' }}
                  >
                    {post.title}
                  </h2>

                  <p
                    className="text-[13.5px] leading-[1.7]"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
