'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { BlogPost as BlogPostType } from '@/constants/blogs'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <section className="min-h-screen flex flex-col pt-36 pb-24">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16 flex flex-col flex-1">

        {/* Back */}
        <motion.div {...enter(0.05)} className="mb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.28)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.28)')}
          >
            <ArrowLeft size={13} strokeWidth={2} />
            Back to blog
          </Link>
        </motion.div>

        <article className="max-w-2xl">
          <motion.div {...enter(0.1)} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>·</span>
              <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {post.readTime}
              </span>
            </div>
            <h1
              className="font-bold tracking-tight leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', color: '#ffffff' }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2">
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
          </motion.div>

          {post.coverImage?.src && (
            <motion.img
              {...enter(0.14)}
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              className="w-full h-auto rounded-2xl mb-10 select-none"
              draggable={false}
            />
          )}

          <motion.div {...enter(0.18)} className="flex flex-col gap-6">
            {post.content.map((block, i) => {
              if (block.type === 'image') {
                if (!block.src) return null
                return (
                  <figure key={i} className="my-2">
                    <img
                      src={block.src}
                      alt={block.alt}
                      className="w-full h-auto rounded-2xl select-none"
                      draggable={false}
                    />
                    {block.caption && (
                      <figcaption
                        className="text-[13px] mt-3 text-center"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              }

              return (
                <p key={i} className="text-[16px] leading-[1.9]" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {block.text}
                </p>
              )
            })}
          </motion.div>
        </article>

      </div>
    </section>
  )
}
