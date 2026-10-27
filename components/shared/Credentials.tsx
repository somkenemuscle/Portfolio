'use client'

import type { ReactNode } from 'react'
import { GraduationCap, BadgeCheck } from 'lucide-react'
import { certificates, education } from '@/constants/credentials'
import { ACCENT, Container, Pop, Section, SectionHeading, deep, vars } from './Sketch'

// A certificate-style card with a little rubber-stamp year in the corner.
function PaperCard({ icon, title, badge, sub, year, color, delay }: {
  icon: ReactNode
  title: string
  badge?: string
  sub: ReactNode
  year: string
  color: string
  delay: number
}) {
  return (
    <Pop delay={delay}>
      <div className="sb-card sb-card-hover relative flex items-start gap-4 p-6 min-h-[120px]" style={vars({ '--sh': color })}>
        <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border-[2.5px] border-sb-ink text-sb-ink -rotate-6"
          style={{ background: color }}>
          {icon}
        </div>
        <div className="flex flex-col gap-1 pr-16">
          <h3 className="m-0 text-lg font-extrabold leading-snug">
            {title}
            {badge && (
              <span className="ml-2 align-middle font-mono text-[11px] px-2 py-0.5 rounded-md border-2" style={{ borderColor: color, color: deep(color) }}>
                {badge}
              </span>
            )}
          </h3>
          <p className="m-0 text-[15px] text-sb-soft">{sub}</p>
        </div>
        <span className="absolute top-5 right-5 font-mono text-xs font-bold px-2.5 py-1 border-2 border-dashed rounded-md rotate-6"
          style={{ borderColor: color, color: deep(color) }}>
          {year}
        </span>
      </div>
    </Pop>
  )
}

export default function Credentials() {
  return (
    <Container className="pb-24 md:pb-32">
      <Section id="credentials">
        <SectionHeading
          label="PAPERWORK" title="Credentials" accent="peri"
          aside={<p className="m-0 font-hand text-[26px] text-sb-sun-deep -rotate-2">the official bits</p>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-10">
          <div className="flex flex-col gap-5">
            <p className="m-0 font-mono text-xs tracking-[0.14em] text-sb-muted">CERTIFICATES</p>
            {certificates.map((cert, i) => (
              <PaperCard
                key={cert.title}
                icon={<BadgeCheck size={22} strokeWidth={2.2} />}
                title={cert.title}
                sub={<>{cert.issuer}{cert.location && <span className="text-sb-muted"> · {cert.location}</span>}</>}
                year={cert.year}
                color={ACCENT.sun}
                delay={i * 0.08}
              />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <p className="m-0 font-mono text-xs tracking-[0.14em] text-sb-muted">EDUCATION</p>
            {education.map((edu, i) => (
              <PaperCard
                key={edu.degree}
                icon={<GraduationCap size={22} strokeWidth={2.2} />}
                title={edu.degree}
                badge={edu.short}
                sub={edu.institution}
                year={edu.year}
                color={ACCENT.mint}
                delay={0.06 + i * 0.08}
              />
            ))}
          </div>
        </div>
      </Section>
    </Container>
  )
}
