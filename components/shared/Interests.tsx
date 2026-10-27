'use client'
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { InstagramLogoIcon } from '@radix-ui/react-icons'
import { desk, type DeskItem, type DeskObject } from '@/constants/interests'
import { TikTokLogo } from './BrandIcons'
import { ACCENT, Container, INK, Pop, Section, SectionHeading, isPlaceholder, vars } from './Sketch'

// "Outside the editor" as an illustrated desk, seen from above. Every object
// idles with a small loop (art-* classes in globals.css); hover, focus or tap
// one and it lifts off the desk and a speech bubble says what it's about.

const W = 1000
const H = 580
const CREAM = ACCENT.cream
const line = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const hand = { fontFamily: 'var(--font-hand)', fontWeight: 700 }

type ArtProps = { on: boolean }

// ── The drawings, each centred on (0, 0) ──

// A MacBook-ish laptop, shut and asleep. Pick it up and it wakes: screen
// light leaks out of the hinge and the sign flips.
const Laptop = ({ on }: ArtProps) => (
  <>
    <defs>
      <linearGradient id="laptop-lid" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ECEAE6" />
        <stop offset="1" stopColor="#C7C3BC" />
      </linearGradient>
      <clipPath id="laptop-clip"><rect x="-135" y="-92" width="270" height="184" rx="18" /></clipPath>
      <filter id="laptop-glow" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="8" /></filter>
    </defs>
    {/* screen light leaking from under the lid */}
    <ellipse cx="0" cy="96" rx="120" ry="14" fill={ACCENT.peri} filter="url(#laptop-glow)"
      style={{ opacity: on ? 0.9 : 0, transition: 'opacity .4s' }} />
    <rect x="-135" y="-92" width="270" height="184" rx="18" fill="url(#laptop-lid)" {...line} />
    <g clipPath="url(#laptop-clip)">
      <rect x="-135" y="70" width="270" height="22" fill="#A9A49C" />
      <rect className="art-sheen" x="-60" y="-120" width="34" height="240" fill="#FFFFFF" opacity="0.45" transform="skewX(-20)" />
    </g>
    <rect x="-135" y="-92" width="270" height="184" rx="18" fill="none" {...line} />
    <path d="M-135 70 H135" {...line} strokeWidth={2.5} />
    {/* stickers */}
    <g transform="translate(-6 -18) rotate(-6)">
      <rect x="-42" y="-26" width="84" height="52" rx="12" fill={ACCENT.sun} {...line} strokeWidth={2.5} />
      <text x="0" y="11" textAnchor="middle" fontSize="30" fill={INK} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>&lt;/&gt;</text>
    </g>
    <circle cx="96" cy="34" r="19" fill={ACCENT.gum} {...line} strokeWidth={2.5} />
    <text x="96" y="40" textAnchor="middle" fontSize="18" fill={INK} style={hand}>hi!</text>
    <path d="M-104 -66 l-10 22 h12 l-6 20 l20 -28 h-12 l8 -14 z" fill={ACCENT.mint} {...line} strokeWidth={2} />
    {/* zzz, until it wakes up */}
    <g style={{ opacity: on ? 0 : 1, transition: 'opacity .3s' }}>
      <text className="art-steam" x="132" y="-86" fontSize="20" fill={INK} style={hand}>z</text>
      <text className="art-steam" x="148" y="-104" fontSize="26" fill={INK} style={{ ...hand, animationDelay: '-0.9s' }}>z</text>
      <text className="art-steam" x="168" y="-124" fontSize="32" fill={INK} style={{ ...hand, animationDelay: '-1.8s' }}>Z</text>
    </g>
    {/* the sign, hanging from a hook on the lid */}
    <circle cx="-62" cy="22" r="4" fill={INK} />
    <g className="art-sign">
      <path d="M-62 22 L-112 46 M-62 22 L-12 46" {...line} strokeWidth={2} fill="none" />
      <g style={{ transform: on ? 'rotateX(180deg)' : 'none', transformBox: 'fill-box', transformOrigin: 'center', transition: 'transform .45s cubic-bezier(.34,1.56,.64,1)' }}>
        <rect x="-140" y="44" width="156" height="34" rx="6" fill={on ? ACCENT.mint : CREAM} {...line} strokeWidth={2.5} />
      </g>
      <text x="-62" y="67" textAnchor="middle" fontSize="19" fill={INK} style={hand}>
        {on ? 'one more commit…' : 'closed for today'}
      </text>
    </g>
  </>
)

