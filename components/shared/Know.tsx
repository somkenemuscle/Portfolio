'use client'
import { skillGroups } from '@/constants/skillGroups'
import { stackIcons } from '@/constants/stackIcons'
import { projectData } from '@/constants/projectData'
import { ACCENT, Container, Pop, Section, SectionHeading, cycleAccent, cycleTilt, vars } from './Sketch'

// Icon lookup by loose name ("Next.js" == "NextJs"), from the stack icons
// plus whatever the project cards already reference.
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const ICONS = new Map<string, string>()
projectData.forEach(p => p.technologies.forEach(t => t.icon && ICONS.set(key(t.name), t.icon)))
stackIcons.forEach(i => ICONS.set(key(i.name), i.src))
ICONS.set('aws', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg')

export default function Know() {
  return (
    <Container>
      <Section id="know">
        <SectionHeading label="TOOLBOX" title="What I know" accent="mint" />
        <div className="grid gap-7 grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {skillGroups.map((g, gi) => (
            <Pop key={g.title} delay={gi * 0.08} className="flex">
              <div
                className={`sb-card w-full p-7 flex flex-col gap-5 ${g.learning ? 'border-dashed' : ''}`}
                style={vars({ '--sh': ACCENT[g.accent] })}
              >
                <div className="flex justify-between items-baseline gap-3">
                  <h3 className="m-0 text-[22px] font-extrabold">{g.title}</h3>
                  <span className="font-mono text-xs text-sb-muted">{g.hint}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {g.skills.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      className={`sb-sticker ${g.learning ? '!bg-transparent !text-sb-cream border-dashed' : ''}`}
                      style={{ ...vars({ '--r': `${cycleTilt(i + gi * 3)}deg` }), background: cycleAccent(i + gi * 2) }}
                    >
                      {ICONS.get(key(s)) && (
                        <span className="w-7 h-7 -ml-2 shrink-0 rounded-full bg-sb-cream border-2 border-sb-paper flex items-center justify-center">
                          <img src={ICONS.get(key(s))} alt="" className="w-4 h-4 object-contain" draggable={false} />
                        </span>
                      )}
                      {s}
                    </span>
                  ))}
                </div>
                {g.learning && <p className="m-0 font-hand text-[22px] text-sb-peri">new stickers land here first</p>}
              </div>
            </Pop>
          ))}
        </div>
      </Section>
    </Container>
  )
}
