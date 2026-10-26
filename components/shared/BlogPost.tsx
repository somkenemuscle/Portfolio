'use client'

import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import type { BlogPost as BlogPostType } from '@/constants/blogs'
import { BackLink } from './AboutHero'
import { fmtDate, sortedPosts } from './JournalPreview'
import { ACCENT, Container, cycleAccent, cycleTilt, vars } from './Sketch'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

// An image taped into the notebook, with a handwritten caption.
function Taped({ src, alt, caption, tilt = 0 }: { src: string; alt: string; caption?: string; tilt?: number }) {
  return (
    <figure className="m-0 my-4 relative" style={{ transform: `rotate(${tilt}deg)` }}>
      <span aria-hidden="true" className="absolute -top-3 left-8 -rotate-6 w-20 h-6 bg-sb-sun/80 z-10" />
      <span aria-hidden="true" className="absolute -top-3 right-8 rotate-6 w-20 h-6 bg-sb-gum/80 z-10" />
      <img src={src} alt={alt} draggable={false}
        className="block w-full h-auto rounded-xl border-[2.5px] border-sb-cream shadow-[6px_6px_0_#000] select-none bg-sb-card" />
      {caption && (
        <figcaption className="font-hand text-[22px] text-sb-muted mt-4 text-center">{caption}</figcaption>
      )}
    </figure>
  )
}

export default function BlogPost({ post }: { post: BlogPostType }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  const posts = sortedPosts()
  const idx = posts.findIndex(p => p.slug === post.slug)
  const next = posts.length > 1 ? posts[(idx + 1) % posts.length] : null

  return (
    <>
      {/* reading progress */}
      <motion.div aria-hidden="true" className="fixed top-0 inset-x-0 h-1.5 bg-sb-sun origin-left z-[60]" style={{ scaleX: progress }} />

      <Container>
        <section className="min-h-screen pt-32 pb-24">
          <motion.div {...enter(0.05)} className="mb-10"><BackLink href="/blog" label="back to the journal" /></motion.div>

          <article className="max-w-[720px] mx-auto">
            <motion.header {...enter(0.1)} className="mb-12 flex flex-col gap-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-hand text-[38px] leading-none text-sb-gum -rotate-2">
                  {fmtDate(post.date, { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="font-mono text-[13px] text-sb-muted">· {post.readTime}</span>
              </div>
              <h1 className="m-0 font-extrabold tracking-[-0.025em] leading-[1.04] text-[clamp(36px,5vw,58px)]">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, i) => (
                  <span key={tag} className="sb-sticker !text-sm !px-3.5 !py-1.5"
                    style={{ ...vars({ '--r': `${cycleTilt(i)}deg` }), background: cycleAccent(i) }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.header>

            {post.coverImage?.src && (
              <motion.div {...enter(0.14)} className="mb-12">
                <Taped src={post.coverImage.src} alt={post.coverImage.alt} tilt={-0.8} />
              </motion.div>
            )}

            <motion.div {...enter(0.18)} className="flex flex-col gap-7">
              {post.content.map((block, i) => {
                if (block.type === 'image') {
                  if (!block.src) return null
                  return <Taped key={i} src={block.src} alt={block.alt} caption={block.caption} tilt={i % 2 ? 0.8 : -0.8} />
                }
                return (
                  <p key={i} className={`m-0 text-[18px] leading-[1.85] text-[#E6DCCB] ${i === 0 ? 'first-letter:font-extrabold first-letter:text-[64px] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:text-sb-sun' : ''}`}>
                    {block.text}
                  </p>
                )
              })}
            </motion.div>

            {/* sign-off */}
            <div className="sb-card mt-16 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6" style={vars({ '--sh': ACCENT.mint })}>
              <div className="flex flex-col gap-1">
                <p className="m-0 font-hand text-[30px] text-sb-mint -rotate-1 origin-left">thanks for reading!</p>
                <p className="m-0 text-sb-soft">Thoughts or pushback? I&apos;d love to hear them.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://x.com/somkeneOj" target="_blank" rel="noopener noreferrer" className="sb-btn bg-sb-cream">Reply on X</a>
                {next ? (
                  <Link href={`/blog/${next.slug}`} className="sb-btn bg-sb-sun">Next entry →</Link>
                ) : (
                  <Link href="/blog" className="sb-btn bg-sb-sun">All entries</Link>
                )}
              </div>
            </div>
          </article>
        </section>
      </Container>
    </>
  )
}
