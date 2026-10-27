'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { LogEntry } from '@/constants/logbook'
import { ACCENT, Container, Pop, Section, SectionHeading, cycleTilt, vars } from './Sketch'
import { CountUp, Cover, TYPE_META, TypeStamp, countLabel, fmtLogDate, sortedLog, typeCounts } from './LogbookShared'

// A corkboard teaser for the Logbook: the latest three things, pinned up as
// polaroids. Each one opens straight onto its entry on /logbook.

const CORK = {
  backgroundColor: '#DDBB8C',
  backgroundImage:
    'radial-gradient(rgba(26,20,16,0.16) 1.2px, transparent 1.6px), radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1.4px)',
  backgroundSize: '9px 9px, 13px 13px',
  backgroundPosition: '0 0, 4px 6px',
}

// Photos first, newest first.
const pinned = () => {
  const all = sortedLog()
  return [...all.filter(e => e.photos?.length), ...all.filter(e => !e.photos?.length)].slice(0, 3)
}

function Polaroid({ entry, index }: { entry: LogEntry; index: number }) {
  const tilt = cycleTilt(index + 1)
  const { color } = TYPE_META[entry.type]
  const delay = 0.15 + index * 0.18

  return (
    <Link
      href={`/logbook#${entry.slug}`}
      className="group relative block shrink-0 snap-center w-[min(68vw,250px)] sm:w-auto pt-3 rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-sb-ink focus-visible:ring-offset-4 focus-visible:ring-offset-[#DDBB8C]"
    >
      {/* the pin drops in first… */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 left-1/2 -ml-[11px] z-20 w-[22px] h-[22px] rounded-full border-[2.5px] border-sb-ink"
        style={{ background: color, boxShadow: 'inset -3px -3px 0 rgba(0,0,0,0.18), 2px 3px 0 rgba(26,20,16,0.35)' }}
        initial={{ y: -40, opacity: 0, scale: 1.4 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 520, damping: 16, delay }}
      />
      {/* …then the polaroid swings into place under it, and sways on hover */}
      <motion.span
        className="block"
        style={{ transformOrigin: '50% 0' }}
        initial={{ rotate: tilt + 16, opacity: 0 }}
        whileInView={{ rotate: tilt, opacity: 1 }}
        whileHover={{ rotate: [tilt, tilt - 4, tilt + 3, tilt - 1.5, tilt], y: -6, transition: { duration: 0.9 } }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 110, damping: 7, delay: delay + 0.12 }}
      >
        <span className="block bg-[#FFFDF8] p-2.5 pb-4 border-[2.5px] border-sb-ink rounded-[6px] shadow-[5px_6px_0_rgba(26,20,16,0.35)] transition-shadow duration-300 group-hover:shadow-[9px_12px_0_rgba(26,20,16,0.3)]">
          <span className="relative block aspect-[4/5] overflow-hidden rounded-[3px] border-2 border-sb-ink bg-sb-raised">
            <Cover entry={entry} compact className="transition-transform duration-500 group-hover:scale-[1.06]" />
            <TypeStamp entry={entry} className="absolute top-2 left-2 -rotate-3 !text-[10px]" />
          </span>
          <span className="block mt-3 px-1 font-hand text-[23px] leading-[1.05] text-sb-ink">{entry.title}</span>
          <span className="block mt-1 px-1 font-mono text-[11px] text-sb-muted">{fmtLogDate(entry)}</span>
        </span>
      </motion.span>
    </Link>
  )
}

export default function LogbookBoard() {
  const items = pinned()
  if (!items.length) return null

  return (
    <Container>
      <Section id="logbook">
        <SectionHeading
          label="LOGBOOK" title="Out in the wild" accent="tomato"
          aside={<p className="m-0 font-hand text-[26px] text-sb-tomato-deep rotate-2">talks, hackathons &amp; the rest</p>}
        />
        <Pop>
          <div className="sb-card relative px-4 sm:px-10 pt-10 pb-8 overflow-hidden" style={{ ...CORK, ...vars({ '--sh': ACCENT.tomato }) }}>
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-4 px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-10 sm:overflow-visible">
              {items.map((e, i) => <Polaroid key={e.slug} entry={e} index={i} />)}
            </div>

            <div className="relative mt-6 flex flex-wrap items-center justify-between gap-5">
              <div className="flex flex-wrap gap-2.5">
                {typeCounts().map((t, i) => (
                  <span
                    key={t.type}
                    className="sb-sticker !text-[14px] !px-3.5 !py-1.5"
                    style={{ ...vars({ '--r': `${cycleTilt(i) * 0.5}deg` }), background: TYPE_META[t.type].color }}
                  >
                    <CountUp to={t.count} /> {countLabel(t.type, t.count)}
                  </span>
                ))}
              </div>
              <Link href="/logbook" className="group sb-btn bg-sb-cream">
                See the whole wall
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Pop>
      </Section>
    </Container>
  )
}
