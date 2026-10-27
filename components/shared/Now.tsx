'use client'
import { now, nowUpdatedAt } from '@/constants/now'
import { ACCENT, Container, Pop, Section, SectionHeading, cycleTilt, vars } from './Sketch'

const stamp = new Date(nowUpdatedAt + 'T00:00:00')
  .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  .toUpperCase()

export default function Now() {
  return (
    <Container>
      <Section id="now">
        <SectionHeading
          label="NOW" title="What I'm up to" accent="gum"
          aside={
            <span className="font-mono text-[13px] px-3.5 py-2 border-2 border-sb-gum rounded-[10px] text-sb-gum-deep rotate-3">
              UPDATED · {stamp}
            </span>
          }
        />
        <div className="grid gap-7 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {now.map((item, i) => {
            const color = ACCENT[item.accent]
            return (
              <Pop key={item.label} delay={i * 0.06} className="flex">
                <div className="sb-card sb-card-hover p-6 flex flex-col gap-3.5 w-full" style={vars({ '--sh': color })}>
                  <span className="sb-sticker self-start !text-sm !px-3.5 !py-1.5"
                    style={{ ...vars({ '--r': `${cycleTilt(i)}deg` }), background: color }}>
                    {item.label}
                  </span>
                  <h3 className="m-0 text-2xl font-extrabold leading-tight">{item.title}</h3>
                  {item.note && <p className="m-0 text-base leading-normal text-sb-soft">{item.note}</p>}

                  {item.progress !== undefined && (
                    <div className="mt-auto flex flex-col gap-1.5">
                      <span className="font-mono text-xs text-sb-muted">progress · {item.progress}%</span>
                      <div className="h-3.5 border-2 border-sb-ink rounded-full overflow-hidden"
                        role="progressbar" aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.title} progress`}>
                        <div className="h-full" style={{ width: `${item.progress}%`, background: color }} />
                      </div>
                    </div>
                  )}

                  {item.music && (
                    <div className="mt-auto flex items-end gap-1 h-7" aria-hidden="true">
                      {[18, 26, 12, 22, 16].map((h, b) => (
                        <span key={b} className="sb-float w-1.5 rounded-sm"
                          style={{ height: h, background: color, animationDuration: `${0.8 + b * 0.15}s` }} />
                      ))}
                    </div>
                  )}
                </div>
              </Pop>
            )
          })}
        </div>
      </Section>
    </Container>
  )
}
