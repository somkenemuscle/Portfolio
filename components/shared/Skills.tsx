"use client";

import { motion } from "framer-motion";
import { stackIcons } from "@/constants/stackIcons";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

function Skills() {
  return (
    <>
      {/* ── Story ── */}
      <section className="pb-20">
        <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

          <motion.p {...enter(0.05)}
            className="text-[11px] font-medium tracking-[0.18em] uppercase mb-10"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            My Story
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">

            {/* Left column */}
            <div className="flex flex-col gap-7">
              <motion.p {...enter(0.1)} className="text-[16px] leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.78)' }}>
                My path into{' '}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>software engineering</span>{' '}
                didn&apos;t start with a computer. It started with a sketchbook and a pair of
                headphones. I spent years drawing and making music, learning how to take something
                that exists only in your head and shape it into something real that others can
                experience. That process of creation, of translating an idea into a finished thing,
                is exactly what pulled me into code.
              </motion.p>

              <motion.p {...enter(0.15)} className="text-[16px] leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.78)' }}>
                When I wrote my first lines of JavaScript I immediately recognised the same feeling.
                The feedback loop of building something, breaking it, fixing it, and watching it
                finally work was deeply satisfying in the same way making a beat or finishing a
                drawing was. I became{' '}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>obsessed</span>{' '}
                quickly. I started building small projects, then bigger ones, pushing myself to
                understand not just how things work but why they&apos;re built the way they are.
              </motion.p>

              <motion.p {...enter(0.2)} className="text-[16px] leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.78)' }}>
                Over time I gravitated toward the{' '}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>full stack</span>.
                I wanted to understand every layer of what I was building, from the interface a
                user touches to the database storing their data. That breadth lets me move fast,
                make better architectural decisions, and own features end to end without waiting
                on anyone. It&apos;s made me a much more complete engineer.
              </motion.p>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-7">
              <motion.p {...enter(0.12)} className="text-[16px] leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.78)' }}>
                Today I specialise in building{' '}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                  performant, accessible, and visually sharp
                </span>{' '}
                web products. I care deeply about the details: transitions that feel right,
                interfaces that are intuitive without needing instructions, APIs that are
                predictable and fast. I believe the best engineering is invisible; users
                shouldn&apos;t think about the technology, they should just enjoy the experience.
              </motion.p>

              <motion.p {...enter(0.17)} className="text-[16px] leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.78)' }}>
                I&apos;ve worked with early-stage startups and growing products across{' '}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>Nigeria, the UK, and the US</span>.
                Each environment taught me something different: shipping fast under pressure,
                writing code that scales, collaborating across time zones, and communicating
                technical decisions to non-technical stakeholders. I thrive in environments
                where the bar is high and the work actually matters.
              </motion.p>

              <motion.p {...enter(0.22)} className="text-[16px] leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.78)' }}>
                Outside of work I&apos;m into{' '}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                  video creation, editing, and anime
                </span>{' '}
                all things that have quietly shaped how I think about pacing, composition,
                and visual hierarchy in interfaces. That creative eye carries directly into
                the products I build and the decisions I make as an engineer.
              </motion.p>
            </div>

          </div>

        </div>
      </section>

      {/* ── Divider ── */}
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16 mb-20">
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* ── Stack ── */}
      <section id="about" className="pb-24 md:pb-32">
        <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

          <motion.p {...enter(0.05)}
            className="text-[11px] font-medium tracking-[0.18em] uppercase mb-10"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            Technologies
          </motion.p>

          <motion.div {...enter(0.12)}
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
            {stackIcons.map((icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-2.5"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-2xl"
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <img src={icon.src} alt={icon.name} className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-center leading-tight"
                  style={{ color: 'rgba(255,255,255,0.32)' }}>
                  {icon.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Skills;
