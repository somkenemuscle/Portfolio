'use client'
import Link from 'next/link'
import { blogs, type BlogPost } from '@/constants/blogs'
import { ACCENT, Container, Pop, Section, SectionHeading, vars } from './Sketch'

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', opts)

// One journal entry on lined notebook paper. With `showCover`, the post's
// cover image is taped onto the page.
export function JournalEntry({ post, showCover = false }: { post: BlogPost; showCover?: boolean }) {
  const cover = showCover && post.coverImage?.src ? post.coverImage : null
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="sb-card sb-card-hover sb-lined relative flex flex-wrap items-center gap-7 py-9 pr-6 sm:pr-10 pl-14 sm:pl-[72px]"
      style={vars({ '--sh': ACCENT.tomato })}
    >
      <span aria-hidden="true" className="absolute left-9 sm:left-12 inset-y-0 w-0.5 bg-sb-tomato" />
      <div className="flex-[0_0_120px] self-start flex flex-col gap-1">
        <span className="font-hand text-[44px] leading-none text-sb-ink">{fmtDate(post.date, { month: 'short', day: 'numeric' })}</span>
        <span className="font-mono text-xs text-[#5A4F43]">{fmtDate(post.date, { year: 'numeric' })} · {post.readTime}</span>
      </div>
      <div className="flex-[999_1_360px] min-w-0 flex flex-col gap-3">
        <h3 className="m-0 text-[30px] font-extrabold leading-tight text-sb-ink">{post.title}</h3>
        <p className="m-0 text-[17px] leading-relaxed text-[#3B332B]">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(t => (
            <span key={t} className="font-mono text-xs px-2.5 py-1 border-2 border-sb-ink rounded-lg text-sb-ink lowercase">{t}</span>
          ))}
        </div>
      </div>
      {cover && (
        <div className="relative flex-[1_1_240px] max-w-[320px] rotate-2 mx-auto">
          {/* tape */}
          <span aria-hidden="true" className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3 w-20 h-6 bg-sb-sun/80 border border-sb-ink/20 z-10" />
          <img src={cover.src} alt={cover.alt} draggable={false}
            className="block w-full aspect-video object-cover border-[2.5px] border-sb-ink rounded-md shadow-[4px_4px_0_#15110D] bg-sb-card" />
        </div>
      )}
    </Link>
  )
}

// A slim one-line entry: handwritten date + title.
function JournalLine({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="sb-card sb-card-hover sb-lined group relative flex items-center gap-5 py-4 pr-5 sm:pr-7 pl-14 sm:pl-[72px]"
      style={vars({ '--sh': ACCENT.tomato })}
    >
      <span aria-hidden="true" className="absolute left-9 sm:left-12 inset-y-0 w-0.5 bg-sb-tomato" />
      <span className="font-hand text-[28px] leading-none text-sb-ink shrink-0 w-[84px]">
        {fmtDate(post.date, { month: 'short', day: 'numeric' })}
      </span>
      <span className="flex-1 min-w-0 text-lg sm:text-xl font-extrabold leading-snug text-sb-ink truncate">{post.title}</span>
      <span aria-hidden="true" className="text-xl text-sb-tomato-deep transition-transform group-hover:translate-x-1">→</span>
    </Link>
  )
}

export const sortedPosts = () => [...blogs].sort((a, b) => b.date.localeCompare(a.date))

// Latest journal entries on the homepage. Hidden until there's a post.
export default function JournalPreview() {
  // Newest post gets the full notebook page; the next two are slim lines,
  // so the section stays about the same height however many posts exist.
  const [featured, ...rest] = sortedPosts().slice(0, 3)
  if (!featured) return null

  return (
    <Container>
      <Section id="journal">
        <SectionHeading
          label="JOURNAL" title="Notes from the build" accent="tomato"
          aside={<Link href="/journal" className="sb-btn bg-sb-tomato">All entries</Link>}
        />
        <div className="flex flex-col gap-4">
          <Pop>
            <JournalEntry post={featured} />
          </Pop>
          {rest.map((post, i) => (
            <Pop key={post.slug} delay={0.08 + i * 0.06}>
              <JournalLine post={post} />
            </Pop>
          ))}
        </div>
      </Section>
    </Container>
  )
}
