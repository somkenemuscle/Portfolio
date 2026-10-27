'use client'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Camera, CalendarDays, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Highlight, HighlightLink, HighlightType } from '@/constants/highlights'
import { ACCENT, Container, cycleTilt, deep, vars } from './Sketch'
import { BackLink } from './AboutHero'
import Modal from './Modal'
import { CountUp, Cover, LINK_ICON, PaperArt, TYPE_META, TypeStamp, countLabel, fmtHighlightDate, sortedHighlights, typeCounts, yearOf } from './HighlightsShared'

// The full Highlights page: filter stickers, a wall grouped by year, and each entry
// opening as a pop-up with a swipeable photo stack. /highlights#slug opens an
// entry directly, so the corkboard on About can link straight to one.

const ENTRIES = sortedHighlights()
type Filter = HighlightType | 'all'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 20, delay },
})

function Filters({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  const tabs: { id: Filter; label: string; count: number; color: string }[] = [
    { id: 'all', label: 'All', count: ENTRIES.length, color: ACCENT.sun },
    ...typeCounts().map(t => ({ id: t.type, label: TYPE_META[t.type].plural, count: t.count, color: TYPE_META[t.type].color })),
  ]
  return (
    <div role="group" aria-label="Filter highlights" className="flex flex-wrap gap-2.5">
      {tabs.map(t => {
        const on = value === t.id
        return (
          <motion.button
            key={t.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(t.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full border-[2.5px] border-sb-ink font-bold text-[15px] bg-sb-card transition-shadow ${on ? 'shadow-[3px_3px_0_#1A1410]' : 'shadow-[1px_1px_0_#1A1410]'}`}
          >
            {/* the coloured fill slides between tabs */}
            {on && (
              <motion.span
                layoutId="highlights-filter"
                className="absolute inset-0 rounded-full"
                style={{ background: t.color }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              />
            )}
            <span className="relative">{t.label}</span>
            <span className="relative font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-sb-ink/10">{t.count}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

const LogCard = forwardRef<HTMLElement, { entry: Highlight; index: number; onOpen: (e: Highlight, el: HTMLElement) => void }>(
  function LogCard({ entry, index, onOpen }, ref) {
    const { color } = TYPE_META[entry.type]
    const count = entry.photos?.length ?? 0
    return (
      <motion.article
        ref={ref}
        id={entry.slug}
        layout
        className="scroll-mt-32"
        style={{ rotate: cycleTilt(index) * 0.35 }}
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.18 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <button
          type="button"
          onClick={e => onOpen(entry, e.currentTarget)}
          className="group sb-card sb-card-hover relative w-full text-left p-3 pb-5 flex flex-col gap-4 outline-none focus-visible:ring-[3px] focus-visible:ring-sb-ink focus-visible:ring-offset-4 focus-visible:ring-offset-sb-paper"
          style={vars({ '--sh': color })}
        >
          {count > 0 && (
            <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 w-20 h-6 -ml-10 -rotate-3 bg-sb-sun/80 border border-sb-ink/20" />
          )}
          <span className="relative block aspect-[4/3] overflow-hidden rounded-[12px] border-[2.5px] border-sb-ink bg-sb-raised">
            <Cover entry={entry} className="transition-transform duration-500 group-hover:scale-[1.06]" />
            <TypeStamp entry={entry} className="absolute top-3 left-3 -rotate-3" />
            {count > 1 && (
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-1 rounded-md bg-sb-ink text-sb-cream rotate-2">
                <Camera size={12} aria-hidden="true" /> {count}
              </span>
            )}
          </span>
          <span className="flex flex-col gap-1.5 px-1.5">
            <span className="font-mono text-[12px] text-sb-muted">
              {fmtHighlightDate(entry)}{entry.place && ` · ${entry.place}`}
            </span>
            <span className="text-[21px] font-extrabold leading-snug">{entry.title}</span>
            <span className="text-[15px] leading-relaxed text-sb-soft line-clamp-2">{entry.blurb}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 font-hand text-[23px] leading-none" style={{ color: deep(color) }}>
              {count ? 'see the photos' : 'read more'}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </span>
        </button>
      </motion.article>
    )
  },
)

// A stack of photos: swipe, arrow keys, the side buttons or the thumbnails.
function Gallery({ entry }: { entry: Highlight }) {
  const photos = entry.photos ?? []
  const [[i, dir], setPage] = useState<[number, number]>([0, 0])
  const many = photos.length > 1
  const go = useCallback((d: number) => setPage(([cur]) => [(cur + d + photos.length) % photos.length, d]), [photos.length])

  useEffect(() => {
    if (!many) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [many, go])

  const arrow = 'absolute top-1/2 -mt-[22px] z-10 w-11 h-11 rounded-full bg-sb-cream border-[2.5px] border-sb-ink shadow-[3px_3px_0_#1A1410] flex items-center justify-center text-sb-ink'

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="relative aspect-square md:aspect-auto md:h-[460px] overflow-hidden rounded-[14px] border-[2.5px] border-sb-ink bg-sb-ink">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={photos[i].src}
            src={photos[i].src}
            alt={photos[i].alt}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d >= 0 ? '55%' : '-55%', opacity: 0, rotate: d * 5, scale: 0.9 }),
              center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
              exit: (d: number) => ({ x: d >= 0 ? '-35%' : '35%', opacity: 0, rotate: -d * 5, scale: 0.9 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag={many ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) go(1)
              else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
            }}
            draggable={false}
            className={`absolute inset-0 w-full h-full object-contain select-none ${many ? 'cursor-grab active:cursor-grabbing' : ''}`}
          />
        </AnimatePresence>
        {many && (
          <>
            <motion.button type="button" aria-label="Previous photo" onClick={() => go(-1)} whileHover={{ scale: 1.08, x: -2 }} whileTap={{ scale: 0.9 }} className={`${arrow} left-3`}>
              <ChevronLeft size={20} strokeWidth={2.6} />
            </motion.button>
            <motion.button type="button" aria-label="Next photo" onClick={() => go(1)} whileHover={{ scale: 1.08, x: 2 }} whileTap={{ scale: 0.9 }} className={`${arrow} right-3`}>
              <ChevronRight size={20} strokeWidth={2.6} />
            </motion.button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 font-hand text-[20px] leading-none px-3 py-1 rounded-full bg-sb-cream border-2 border-sb-ink" aria-live="polite">
              {i + 1} / {photos.length}
            </span>
          </>
        )}
      </div>
      {many && (
        <div className="flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((p, n) => (
            <motion.button
              key={p.src}
              type="button"
              aria-label={`Photo ${n + 1}`}
              aria-current={n === i}
              onClick={() => setPage([n, n > i ? 1 : -1])}
              animate={{ scale: n === i ? 1 : 0.9, rotate: n === i ? -3 : 0, opacity: n === i ? 1 : 0.55 }}
              whileHover={{ opacity: 1, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="relative shrink-0 w-14 h-14 overflow-hidden rounded-lg border-[2.5px] border-sb-ink bg-sb-raised"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" loading="lazy" draggable={false} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}

function LinkCard({ link, color, delay }: { link: HighlightLink; color: string; delay: number }) {
  const host = new URL(link.href).hostname.replace(/^www\./, '')
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex items-center gap-3 px-3.5 py-3 rounded-xl border-[2.5px] border-sb-ink bg-sb-card shadow-[3px_3px_0_#1A1410] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#1A1410]"
    >
      <span className="w-9 h-9 shrink-0 p-2 rounded-full border-2 border-sb-ink text-sb-ink transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" style={{ background: color }}>
        {LINK_ICON[link.kind]}
      </span>
      <span className="flex-1 min-w-0 flex flex-col">
        <span className="font-bold leading-snug">{link.label}</span>
        <span className="font-mono text-[12px] text-sb-muted truncate">{host}</span>
      </span>
      <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
    </motion.a>
  )
}

function EntryModal({ entry, onClose }: { entry: Highlight | null; onClose: () => void }) {
  // keep the last entry around while the pop-up animates out
  const [shown, setShown] = useState(entry)
  useEffect(() => { if (entry) setShown(entry) }, [entry])
  const e = entry ?? shown
  const color = e ? TYPE_META[e.type].color : ACCENT.sun
  const step = (n: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.18 + n * 0.06 } })

  return (
    <Modal open={!!entry} onClose={onClose} labelledBy="log-title" className="max-w-[980px]">
      {e && (
        <div className="sb-card max-h-[88vh] overflow-y-auto overscroll-contain p-4 sm:p-6 grid gap-6 md:grid-cols-[1.15fr_1fr]" style={vars({ '--sh': color })}>
          {e.photos?.length ? (
            <Gallery key={e.slug} entry={e} />
          ) : (
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden rounded-[14px] border-[2.5px] border-sb-ink">
              <PaperArt entry={e} />
            </div>
          )}

          <div className="flex flex-col gap-4 min-w-0 md:py-2 md:pr-3">
            <motion.div {...step(0)} className="flex flex-wrap items-center gap-2.5">
              <TypeStamp entry={e} />
              {e.role && <span className="font-mono text-[12px] px-2 py-1 rounded-md border-2 border-dashed border-sb-ink/40">{e.role}</span>}
            </motion.div>
            <motion.h3 {...step(1)} id="log-title" className="m-0 text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-tight">
              {e.title}
            </motion.h3>
            <motion.p {...step(2)} className="m-0 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-sb-muted">
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" /> {fmtHighlightDate(e)}</span>
              {e.place && <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" /> {e.place}</span>}
            </motion.p>
            <motion.p {...step(3)} className="m-0 text-[17px] leading-relaxed font-semibold">{e.blurb}</motion.p>
            {e.story?.map((p, n) => (
              <motion.p key={p.slice(0, 24)} {...step(4 + n)} className="m-0 text-[16px] leading-[1.75] text-sb-soft">{p}</motion.p>
            ))}
            {!!e.links?.length && (
              <div className="flex flex-col gap-2.5 mt-2">
                <motion.span {...step(5)} className="font-hand text-[26px] leading-none -rotate-1 origin-left" style={{ color: deep(color) }}>
                  the receipts
                </motion.span>
                {e.links.map((l, n) => <LinkCard key={l.href} link={l} color={color} delay={0.35 + n * 0.07} />)}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

export default function HighlightsWall() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  // /highlights#slug opens that entry (on load and on back/forward)
  useEffect(() => {
    const sync = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1))
      setOpenSlug(ENTRIES.some(e => e.slug === slug) ? slug : null)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const open = (e: Highlight, el: HTMLElement) => {
    trigger.current = el
    history.replaceState(null, '', `#${e.slug}`)
    setOpenSlug(e.slug)
  }
  const close = useCallback(() => {
    history.replaceState(null, '', window.location.pathname)
    setOpenSlug(null)
    trigger.current?.focus({ preventScroll: true })
  }, [])

  const shown = filter === 'all' ? ENTRIES : ENTRIES.filter(e => e.type === filter)
  const years = Array.from(new Set(shown.map(yearOf))).map(y => ({ year: y, items: shown.filter(e => yearOf(e) === y) }))

  return (
    <Container className="pb-8">
      <section className="pt-32 flex flex-col gap-5">
        <motion.div {...enter(0.05)}><BackLink href="/about" label="back to about" /></motion.div>
        <motion.span {...enter(0.08)} className="font-mono text-[13px] tracking-[0.1em] text-sb-tomato-deep">HIGHLIGHTS</motion.span>
        <motion.h1 {...enter(0.12)} className="m-0 font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,6.4vw,84px)]">
          Out in the <span className="sb-wavy">wild</span>.
        </motion.h1>
        <motion.p {...enter(0.18)} className="m-0 text-xl leading-relaxed text-sb-soft max-w-[620px]">
          Talks I&apos;ve given, hackathons I&apos;ve built at, events I showed up to, and the paperwork.
          Tap anything for the photos and the story.
        </motion.p>
        <motion.div {...enter(0.24)} className="flex flex-wrap gap-2.5 pt-1">
          {typeCounts().map((t, i) => (
            <span key={t.type} className="sb-sticker !text-[15px] !px-4 !py-2"
              style={{ ...vars({ '--r': `${cycleTilt(i) * 0.6}deg` }), background: TYPE_META[t.type].color }}>
              <CountUp to={t.count} /> {countLabel(t.type, t.count)}
            </span>
          ))}
        </motion.div>
      </section>

      <motion.div {...enter(0.3)} className="mt-12">
        <Filters value={filter} onChange={setFilter} />
      </motion.div>

      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {years.map(({ year, items }) => (
            <motion.section
              key={year}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="mt-14"
              aria-label={year}
            >
              <motion.h2 layout className="m-0 mb-7 inline-flex flex-col font-hand text-[60px] leading-none -rotate-2">
                {year}
                <svg width="110" height="14" viewBox="0 0 110 14" aria-hidden="true" className="-mt-1">
                  <motion.path
                    d="M3 9 q 26 -9 52 0 t 52 0"
                    stroke={ACCENT.tomato} strokeWidth="4" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                  />
                </svg>
              </motion.h2>
              <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {items.map((e, i) => <LogCard key={e.slug} entry={e} index={i} onOpen={open} />)}
                </AnimatePresence>
              </motion.div>
            </motion.section>
          ))}
        </AnimatePresence>
      </LayoutGroup>

      <EntryModal entry={ENTRIES.find(e => e.slug === openSlug) ?? null} onClose={close} />
    </Container>
  )
}