const Headphones = () => (
  <>
    <path d="M-66 18 A66 66 0 0 1 66 18" stroke={INK} strokeWidth="17" fill="none" strokeLinecap="round" />
    <path d="M-66 18 A66 66 0 0 1 66 18" stroke={ACCENT.gum} strokeWidth="9" fill="none" strokeLinecap="round" />
    <rect x="-88" y="6" width="38" height="58" rx="15" fill={ACCENT.gum} {...line} />
    <rect x="50" y="6" width="38" height="58" rx="15" fill={ACCENT.gum} {...line} />
    <rect x="-80" y="16" width="14" height="38" rx="6" fill={INK} />
    <rect x="66" y="16" width="14" height="38" rx="6" fill={INK} />
    <g className="art-bob-slow">
      <circle cx="96" cy="-46" r="7" fill={INK} />
      <path d="M103 -46 V-74 L118 -69" {...line} fill="none" />
    </g>
    <g className="art-bob-slow" style={{ animationDelay: '-2s' }}>
      <circle cx="122" cy="-14" r="6" fill={INK} />
      <path d="M128 -14 V-36" {...line} fill="none" />
    </g>
  </>
)

const Camera = () => (
  <>
    <rect x="-34" y="-62" width="44" height="20" rx="5" fill="#2E2B33" {...line} />
    <rect x="-74" y="-46" width="148" height="92" rx="16" fill="#2E2B33" {...line} />
    <circle cx="0" cy="0" r="34" fill={ACCENT.peri} {...line} />
    <circle cx="0" cy="0" r="18" fill={INK} />
    <circle cx="-7" cy="-8" r="5" fill={CREAM} />
    <circle className="art-blink" cx="54" cy="-28" r="7" fill={ACCENT.tomato} />
    <text x="40" y="-24" textAnchor="end" fontSize="13" fill={CREAM} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>REC</text>
  </>
)

const Sketchbook = () => (
  <>
    <rect x="-108" y="-74" width="216" height="148" rx="8" fill={ACCENT.sun} {...line} />
    <rect x="-100" y="-66" width="98" height="132" rx="4" fill={CREAM} {...line} strokeWidth={2.5} />
    <rect x="2" y="-66" width="98" height="132" rx="4" fill={CREAM} {...line} strokeWidth={2.5} />
    {[-50, -28, -6, 16, 38].map(y => <circle key={y} cx="0" cy={y} r="4" fill={CREAM} {...line} strokeWidth={2} />)}
    {/* a face on the left page, a doodle being drawn on the right */}
    <circle cx="-52" cy="-6" r="26" fill="none" {...line} strokeWidth={2.5} />
    <circle cx="-60" cy="-12" r="3" fill={INK} />
    <circle cx="-44" cy="-12" r="3" fill={INK} />
    <path d="M-60 4 q8 7 16 0" {...line} strokeWidth={2.5} fill="none" />
    <path className="art-write" d="M22 30 q12 -40 26 -14 t28 -22" {...line} fill="none" pathLength={100} />
    <g className="art-scribble">
      <g transform="translate(86 -14) rotate(35)">
        <rect x="-6" y="-44" width="12" height="44" rx="3" fill={ACCENT.tomato} {...line} />
        <path d="M-6 0 L0 13 L6 0 Z" fill={CREAM} {...line} />
      </g>
    </g>
  </>
)

const Notepad = () => (
  <>
    <rect x="-62" y="-80" width="124" height="160" rx="6" fill={CREAM} {...line} />
    <rect x="-62" y="-80" width="124" height="22" rx="6" fill={ACCENT.mint} {...line} />
    {[-34, -12, 10, 32, 54].map((y, i) => (
      <path key={y} d={`M-44 ${y} H${i === 4 ? 0 : 44}`} {...line} strokeWidth={2} opacity="0.35" />
    ))}
    <path className="art-write" d="M-44 -34 q10 -6 20 0 t20 0 t20 0 t20 0" {...line} strokeWidth={2.5} fill="none" pathLength={100} />
    <g transform="translate(52 40) rotate(-35)">
      <rect x="-5" y="-50" width="10" height="50" rx="3" fill={ACCENT.peri} {...line} strokeWidth={2.5} />
      <path d="M-5 0 L0 10 L5 0 Z" fill={INK} />
    </g>
  </>
)

