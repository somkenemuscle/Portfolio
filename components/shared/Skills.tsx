"use client";

import React from "react";
import { ACCENT, Container, Pop, Section, SectionHeading, vars } from "./Sketch";

// Highlighter-marker emphasis for key phrases in the story.
const Mark = ({ children, color = ACCENT.sun }: { children: React.ReactNode; color?: string }) => (
  <span
    className="font-semibold text-sb-ink px-1.5 rounded-[4px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
    style={{ background: color }}
  >
    {children}
  </span>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="m-0 text-[17px] leading-[1.85] text-sb-ink/90">{children}</p>
);

function Skills() {
  return (
    <>
      {/* ── Story ── */}
      <Container>
        <Section id="story">
          <SectionHeading
            label="MY STORY" title="How I got here" accent="sun"
            aside={<p className="m-0 font-hand text-[26px] text-sb-gum-deep rotate-2">it started with a sketchbook</p>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Pop>
              <div className="sb-card p-7 sm:p-9 flex flex-col gap-6 h-full" style={vars({ "--sh": ACCENT.gum })}>
                <P>
                  My path into <Mark color={ACCENT.gum}>software engineering</Mark> didn&apos;t start with a computer.
                  It started with a sketchbook and a pair of headphones. I spent years drawing and making music,
                  learning how to take something that exists only in your head and shape it into something real
                  that others can experience. That process of creation, of translating an idea into a finished
                  thing, is exactly what pulled me into code.
                </P>
                <P>
                  When I wrote my first lines of JavaScript I immediately recognised the same feeling. The feedback
                  loop of building something, breaking it, fixing it, and watching it finally work was deeply
                  satisfying in the same way making a beat or finishing a drawing was. I became{" "}
                  <Mark>obsessed</Mark> quickly. I started building small projects, then bigger ones, pushing myself
                  to understand not just how things work but why they&apos;re built the way they are.
                </P>
                <P>
                  Over time I gravitated toward the <Mark color={ACCENT.mint}>full stack</Mark>. I wanted to
                  understand every layer of what I was building, from the interface a user touches to the database
                  storing their data. That breadth lets me move fast, make better architectural decisions, and own
                  features end to end without waiting on anyone. It&apos;s made me a much more complete engineer.
                </P>
              </div>
            </Pop>
            <Pop delay={0.08}>
              <div className="sb-card p-7 sm:p-9 flex flex-col gap-6 h-full md:mt-10" style={vars({ "--sh": ACCENT.peri })}>
                <P>
                  Today I specialise in building <Mark color={ACCENT.peri}>performant, accessible, and visually sharp</Mark>{" "}
                  web products. I care deeply about the details: transitions that feel right, interfaces that are
                  intuitive without needing instructions, APIs that are predictable and fast. I believe the best
                  engineering is invisible; users shouldn&apos;t think about the technology, they should just enjoy
                  the experience.
                </P>
                <P>
                  I&apos;ve worked with early-stage startups and growing products across{" "}
                  <Mark color={ACCENT.tomato}>Nigeria, the UK, and the US</Mark>. Each environment taught me something
                  different: shipping fast under pressure, writing code that scales, collaborating across time zones,
                  and communicating technical decisions to non-technical stakeholders. I thrive in environments where
                  the bar is high and the work actually matters.
                </P>
                <P>
                  Outside of work I&apos;m into <Mark color={ACCENT.gum}>video creation, editing, and anime</Mark>, all
                  things that have quietly shaped how I think about pacing, composition, and visual hierarchy in
                  interfaces. That creative eye carries directly into the products I build and the decisions I make
                  as an engineer.
                </P>
              </div>
            </Pop>
          </div>
        </Section>
      </Container>

    </>
  );
}

export default Skills;
