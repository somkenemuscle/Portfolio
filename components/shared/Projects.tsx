'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectData } from '@/constants/projectData'
import { ACCENT, Accent, Container, Section, SectionHeading, cycleTilt, deep, vars } from './Sketch'
import ProjectArt, { hasArt } from './ProjectArt'

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

type Project = (typeof projectData)[number]

// The whole row pops in together as the section scrolls into view, so cards
// further along are already settled by the time you scroll sideways to them.
const rowIn = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const cardIn = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 20 } },
}

// The back of each drawing: how it's built, sketched like you'd explain it
// on a napkin. One bright block per layer, top to bottom, with the role
// scribbled beside it.
const LAYER_COLORS = [ACCENT.sun, ACCENT.mint, ACCENT.peri, ACCENT.gum]
const ROLE_NOTE: Record<string, string> = {
  client: 'the app', ui: 'the app', store: 'the store', state: 'state', api: 'the api',
  data: 'the data', files: 'files', infra: 'runs on', content: 'the content',
}

function HowItsBuilt({ project, open }: { project: Project; open: boolean }) {
  const layers = project.architecture ?? [{ role: 'built with', nodes: project.technologies.map(t => t.name) }]
  return (
    <span className="absolute inset-0 flex flex-col px-4 pt-3 pb-4 text-left">
      <span className="font-hand text-[22px] leading-none text-sb-tomato-deep -rotate-2 self-start mb-2.5">how it&apos;s built</span>
      <span className="flex-1 flex flex-col justify-center">
        {layers.map((layer, li) => (
          <span key={layer.role} className="flex flex-col">
            {li > 0 && (
              <svg aria-hidden="true" width="14" height="12" viewBox="0 0 14 12" className="ml-6 block">
                <path d="M7 0 V9 M3 6 L7 10 L11 6" stroke="#1A1410" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <motion.span
              initial={false}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ type: 'spring', stiffness: 360, damping: 24, delay: open ? 0.22 + li * 0.07 : 0 }}
              className="flex items-center gap-2.5"
            >
              <span className="min-w-0 max-w-[76%] px-2.5 py-1.5 rounded-lg border-2 border-sb-ink shadow-[2px_2px_0_#1A1410] text-[13.5px] font-extrabold leading-snug text-sb-ink"
                style={{ background: LAYER_COLORS[li % LAYER_COLORS.length], rotate: `${li % 2 ? 0.6 : -0.6}deg` }}>
                {layer.nodes.join(' · ')}
              </span>
              <span className="shrink-0 font-hand text-[19px] leading-none text-sb-soft">← {ROLE_NOTE[layer.role] ?? layer.role}</span>
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  )
}

const face = 'absolute inset-0 overflow-hidden rounded-[14px] border-[2.5px] border-sb-ink [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false)
  // phones tap to flip (holding fights with scrolling); mouse and keyboard hold
  const [touch, setTouch] = useState(false)
  const lastPointer = useRef('mouse')
  const box = useRef<HTMLButtonElement>(null)
  const color = ACCENT[(project.accent ?? 'sun') as Accent]
  const Icon = project.icon
  // optional result sticker, e.g. outcome: "2x faster checkout" in projectData
  const outcome = (project as { outcome?: string }).outcome
  const on = () => setFlipped(true)
  const off = () => setFlipped(false)

  useEffect(() => setTouch(window.matchMedia('(hover: none)').matches), [])

  // a tap anywhere else flips a tapped card back
  useEffect(() => {
    if (!flipped || lastPointer.current === 'mouse') return
    const close = (e: PointerEvent) => !box.current?.contains(e.target as Node) && off()
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [flipped])


  return (
    <motion.div variants={cardIn} className="snap-start shrink-0 w-[min(85vw,360px)]">
      {/* all on one line, each with the same gentle tilt as the About story panels */}
      <article className="sb-card sb-card-hover p-[18px] flex flex-col gap-4 h-full" style={{ ...vars({ '--sh': color }), rotate: `${cycleTilt(index) * 0.25}deg` }}>
        <button
          ref={box}
          type="button"
          aria-label={`${touch ? 'Tap' : 'Hold'} to see how ${project.title} is built`}
          aria-pressed={flipped}
          onPointerDown={e => { lastPointer.current = e.pointerType; if (e.pointerType === 'mouse') on() }}
          onPointerUp={e => e.pointerType === 'mouse' && off()}
          onPointerLeave={e => e.pointerType === 'mouse' && off()}
          onClick={() => lastPointer.current !== 'mouse' && setFlipped(f => !f)}
          onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); lastPointer.current = 'mouse'; on() } }}
          onKeyUp={off} onBlur={off}
          onContextMenu={e => e.preventDefault()}
          className="relative block h-[260px] w-full rounded-[14px] cursor-pointer select-none touch-manipulation [-webkit-touch-callout:none] [perspective:1400px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sb-ink"
        >
          {/* the drawing turns over like a card to show its back */}
          <motion.span
            className="absolute inset-0 block [transform-style:preserve-3d]"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            <span className={face} style={{ background: color }}>
              {hasArt(project.art) ? (
                <>
                  {/* dotted paper behind the drawing */}
                  <span aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(21,17,13,0.14)_1.2px,transparent_1.6px)] [background-size:16px_16px]" />
                  <ProjectArt art={project.art} title={project.title} />
                </>
              ) : (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-sb-ink">
                  <Icon size={56} stroke={1.8} aria-hidden="true" />
                  <span className="font-extrabold text-2xl">{project.title}</span>
                </span>
              )}
            </span>
            <span className={`${face} bg-sb-card [transform:rotateY(180deg)] [background-image:radial-gradient(rgba(21,17,13,0.10)_1.2px,transparent_1.6px)] [background-size:16px_16px]`}>
              <HowItsBuilt project={project} open={flipped} />
            </span>
          </motion.span>

          {/* the hint sticker; it ducks out of the way while the back is showing */}
          <motion.span aria-hidden="true"
            animate={flipped ? { opacity: 0, scale: 0.6, rotate: 20 } : { opacity: 1, scale: 1, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 text-[12px] font-bold leading-none pl-1.5 pr-2.5 py-1.5 rounded-full bg-sb-card text-sb-ink border-2 border-sb-ink shadow-[2px_2px_0_#1A1410]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" />
            </svg>
            {touch ? 'tap' : 'hold'} to see how it&apos;s built
          </motion.span>
        </button>

        <div className="flex flex-col gap-2 px-1.5 pb-1.5">
          <span className="font-mono text-xs tracking-[0.08em]" style={{ color: deep(color) }}>{project.niche}</span>
          <h3 className="m-0 text-[28px] font-extrabold">{project.title}</h3>
          <p className="m-0 text-base leading-normal text-sb-soft">{project.blurb ?? project.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
            <a href={project.livePreview} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[13px] text-sb-ink underline-offset-4 hover:text-sb-tomato-deep hover:underline">
              {host(project.livePreview)} ↗
            </a>
            {outcome && (
              <span className="sb-sticker !text-[13px] !px-3 !py-1" style={{ ...vars({ '--r': '-3deg' }), background: color }}>
                {outcome}
              </span>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  )
}

function Arrow({ dir, disabled, onClick }: { dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous projects' : 'Next projects'}
      className="sb-btn bg-sb-sun !w-12 !h-12 !p-0 justify-center !rounded-full disabled:opacity-35 disabled:pointer-events-none"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        style={{ transform: dir === 'prev' ? 'scaleX(-1)' : undefined }}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  )
}

// Rest the mouse near either end of the row and it glides on by itself, so
// nobody has to hunt for a scrollbar. It waits a beat before moving (passing
// through shouldn't trigger it), speeds up the closer you get to the edge,
// eases to a stop, and holds still while you're pressing a card or on a link.
// Mouse only: touch and trackpads already scroll naturally.
type Glide = { side: -1 | 1; armed: boolean } | null

function useEdgeGlide(row: React.RefObject<HTMLDivElement>) {
  const [glide, setGlide] = useState<Glide>(null)
  const st = useRef({ x: -1, over: false, pressed: false, onLink: false, enteredAt: 0, side: 0, v: 0, pos: 0, raf: 0, last: 0, glide: null as Glide })

  const show = useCallback((g: Glide) => {
    const cur = st.current.glide
    if (cur?.side === g?.side && cur?.armed === g?.armed) return
    st.current.glide = g
    setGlide(g)
  }, [])

  const tick = useCallback((now: number) => {
    const s = st.current, el = row.current
    if (!el) return
    const dt = Math.min(0.05, (now - (s.last || now)) / 1000)
    s.last = now
    const r = el.getBoundingClientRect()
    const zone = Math.min(120, r.width * 0.14)
    const max = el.scrollWidth - el.clientWidth
    const x = s.x - r.left

    let side: -1 | 0 | 1 = 0, t = 0
    if (s.over && x >= 0) {
      if (x < zone && el.scrollLeft > 2) { side = -1; t = 1 - x / zone }
      else if (x > r.width - zone && el.scrollLeft < max - 2) { side = 1; t = 1 - (r.width - x) / zone }
    }
    if (side !== s.side) { s.side = side; s.enteredAt = now }
    const armed = side !== 0 && now - s.enteredAt > 300 && !s.pressed && !s.onLink
    show(side ? { side, armed } : null)

    // ease toward the target speed (up to ~900px/s right at the edge)
    const target = armed ? side * 900 * Math.pow(t, 1.5) : 0
    s.v += (target - s.v) * Math.min(1, dt * 7)
    if (Math.abs(s.v) > 4) {
      if (!el.style.scrollSnapType) { el.style.scrollSnapType = 'none'; s.pos = el.scrollLeft }
      s.pos = Math.max(0, Math.min(max, s.pos + s.v * dt))
      el.scrollLeft = s.pos
    } else {
      s.v = 0
      // stopped: hand control back to snapping so it settles on a card
      if (el.style.scrollSnapType) el.style.scrollSnapType = ''
    }

    if (s.over || s.v) s.raf = requestAnimationFrame(tick)
    else { s.raf = 0; s.last = 0; show(null) }
  }, [row, show])

  const start = () => { if (!st.current.raf) st.current.raf = requestAnimationFrame(tick) }

  useEffect(() => {
    const s = st.current
    const release = () => { s.pressed = false }
    window.addEventListener('pointerup', release)
    return () => { window.removeEventListener('pointerup', release); cancelAnimationFrame(s.raf) }
  }, [])

  const fine = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const handlers = {
    onPointerMove: (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse' || !fine()) return
      const s = st.current
      s.x = e.clientX; s.over = true
      s.onLink = !!(e.target as HTMLElement).closest('a')
      start()
    },
    onPointerLeave: (e: React.PointerEvent) => { if (e.pointerType === 'mouse') st.current.over = false },
    onPointerDown: (e: React.PointerEvent) => { if (e.pointerType === 'mouse') st.current.pressed = true },
  }
  return { glide, handlers }
}

// The cue at the edge: a sticker arrow that pops in when you hover near the
// end, fills its ring while it waits, then keeps nudging while the row glides.
function GlideCue({ glide }: { glide: Glide }) {
  return (
    <AnimatePresence>
      {glide && (
        <motion.span
          key={glide.side}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.5, rotate: glide.side * -20 }}
          animate={{ opacity: 1, scale: 1, rotate: glide.side * 4 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
          className={`pointer-events-none absolute z-30 top-[calc(50%-12px)] -mt-6 ${glide.side < 0 ? '-left-2' : '-right-2'} w-12 h-12 rounded-full bg-sb-sun border-[2.5px] border-sb-ink shadow-[3px_3px_0_#1A1410] flex items-center justify-center text-sb-ink`}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" className="absolute -inset-[4.5px] -rotate-90">
            <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, ease: 'linear' }} />
          </svg>
          <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"
            style={{ scaleX: glide.side }}
            animate={glide.armed ? { x: [0, glide.side * 4, 0] } : { x: 0 }}
            transition={glide.armed ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </motion.svg>
        </motion.span>
      )}
    </AnimatePresence>
  )
}

// Projects sit in one horizontal row that scrolls (swipe, trackpad or the
// arrows, or by resting the mouse near either end) so the section stays the same height as more get added.
export function Projects() {
  const row = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const { glide, handlers } = useEdgeGlide(row)

  const update = useCallback(() => {
    const el = row.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const nudge = (dir: 1 | -1) => {
    const el = row.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 32 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const scrollable = !(edge.start && edge.end)

  return (
    <Container>
      <Section id="work">
        <SectionHeading
          label="SELECTED WORK" title="Things I've shipped" accent="sun"
          aside={
            <div className="flex items-center gap-5">
              <p className="m-0 font-hand text-[26px] text-sb-peri-deep -rotate-3">psst, press &amp; hold a drawing</p>
              {scrollable && (
                <div className="hidden sm:flex gap-3">
                  <Arrow dir="prev" disabled={edge.start} onClick={() => nudge(-1)} />
                  <Arrow dir="next" disabled={edge.end} onClick={() => nudge(1)} />
                </div>
              )}
            </div>
          }
        />
        <div className="relative">
          {/* snapping is firm on touch, gentle on desktop so trackpads glide */}
          <motion.div
            ref={row}
            onScroll={update}
            {...handlers}
            variants={rowIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-8 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory md:snap-proximity scroll-px-1 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projectData.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </motion.div>
          <GlideCue glide={glide} />
        </div>
        {scrollable && (
          <p className="sm:hidden -mt-8 m-0 font-mono text-xs text-sb-muted text-center">swipe for more →</p>
        )}
      </Section>
    </Container>
  )
}