const Screen = () => (
  <>
    <rect x="-100" y="-66" width="200" height="132" rx="16" fill="#2E2B33" {...line} />
    <rect x="-86" y="-52" width="172" height="104" rx="7" fill={ACCENT.gum} {...line} strokeWidth={2.5} />
    {/* speed lines behind a very happy face */}
    <g className="art-pulse" opacity="0.5">
      {[-60, -30, 0, 30, 60, 90, 120, 150].map(a => (
        <path key={a} d="M0 -30 V-46" transform={`rotate(${a})`} {...line} strokeWidth={2.5} />
      ))}
    </g>
    <circle cx="0" cy="4" r="30" fill={CREAM} {...line} strokeWidth={2.5} />
    <path d="M-16 0 q5 -7 10 0 M6 0 q5 -7 10 0" {...line} strokeWidth={2.5} fill="none" />
    <ellipse cx="-17" cy="12" rx="6" ry="3.5" fill={ACCENT.tomato} opacity="0.7" />
    <ellipse cx="17" cy="12" rx="6" ry="3.5" fill={ACCENT.tomato} opacity="0.7" />
    <path d="M-5 16 q5 5 10 0" {...line} strokeWidth={2.5} fill="none" />
    <path className="art-twinkle" d="M58 -30 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" fill={ACCENT.sun} {...line} strokeWidth={1.5} />
    <path className="art-twinkle" style={{ animationDelay: '-1.2s' }} d="M-58 22 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z" fill={CREAM} {...line} strokeWidth={1.5} />
  </>
)

const Controller = () => (
  <>
    <path d="M-92 -18 Q-82 -48 -46 -48 H46 Q82 -48 92 -18 L106 40 Q111 72 82 72 Q64 72 54 46 H-54 Q-64 72 -82 72 Q-111 72 -106 40 Z" fill={CREAM} {...line} />
    <rect x="-32" y="-44" width="64" height="34" rx="7" fill={ACCENT.peri} {...line} strokeWidth={2.5} />
    <circle cx="-30" cy="18" r="13" fill={INK} />
    <circle cx="30" cy="18" r="13" fill={INK} />
    <path d="M-70 -16 v24 M-82 -4 h24" stroke={INK} strokeWidth="7" strokeLinecap="round" />
    {[
      { x: 70, y: -26, c: ACCENT.mint, d: '0s' },
      { x: 84, y: -12, c: ACCENT.tomato, d: '-0.35s' },
      { x: 56, y: -12, c: ACCENT.gum, d: '-0.7s' },
      { x: 70, y: 2, c: ACCENT.peri, d: '-1.05s' },
    ].map(b => <circle key={`${b.x}${b.y}`} className="art-blink" style={{ animationDelay: b.d }} cx={b.x} cy={b.y} r="6" fill={b.c} {...line} strokeWidth={2} />)}
  </>
)

const Parfait = () => (
  <>
    <defs>
      <clipPath id="parfait-glass">
        <path d="M-34 -46 H34 L26 50 Q24 58 16 58 H-16 Q-24 58 -26 50 Z" />
      </clipPath>
    </defs>
    {/* spoon, dipping in and out */}
    <g className="art-dip">
      <path d="M8 -40 L30 -96" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M8 -40 L30 -96" stroke={ACCENT.peri} strokeWidth="4" strokeLinecap="round" />
    </g>
    <g clipPath="url(#parfait-glass)">
      <rect x="-40" y="-50" width="80" height="24" fill="#FFF6EA" />
      <rect x="-40" y="-26" width="80" height="22" fill={ACCENT.gum} />
      <rect x="-40" y="-4" width="80" height="22" fill="#D39A55" />
      {[-20, -4, 12, 26].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 4 : 10} r="2.5" fill="#8A5A2B" />)}
      <rect x="-40" y="18" width="80" height="44" fill="#FFF6EA" />
      <rect x="-40" y="36" width="80" height="6" fill={ACCENT.gum} opacity="0.5" />
    </g>
    <path d="M-34 -46 H34 L26 50 Q24 58 16 58 H-16 Q-24 58 -26 50 Z" fill="none" {...line} />
    <path d="M-24 -30 L-20 40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    {/* fruit on top */}
    <circle cx="-16" cy="-52" r="9" fill={ACCENT.tomato} {...line} strokeWidth={2} />
    <circle cx="4" cy="-55" r="7" fill={ACCENT.peri} {...line} strokeWidth={2} />
    <circle cx="20" cy="-50" r="6" fill={ACCENT.gum} {...line} strokeWidth={2} />
    <path d="M-16 -61 q4 -8 10 -6" stroke="#2F8F5B" strokeWidth="3" fill="none" strokeLinecap="round" />
  </>
)

