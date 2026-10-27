'use client'
// Bits shared by the About-page corkboard and the /highlights wall.
import { useEffect, useRef, type ReactNode } from 'react'
import { animate, useInView } from 'framer-motion'
import { BadgeCheck, GitPullRequest, GraduationCap, Mic, Rocket, Ticket, Trophy, Globe } from 'lucide-react'
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { XLogo } from './BrandIcons'
import { ACCENT } from './Sketch'
import { highlights, type Highlight, type HighlightLink, type HighlightType } from '@/constants/highlights'

export const TYPE_META: Record<HighlightType, { label: string; plural: string; unit: [string, string]; color: string; icon: (s?: number) => ReactNode }> = {
  talk: { label: 'Talk', plural: 'Talks', unit: ['talk', 'talks'], color: ACCENT.tomato, icon: (s = 18) => <Mic size={s} strokeWidth={2.4} /> },
  hackathon: { label: 'Hackathon', plural: 'Hackathons', unit: ['hackathon', 'hackathons'], color: ACCENT.peri, icon: (s = 18) => <Rocket size={s} strokeWidth={2.4} /> },
  event: { label: 'Event', plural: 'Events', unit: ['event', 'events'], color: ACCENT.mint, icon: (s = 18) => <Ticket size={s} strokeWidth={2.4} /> },
  'open-source': { label: 'Open source', plural: 'Open source', unit: ['contribution', 'contributions'], color: ACCENT.sun, icon: (s = 18) => <GitPullRequest size={s} strokeWidth={2.4} /> },
  award: { label: 'Award', plural: 'Awards', unit: ['award', 'awards'], color: ACCENT.gum, icon: (s = 18) => <Trophy size={s} strokeWidth={2.4} /> },
  paperwork: { label: 'Credential', plural: 'Credentials', unit: ['credential', 'credentials'], color: ACCENT.sun, icon: (s = 18) => <BadgeCheck size={s} strokeWidth={2.4} /> },
}

export const entryIcon = (e: Highlight, size?: number) =>
  e.icon === 'grad' ? <GraduationCap size={size ?? 18} strokeWidth={2.4} /> : TYPE_META[e.type].icon(size)

export const LINK_ICON: Record<HighlightLink['kind'], ReactNode> = {
  instagram: <InstagramLogoIcon className="w-full h-full" aria-hidden="true" />,
  x: <XLogo />,
  linkedin: <LinkedInLogoIcon className="w-full h-full" aria-hidden="true" />,
  github: <GitHubLogoIcon className="w-full h-full" aria-hidden="true" />,
  web: <Globe className="w-full h-full" aria-hidden="true" />,
}

// Newest first.
export const sortedHighlights = () => [...highlights].sort((a, b) => b.date.localeCompare(a.date))
export const yearOf = (e: Highlight) => e.date.slice(0, 4)

// "27 Sep 2026", "Oct 2026", "2023", or "10 – 24 Oct 2026" for ranges.
const parts = (d: string) => d.split('-').map(Number)
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const one = (d: string) => {
  const [y, m, day] = parts(d)
  return [day, m && MONTHS[m - 1], y].filter(Boolean).join(' ')
}
export function fmtHighlightDate(e: Highlight) {
  if (!e.endDate) return one(e.date)
  const [y1, m1, d1] = parts(e.date)
  const [y2, m2] = parts(e.endDate)
  if (y1 === y2 && m1 === m2 && d1) return `${d1} – ${one(e.endDate)}`
  return `${one(e.date)} – ${one(e.endDate)}`
}

// Count per type, in TYPE_META order, skipping empty ones.
export const typeCounts = () =>
  (Object.keys(TYPE_META) as HighlightType[])
    .map(t => ({ type: t, count: highlights.filter(e => e.type === t).length }))
    .filter(t => t.count > 0)

// A rubber-stamp label for the entry type.
export function TypeStamp({ entry, className = '' }: { entry: Highlight; className?: string }) {
  const { label, color } = TYPE_META[entry.type]
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-md border-2 border-sb-ink text-sb-ink ${className}`}
      style={{ background: color }}
    >
      {entryIcon(entry, 13)}
      {label}
    </span>
  )
}

// Stand-in "photo" for entries without pictures: a little certificate.
export function PaperArt({ entry, compact = false }: { entry: Highlight; compact?: boolean }) {
  const { color } = TYPE_META[entry.type]
  return (
    <span className="sb-lined absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-5">
      <span
        className={`${compact ? 'w-12 h-12' : 'w-16 h-16'} rounded-full border-[2.5px] border-sb-ink flex items-center justify-center text-sb-ink -rotate-6 shadow-[3px_3px_0_#1A1410]`}
        style={{ background: color }}
      >
        {entryIcon(entry, compact ? 22 : 28)}
      </span>
      <span className={`font-hand ${compact ? 'text-[20px]' : 'text-[26px]'} leading-tight text-sb-ink`}>{entry.place}</span>
      <span className="font-mono text-[11px] font-bold px-2 py-0.5 border-2 border-dashed border-sb-tomato-deep text-sb-tomato-deep rounded rotate-3">
        {entry.date.slice(0, 4)}
      </span>
    </span>
  )
}

// A 640px copy of a highlight photo (public/highlights/thumbs) for anywhere it
// shows small; the full-size file is only loaded in the gallery.
export const thumb = (src: string) => src.replace('/highlights/', '/highlights/thumbs/')

// The entry's cover: its first photo, or the paper stand-in.
export function Cover({ entry, compact, className = '' }: { entry: Highlight; compact?: boolean; className?: string }) {
  const photo = entry.photos?.[0]
  return photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={thumb(photo.src)} alt={photo.alt} loading="lazy" decoding="async" draggable={false}
      className={`absolute inset-0 w-full h-full object-cover select-none ${className}`} />
  ) : (
    <PaperArt entry={entry} compact={compact} />
  )
}

// A number that counts up the first time it scrolls into view.
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: v => { if (ref.current) ref.current.textContent = String(Math.round(v)) },
    })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{to}</span>
}

// "2 talks", "1 hackathon"…
export const countLabel = (type: HighlightType, n: number) => TYPE_META[type].unit[n === 1 ? 0 : 1]

// The newest entry that has photos (used for the homepage peek).
export const latestWithPhoto = () => sortedHighlights().find(e => e.photos?.length)
