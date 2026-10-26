'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectData } from '@/constants/projectData'
import { ACCENT, Accent, Container, Pop, Section, SectionHeading, vars } from './Sketch'
import ProjectArt, { hasArt } from './ProjectArt'

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

type Project = (typeof projectData)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [xray, setXray] = useState(false)
  const color = ACCENT[(project.accent ?? 'sun') as Accent]
  const Icon = project.icon
  // optional result sticker, e.g. outcome: "2x faster checkout" in projectData
  const outcome = (project as { outcome?: string }).outcome
  const on = () => setXray(true)
  const off = () => setXray(false)

  return (
    <Pop delay={index * 0.08} className={`snap-start shrink-0 w-[min(85vw,360px)] ${index % 2 === 1 ? 'md:mt-9' : ''}`}>
      <article className="sb-card sb-card-hover p-[18px] flex flex-col gap-4 h-full" style={vars({ '--sh': color })}>
        <button
          type="button"
          aria-label={`Hold to see how ${project.title} is built`}
          onPointerDown={on} onPointerUp={off} onPointerLeave={off} onPointerCancel={off}
          onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); on() } }}
          onKeyUp={off} onBlur={off}
          onContextMenu={e => e.preventDefault()}
          className="relative block h-[260px] w-full overflow-hidden rounded-[14px] border-[2.5px] border-sb-cream cursor-pointer select-none touch-manipulation [-webkit-touch-callout:none] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sb-sun"
          style={{ background: color }}
        >
          {hasArt(project.art) ? (
            <>
              {/* dotted paper behind the drawing */}
              <span aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(21,17,13,0.14)_1.2px,transparent_1.6px)] [background-size:16px_16px]" />
              <ProjectArt art={project.art} title={project.title} />
            </>
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-sb-paper">
              <Icon size={56} stroke={1.8} aria-hidden="true" />
              <span className="font-extrabold text-2xl">{project.title}</span>
            </span>
          )}
          <span aria-hidden="true" className="absolute bottom-3 right-3 font-mono text-[11px] px-2 py-1 rounded-md bg-sb-paper text-sb-cream border-2 border-sb-paper rotate-2">
            hold to x-ray
          </span>

          <AnimatePresence>
            {xray && (
              <motion.span
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="sb-xray absolute inset-0 flex flex-col justify-center gap-0 px-5 py-4 text-left"
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-sb-peri mb-2.5">X-RAY · HOW IT&apos;S BUILT</span>
                {project.architecture ? (
                  project.architecture.map((layer, li) => (
                    <span key={layer.role} className="flex flex-col">
                      {li > 0 && (
                        // animated wire between layers
                        <svg aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" className="ml-[62px] block">
                          <path className="art-dash" d="M6 0 V10" stroke="#8EA0FF" strokeWidth="2" strokeDasharray="3 4" fill="none" />
                          <path d="M2 9 L6 13 L10 9" stroke="#8EA0FF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.12 + li * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="w-[50px] shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-sb-peri/80">{layer.role}</span>
                        <span className="flex flex-wrap gap-1.5">
                          {layer.nodes.map(n => (
                            <span key={n} className="font-mono text-[12px] leading-none px-2 py-1.5 rounded-md border-[1.5px] border-sb-cream/70 bg-[#16224D] text-sb-cream">
                              {n}
                            </span>
                          ))}
                        </span>
                      </motion.span>
                    </span>
                  ))
                ) : (
                  <span className="flex flex-wrap gap-2">
                    {project.technologies.map(t => (
                      <span key={t.name} className="font-mono text-[13px] px-2.5 py-1 border border-sb-peri/60 rounded-md text-sb-cream">
                        {t.name}
                      </span>
                    ))}
                  </span>
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div className="flex flex-col gap-2 px-1.5 pb-1.5">
          <span className="font-mono text-xs tracking-[0.08em]" style={{ color }}>{project.niche}</span>
          <h3 className="m-0 text-[28px] font-extrabold">{project.title}</h3>
          <p className="m-0 text-base leading-normal text-sb-soft">{project.blurb ?? project.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
            <a href={project.livePreview} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[13px] text-sb-cream underline-offset-4 hover:text-sb-sun hover:underline">
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
    </Pop>
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

// Projects sit in one horizontal row that scrolls (swipe, trackpad or the
// arrows) so the section stays the same height as more get added.
export function Projects() {
  const row = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

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
              <p className="m-0 font-hand text-[26px] text-sb-peri -rotate-3">psst, press &amp; hold a drawing</p>
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
          <div
            ref={row}
            onScroll={update}
            className="flex items-start gap-8 overflow-x-auto snap-x snap-mandatory scroll-px-1 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-2 pb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projectData.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
          {/* fade on the side that has more to scroll to */}
          {!edge.end && <span aria-hidden="true" className="pointer-events-none absolute right-[-24px] top-0 bottom-12 w-16 bg-gradient-to-l from-sb-paper to-transparent" />}
          {!edge.start && <span aria-hidden="true" className="pointer-events-none absolute left-[-24px] top-0 bottom-12 w-16 bg-gradient-to-r from-sb-paper to-transparent" />}
        </div>
        {scrollable && (
          <p className="sm:hidden -mt-8 m-0 font-mono text-xs text-sb-muted text-center">swipe for more →</p>
        )}
      </Section>
    </Container>
  )
}