// Jollof rice and chicken, with the wooden spoon that made it.
const Plate = () => (
  <>
    <path className="art-steam" d="M-22 -60 q-8 -12 0 -24 t0 -24" {...line} strokeWidth={2.5} fill="none" opacity="0.45" />
    <path className="art-steam" style={{ animationDelay: '-1.3s' }} d="M4 -64 q-8 -12 0 -24 t0 -24" {...line} strokeWidth={2.5} fill="none" opacity="0.45" />
    <circle cx="0" cy="0" r="74" fill={CREAM} {...line} />
    <circle cx="0" cy="0" r="58" fill="#FFFDF8" {...line} strokeWidth={2} opacity="0.9" />
    <path d="M-48 -6 Q-46 -40 -10 -44 Q26 -46 40 -20 Q48 2 26 24 Q-2 40 -30 28 Q-52 16 -48 -6 Z" fill="#E0622F" {...line} strokeWidth={2.5} />
    {[[-30, -18], [-14, -30], [6, -26], [22, -14], [-36, 4], [-18, 10], [2, -6], [14, 10], [-8, 22], [-24, -2]].map(([x, y]) => (
      <path key={`${x}${y}`} d={`M${x} ${y} l5 -2`} stroke="#FFE2C4" strokeWidth="2.5" strokeLinecap="round" />
    ))}
    <circle cx="-2" cy="-14" r="3.5" fill="#3E9B5F" />
    <circle cx="-28" cy="14" r="3.5" fill="#3E9B5F" />
    {/* drumstick */}
    <g transform="translate(22 18) rotate(-28)">
      <ellipse cx="0" cy="0" rx="28" ry="19" fill="#B8642B" {...line} strokeWidth={2.5} />
      <path d="M-12 -6 q8 -4 16 0" stroke="#E39A5B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="24" y="-5" width="22" height="10" rx="4" fill="#FFF6EA" {...line} strokeWidth={2} />
      <circle cx="48" cy="-6" r="6" fill="#FFF6EA" {...line} strokeWidth={2} />
      <circle cx="48" cy="6" r="6" fill="#FFF6EA" {...line} strokeWidth={2} />
    </g>
    {/* wooden spoon, giving it a stir */}
    <g className="art-stir">
      <g transform="translate(-74 40) rotate(-40)">
        <rect x="-5" y="-6" width="10" height="70" rx="5" fill="#D9A066" {...line} strokeWidth={2.5} />
        <ellipse cx="0" cy="-20" rx="15" ry="21" fill="#D9A066" {...line} strokeWidth={2.5} />
      </g>
    </g>
  </>
)

