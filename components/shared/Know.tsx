'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillGroups, usedEverywhere } from '@/constants/skillGroups'
import { projectData } from '@/constants/projectData'
import { ACCENT, Accent, Container, Pop, Section, SectionHeading, cycleAccent, cycleTilt, deep, isPlaceholder, vars } from './Sketch'

// Loose name matching ("Next.js" == "NextJs", "Express.js" == "Express").
const ALIAS: Record<string, string> = { expressjs: 'express', awss3: 'aws' }
const key = (s: string) => {
  const k = s.toLowerCase().replace(/[^a-z0-9]/g, '')
  return ALIAS[k] ?? k
}

// The receipts: which projects used each tool.
type Proof = { title: string; href?: string; color: string }
const USED_IN = new Map<string, Proof[]>()
projectData.forEach(p => {
  const proof = {
    title: p.title,
    href: (p as { livePreview?: string }).livePreview,
    color: ACCENT[((p as { accent?: string }).accent ?? 'sun') as Accent],
  }
  new Set([...p.technologies.map(t => t.name), ...usedEverywhere].map(key))
    .forEach(k => USED_IN.set(k, [...(USED_IN.get(k) ?? []), proof]))
})

type Align = 'center' | 'start' | 'end'
const BUBBLE_POS: Record<Align, string> = {
  center: 'left-1/2 -translate-x-1/2 origin-bottom',
  start: 'left-0 origin-bottom-left',
  end: 'right-0 origin-bottom-right',
}
const TAIL_POS: Record<Align, string> = { center: 'left-1/2 -ml-[7px]', start: 'left-6', end: 'right-6' }

