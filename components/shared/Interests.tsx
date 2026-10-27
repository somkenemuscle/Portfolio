'use client'
import { motion } from 'framer-motion'
import { InstagramLogoIcon } from '@radix-ui/react-icons'
import { interests } from '@/constants/interests'
import { TikTokLogo } from './BrandIcons'
import { Container, Pop, Section, SectionHeading, cycleAccent, cycleTilt, isPlaceholder, vars } from './Sketch'

// A board of floating stickers. Each one can be picked up and tossed around;
// it springs back home when let go.
export default function Interests() {
  return (
    <Container>
      <Section id="into">
        <SectionHeading
          label="THINGS I'M INTO" title="Outside the editor" accent="peri"
          aside={<p className="m-0 font-hand text-[26px] text-sb-gum-deep rotate-2">go on, drag one</p>}
        />
        <Pop>
          <div className="sb-card flex flex-wrap justify-center items-center gap-x-8 gap-y-6 px-6 sm:px-8 py-12 min-h-[340px]"
            style={vars({ '--sh': '#FF6B4A' })}>
            {interests.filter(t => !isPlaceholder(t.label)).map(({ label, links }, i) => (
              <motion.div
                key={`${label}-${i}`}
                drag
                dragSnapToOrigin
                dragElastic={0.6}
                whileDrag={{ scale: 1.15, rotate: 0, zIndex: 10 }}
                className="cursor-grab active:cursor-grabbing touch-none"
              >
                <span
                  className="sb-sticker sb-float !text-[22px] !px-6 !py-3.5"
                  style={{
                    ...vars({ '--r': `${cycleTilt(i) * 1.4}deg` }),
                    background: cycleAccent(i),
                    animationDelay: `${-i * 0.7}s`,
                  }}
                >
                  {label}
                  {links?.map(l => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${l.label}: codes.by.oj`}
                      // keep a tap on the icon from starting a drag
                      onPointerDownCapture={e => e.stopPropagation()}
                      className="w-9 h-9 -my-1 flex items-center justify-center rounded-full bg-sb-ink text-sb-cream border-2 border-sb-ink transition-transform hover:scale-110 hover:-rotate-6 cursor-pointer"
                    >
                      <span className="w-[18px] h-[18px] flex">
                        {l.icon === 'tiktok' ? <TikTokLogo /> : <InstagramLogoIcon className="w-full h-full" aria-hidden="true" />}
                      </span>
                    </a>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>
        </Pop>
      </Section>
    </Container>
  )
}