// Where each object sits (x, y, tilt, scale), its hit area, and where its
// bubble opens.
type Spot = {
  x: number; y: number; r: number; s?: number
  hit: [number, number] // half-width, half-height around the drawing's centre
  art: (p: ArtProps) => JSX.Element
  bubble: { x: number; y: number; side: 'above' | 'below'; align: 'start' | 'center' | 'end' }
}
const SPOTS: Record<DeskObject, Spot> = {
  headphones: { x: 150, y: 150, r: -10, hit: [110, 90], art: Headphones, bubble: { x: 120, y: 235, side: 'below', align: 'start' } },
  laptop: { x: 430, y: 170, r: -4, s: 0.85, hit: [140, 96], art: Laptop, bubble: { x: 430, y: 265, side: 'below', align: 'center' } },
  parfait: { x: 640, y: 150, r: 6, hit: [54, 90], art: Parfait, bubble: { x: 640, y: 225, side: 'below', align: 'center' } },
  camera: { x: 845, y: 155, r: 8, hit: [90, 72], art: Camera, bubble: { x: 875, y: 220, side: 'below', align: 'end' } },
  sketchbook: { x: 125, y: 422, r: -7, s: 0.9, hit: [116, 84], art: Sketchbook, bubble: { x: 115, y: 347, side: 'above', align: 'start' } },
  notepad: { x: 310, y: 432, r: 6, s: 0.95, hit: [70, 90], art: Notepad, bubble: { x: 310, y: 352, side: 'above', align: 'center' } },
  food: { x: 480, y: 424, r: 0, hit: [84, 84], art: Plate, bubble: { x: 480, y: 347, side: 'above', align: 'center' } },
  screen: { x: 668, y: 428, r: -4, s: 0.9, hit: [106, 72], art: Screen, bubble: { x: 668, y: 362, side: 'above', align: 'center' } },
  controller: { x: 870, y: 420, r: 7, s: 0.9, hit: [112, 80], art: Controller, bubble: { x: 885, y: 352, side: 'above', align: 'end' } },
}

const BUBBLE_POS = {
  start: 'left-0 -translate-x-[10%]',
  center: 'left-0 -translate-x-1/2',
  end: 'left-0 -translate-x-[90%]',
}
const TAIL_POS = { start: 'left-[10%]', center: 'left-1/2', end: 'left-[90%]' }

function LinkChip({ link }: { link: NonNullable<DeskItem['links']>[number] }) {
  const cls = 'group inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] px-2 py-1 rounded-md bg-white/10 transition-colors hover:bg-white/25'
  const icon: ReactNode =
    link.icon === 'tiktok' ? <span className="w-3.5 h-3.5 flex"><TikTokLogo /></span>
      : link.icon === 'instagram' ? <InstagramLogoIcon className="w-3.5 h-3.5" aria-hidden="true" />
        : <span aria-hidden="true">✎</span>
  const arrow = <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
  return link.href.startsWith('/')
    ? <Link href={link.href} className={cls}>{icon}{link.label}{arrow}</Link>
    : <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{icon}{link.label}{arrow}</a>
}

function Bubble({ item, onEnter, onLeave }: { item: DeskItem; onEnter: () => void; onLeave: () => void }) {
  const { bubble } = SPOTS[item.id]
  const now = item.now && !isPlaceholder(item.now) ? item.now : null
  return (
    <div
      data-desk={item.id}
      className={`absolute z-20 w-max ${bubble.side === 'above' ? '-translate-y-full pb-3' : 'pt-3'}`}
      style={{ left: `${(bubble.x / W) * 100}%`, top: `${(bubble.y / H) * 100}%` }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {/* alignment lives on a plain wrapper; framer owns the inner transform */}
      <div className={BUBBLE_POS[bubble.align]}>
      <motion.div
        role="tooltip"
        className="relative w-max max-w-[260px] rounded-xl bg-sb-ink text-sb-cream px-4 pt-2.5 pb-3 shadow-[4px_4px_0_rgba(26,20,16,0.25)]"
        style={{ transformOrigin: bubble.side === 'above' ? 'bottom center' : 'top center' }}
        initial={{ opacity: 0, scale: 0.7, y: bubble.side === 'above' ? 10 : -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.12 } }}
        transition={{ type: 'spring', stiffness: 500, damping: 24 }}
      >
        <p className="m-0 font-hand text-[24px] leading-none text-sb-sun">{item.label}</p>
        <p className="m-0 mt-1.5 text-[14px] leading-snug text-sb-cream/90">{item.note}</p>
        {now && <p className="m-0 mt-2 font-mono text-[12px] text-sb-mint">now: {now}</p>}
        {!!item.links?.length && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {item.links.map(l => <LinkChip key={l.href} link={l} />)}
          </div>
        )}
        <span aria-hidden="true" className={`absolute w-3.5 h-3.5 -ml-[7px] bg-sb-ink rotate-45 ${TAIL_POS[bubble.align]} ${bubble.side === 'above' ? '-bottom-[6px]' : '-top-[6px]'}`} />
      </motion.div>
      </div>
    </div>
  )
}