function Sticker({ name, color, tilt, learning, delay, active, dimmed, align, onOpen, onClose, onToggle }: {
  name: string
  color: string
  tilt: number
  learning?: boolean
  delay: number
  active: boolean
  dimmed: boolean
  align: Align
  onOpen: (el: HTMLElement) => void
  onClose: () => void
  onToggle: (el: HTMLElement) => void
}) {
  const proof = USED_IN.get(key(name)) ?? []
  const hasBubble = learning || proof.length > 0

  return (
    // sticks on as it scrolls into view
    <motion.span
      data-skill={name}
      className={`relative inline-flex ${active ? 'z-20' : ''}`}
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: 'spring', stiffness: 420, damping: 16, delay }}
      onPointerEnter={e => e.pointerType === 'mouse' && onOpen(e.currentTarget)}
      onPointerLeave={e => e.pointerType === 'mouse' && onClose()}
      // keyboard focus only; a tap is handled by onToggle below
      onFocus={e => (e.target as Element).matches(':focus-visible') && onOpen(e.currentTarget)}
      onBlur={e => !e.currentTarget.contains(e.relatedTarget as Node) && onClose()}
    >
      {/* lift + dim live on a wrapper so they don't fight the sticker's CSS jiggle */}
      <motion.span
        className="inline-flex"
        animate={{ y: active ? -6 : 0, scale: active ? 1.06 : 1, opacity: dimmed ? 0.45 : 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      >
      <span
        role={hasBubble ? 'button' : undefined}
        tabIndex={0}
        aria-expanded={hasBubble ? active : undefined}
        // touch: tap to open / close (mouse already opens on hover)
        onPointerUp={e => e.pointerType !== 'mouse' && onToggle(e.currentTarget)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onToggle(e.currentTarget))}
        className={`sb-sticker select-text cursor-default outline-none transition-shadow focus-visible:ring-[3px] focus-visible:ring-sb-ink focus-visible:ring-offset-2 ${learning ? '!bg-transparent border-dashed' : ''}`}
        style={{ ...vars({ '--r': `${tilt}deg` }), background: learning ? undefined : color, boxShadow: active ? '5px 7px 0 #1A1410' : undefined }}
      >
        {name}
        {learning && <span aria-hidden="true" className="font-hand text-[20px] leading-none -mr-1 text-sb-peri-deep">✎</span>}
      </span>
      </motion.span>

      <AnimatePresence>
        {active && hasBubble && (
          // pb-3 bridges the gap so the mouse can travel into the bubble
          <span className={`absolute bottom-full pb-3 ${BUBBLE_POS[align]}`}>
            <motion.span
              role="tooltip"
              className={`relative block w-max max-w-[min(82vw,300px)] rounded-xl bg-sb-ink text-sb-cream px-3.5 pt-2 pb-2.5 shadow-[4px_4px_0_rgba(26,20,16,0.25)] ${BUBBLE_POS[align].split(' ').pop()}`}
              initial={{ opacity: 0, y: 10, scale: 0.7, rotate: align === 'end' ? 4 : -4 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 6, scale: 0.85, transition: { duration: 0.12 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            >
              <span className="block font-hand text-[21px] leading-none text-sb-sun mb-2">
                {learning ? 'learning it right now' : proof.length === projectData.length ? 'used in every project' : proof.length > 1 ? `used in ${proof.length} projects` : 'used in'}
              </span>
              {proof.length > 0 && (
                <span className="flex flex-wrap gap-1.5">
                  {proof.map((p, i) => {
                    const chip = (
                      <>
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                        {p.title}
                        {p.href && <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>}
                      </>
                    )
                    const cls = 'group inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] px-2 py-1 rounded-md bg-white/10'
                    return (
                      <motion.span key={p.title} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                        {p.href
                          ? <a href={p.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:bg-white/25`}>{chip}</a>
                          : <span className={cls}>{chip}</span>}
                      </motion.span>
                    )
                  })}
                </span>
              )}
              <span aria-hidden="true" className={`absolute -bottom-[6px] w-3.5 h-3.5 bg-sb-ink rotate-45 ${TAIL_POS[align]}`} />
            </motion.span>
          </span>
        )}
      </AnimatePresence>
    </motion.span>
  )
}

export default function Know() {
  const [active, setActive] = useState<{ name: string; align: Align } | null>(null)

  // Keep the bubble on screen: centre it when there's room, else hug a side.
  const open = (name: string) => (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    const mid = r.left + r.width / 2
    const align: Align = mid < 170 ? 'start' : window.innerWidth - mid < 170 ? 'end' : 'center'
    setActive({ name, align })
  }

  // Tap elsewhere or press Escape to close.
  useEffect(() => {
    if (!active) return
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.(`[data-skill="${CSS.escape(active.name)}"]`)) setActive(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <Container>
      <Section id="know">
        <SectionHeading
          label="TOOLBOX" title="What I know" accent="mint"
          aside={<p className="m-0 font-hand text-[26px] text-sb-peri-deep -rotate-2">poke a sticker for the receipts</p>}
        />
        <div className="grid gap-7 md:grid-cols-2">
          {skillGroups.map((g, gi) => {
            const items = [
              ...g.skills.filter(s => !isPlaceholder(s)).map(name => ({ name, learning: false })),
              ...(g.learning ?? []).filter(s => !isPlaceholder(s)).map(name => ({ name, learning: true })),
            ]
            const activeHere = items.some(s => s.name === active?.name)
            return (
              <Pop key={g.title} delay={gi * 0.08} className={`relative flex ${g.wide ? 'md:col-span-2' : ''} ${activeHere ? 'z-10' : ''}`}>
                <div className="sb-card w-full p-7 sm:p-8 flex flex-col gap-6" style={vars({ '--sh': ACCENT[g.accent] })}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="m-0 text-[26px] font-extrabold tracking-tight">{g.title}</h3>
                    <span className="font-hand text-[22px] leading-none -rotate-1" style={{ color: deep(ACCENT[g.accent]) }}>{g.note}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {items.map((s, i) => (
                      <Sticker
                        key={s.name}
                        name={s.name}
                        learning={s.learning}
                        color={cycleAccent(i + gi * 2)}
                        tilt={cycleTilt(i + gi * 3) * 0.3}
                        delay={0.1 + i * 0.045}
                        active={active?.name === s.name}
                        dimmed={activeHere && active?.name !== s.name}
                        align={active?.name === s.name ? active.align : 'center'}
                        onOpen={open(s.name)}
                        onClose={() => setActive(a => (a?.name === s.name ? null : a))}
                        onToggle={el => (active?.name === s.name ? setActive(null) : open(s.name)(el))}
                      />
                    ))}
                  </div>
                </div>
              </Pop>
            )
          })}
        </div>
      </Section>
    </Container>
  )
}
