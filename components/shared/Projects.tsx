'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectData } from '@/constants/projectData'
import { ACCENT, Accent, Container, Pop, Section, SectionHeading, vars } from './Sketch'

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

type Project = (typeof projectData)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [xray, setXray] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const color = ACCENT[(project.accent ?? 'sun') as Accent]
  const Icon = project.icon
  const on = () => setXray(true)
  const off = () => setXray(false)

  return (
    <Pop delay={index * 0.08} className={index % 2 === 1 ? 'md:mt-9' : ''}>
      <article className="sb-card sb-card-hover p-[18px] flex flex-col gap-4 h-full" style={vars({ '--sh': color })}>
        <button
          type="button"
          aria-label={`Hold to see the ${project.title} tech stack`}
          onPointerDown={on} onPointerUp={off} onPointerLeave={off} onPointerCancel={off}
          onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); on() } }}
          onKeyUp={off} onBlur={off}
          onContextMenu={e => e.preventDefault()}
          className="relative block h-[260px] w-full overflow-hidden rounded-[14px] border-[2.5px] border-sb-cream cursor-pointer select-none touch-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sb-sun"
          style={{ background: color }}
        >
          {project.image && !imgFailed ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              draggable={false}
              onError={() => setImgFailed(true)}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-sb-paper">
              <Icon size={56} stroke={1.8} aria-hidden="true" />
              <span className="font-extrabold text-2xl">{project.title}</span>
            </span>
          )}

          <AnimatePresence>
            {xray && (
              <motion.span
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="sb-xray absolute inset-0 flex flex-col justify-center gap-3 p-6 text-left"
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-sb-peri">X-RAY · STACK</span>
                <span className="flex flex-wrap gap-2">
                  {project.technologies.map(t => (
                    <span key={t.name} className="font-mono text-[13px] px-2.5 py-1 border border-sb-peri/60 rounded-md text-sb-cream">
                      {t.name}
                    </span>
                  ))}
                </span>
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
            {project.outcome && (
              <span className="sb-sticker !text-[13px] !px-3 !py-1" style={{ ...vars({ '--r': '-3deg' }), background: color }}>
                {project.outcome}
              </span>
            )}
          </div>
        </div>
      </article>
    </Pop>
  )
}

export function Projects() {
  return (
    <Container>
      <Section id="work">
        <SectionHeading
          label="SELECTED WORK" title="Things I've shipped" accent="sun"
          aside={<p className="m-0 font-hand text-[26px] text-sb-peri -rotate-3">psst, press &amp; hold a screenshot</p>}
        />
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          {projectData.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </Section>
    </Container>
  )
}