export default function Interests() {
  const [active, setActive] = useState<DeskObject | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>()

  // a short grace period lets the mouse travel from an object into its bubble
  const hold = () => clearTimeout(leaveTimer.current)
  const release = () => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setActive(null), 160)
  }

  // Tap elsewhere or press Escape to close.
  useEffect(() => {
    if (!active) return
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.(`[data-desk="${active}"]`)) setActive(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [active])
  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const toggle = (id: DeskObject) => setActive(a => (a === id ? null : id))
  const activeItem = desk.find(d => d.id === active)

  return (
    <Container>
      <Section id="into">
        <SectionHeading
          label="THINGS I'M INTO" title="Outside the editor" accent="peri"
          aside={<p className="m-0 font-hand text-[26px] text-sb-gum-deep rotate-2">go on, poke around my desk</p>}
        />
        <Pop>
          <div className="sb-card relative overflow-hidden !p-0" style={vars({ '--sh': ACCENT.peri })}>
            {/* on phones the desk keeps its size and you swipe around it */}
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="relative min-w-[760px]">
                <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="group" aria-label="My desk">
                  {/* desk top: wood, grain, and a mat */}
                  <rect width={W} height={H} fill="#E8C69B" />
                  {[70, 180, 290, 400, 510].map((y, i) => (
                    <path key={y} d={`M0 ${y} C 250 ${y + (i % 2 ? 14 : -14)}, 600 ${y + (i % 2 ? -12 : 12)}, ${W} ${y}`} stroke="#B98A57" strokeWidth="2" fill="none" opacity="0.35" />
                  ))}
                  <rect x="235" y="44" width="510" height="492" rx="26" fill="#CDE9DA" {...line} strokeWidth={2.5} opacity="0.85" />

                  {desk.map(item => {
                    const s = SPOTS[item.id]
                    const on = active === item.id
                    const dim = !!active && !on
                    return (
                      <g key={item.id} transform={`translate(${s.x} ${s.y}) rotate(${s.r}) scale(${s.s ?? 1})`}>
                        {/* a shadow appears under whatever you pick up */}
                        <ellipse cx="4" cy="14" rx={s.hit[0] * 0.85} ry={s.hit[1] * 0.7} fill={INK}
                          style={{ opacity: on ? 0.13 : 0, transition: 'opacity .3s' }} />
                        <g
                          data-desk={item.id}
                          role="button"
                          tabIndex={0}
                          aria-label={item.label}
                          aria-expanded={on}
                          className="cursor-pointer outline-none"
                          style={{
                            transform: on ? 'translate(-6px, -10px) scale(1.06)' : 'none',
                            transformBox: 'fill-box',
                            transformOrigin: 'center',
                            opacity: dim ? 0.5 : 1,
                            transition: 'transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s',
                          }}
                          onPointerEnter={e => { if (e.pointerType === 'mouse') { hold(); setActive(item.id) } }}
                          onPointerLeave={e => e.pointerType === 'mouse' && release()}
                          onPointerUp={e => e.pointerType !== 'mouse' && toggle(item.id)}
                          onFocus={e => (e.target as Element).matches(':focus-visible') && setActive(item.id)}
                          onBlur={e => !(e.relatedTarget as Element | null)?.closest?.(`[data-desk="${item.id}"]`) && setActive(a => (a === item.id ? null : a))}
                          onKeyDown={(e: ReactKeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle(item.id))}
                        >
                          {/* generous invisible hit area */}
                          <rect x={-s.hit[0]} y={-s.hit[1]} width={s.hit[0] * 2} height={s.hit[1] * 2} fill="transparent" />
                          <s.art on={on} />
                          {on && <rect x={-s.hit[0] - 4} y={-s.hit[1] - 4} width={s.hit[0] * 2 + 8} height={s.hit[1] * 2 + 8} rx="18" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="6 8" className="art-flow" />}
                        </g>
                      </g>
                    )
                  })}
                </svg>

                <AnimatePresence>
                  {activeItem && <Bubble key={activeItem.id} item={activeItem} onEnter={hold} onLeave={release} />}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Pop>
        <p className="sm:hidden -mt-5 m-0 font-mono text-xs text-sb-muted text-center">swipe around the desk →</p>
      </Section>
    </Container>
  )
}
