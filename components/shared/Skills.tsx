"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { ACCENT, Container, INK, Section, SectionHeading, cycleTilt, vars } from "./Sketch";

// "How I got here" as a little comic strip: one drawing and one line per
// panel. Motion classes (art-*) live in globals.css.

const CREAM = ACCENT.cream;
const line = { stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const mono = { fontFamily: "var(--font-mono)", fontWeight: 600 };

// Sketchbook + headphones, with notes floating up.
function Sketchbook() {
  return (
    <>
      <g transform="rotate(-6 74 80)">
        <rect x="28" y="38" width="92" height="74" rx="6" fill={CREAM} {...line} />
        {[48, 62, 76, 90, 104].map(y => <circle key={y} cx="28" cy={y} r="3.5" fill={CREAM} {...line} strokeWidth={2} />)}
        <path className="art-write" d="M46 92 q10 -30 22 -8 t24 -14" {...line} fill="none" pathLength={100} />
        <circle cx="96" cy="56" r="7" fill={ACCENT.sun} {...line} strokeWidth={2.5} />
      </g>
      <path d="M132 100 a28 28 0 0 1 56 0" {...line} strokeWidth={5} fill="none" />
      <rect x="126" y="94" width="14" height="26" rx="6" fill={ACCENT.gum} {...line} />
      <rect x="180" y="94" width="14" height="26" rx="6" fill={ACCENT.gum} {...line} />
      <g className="art-bob-slow">
        <circle cx="150" cy="44" r="6" fill={INK} />
        <path d="M156 44 V22 L170 26" {...line} fill="none" />
      </g>
      <g className="art-bob-slow" style={{ animationDelay: "-2s" }}>
        <circle cx="176" cy="54" r="5" fill={INK} />
        <path d="M181 54 V36" {...line} fill="none" />
      </g>
    </>
  );
}

// A browser window with a first console.log and a blinking cursor.
function FirstCode() {
  return (
    <>
      <rect x="22" y="24" width="156" height="96" rx="8" fill={CREAM} {...line} />
      <path d="M22 44 H178" {...line} />
      <circle cx="36" cy="34" r="3.5" fill={ACCENT.tomato} />
      <circle cx="48" cy="34" r="3.5" fill={ACCENT.sun} />
      <circle cx="60" cy="34" r="3.5" fill={ACCENT.mint} />
      <text x="36" y="74" fontSize="13" fill={INK} style={mono}>console.log(&apos;hi&apos;)</text>
      <rect className="art-blink" x="164" y="63" width="3" height="14" fill={INK} />
      <text x="36" y="102" fontSize="13" fill="#0E7A4F" style={mono}>&gt; hi</text>
      <g className="art-pulse" style={{ transformOrigin: "160px 100px" }}>
        <path d="M150 100 l6 6 l12 -14" {...line} stroke="#0E7A4F" strokeWidth={4} fill="none" />
      </g>
    </>
  );
}

// A globe with pins in Nigeria, the UK and the US.
function Globe() {
  const pins = [
    { x: 74, y: 44, t: "UK", d: "0s" },
    { x: 116, y: 74, t: "NG", d: "-0.8s" },
    { x: 54, y: 82, t: "US", d: "-1.6s" },
  ];
  return (
    <>
      <circle cx="96" cy="78" r="48" fill={ACCENT.peri} {...line} />
      <ellipse cx="96" cy="78" rx="20" ry="48" {...line} strokeWidth={2} fill="none" opacity="0.5" />
      <path d="M48 78 H144" {...line} strokeWidth={2} opacity="0.5" />
      <path d="M70 56 q10 -10 22 -2 q6 12 -6 18 q-14 0 -16 -16 z M104 66 q14 -4 18 8 q-2 16 -12 22 q-10 -10 -6 -30 z" fill={ACCENT.mint} {...line} strokeWidth={2} />
      <path className="art-flow" d="M58 76 Q70 40 76 40 M80 42 Q110 48 116 68" {...line} strokeWidth={2} strokeDasharray="3 6" fill="none" />
      {pins.map(p => (
        <g key={p.t} className="art-bob-slow" style={{ animationDelay: p.d }}>
          <path d={`M${p.x} ${p.y} c-9 -10 -9 -22 0 -22 c9 0 9 12 0 22 z`} fill={ACCENT.tomato} {...line} strokeWidth={2.5} />
          <circle cx={p.x} cy={p.y - 13} r="3" fill={CREAM} />
          <text x={p.x + 9} y={p.y - 18} fontSize="11" fill={INK} style={mono}>{p.t}</text>
        </g>
      ))}
    </>
  );
}

// One server feeding three separate workspaces: multi-tenant SaaS.
function Tenants() {
  const homes = [
    { x: 46, c: ACCENT.gum, d: "0s" },
    { x: 100, c: ACCENT.sun, d: "-0.3s" },
    { x: 154, c: ACCENT.mint, d: "-0.6s" },
  ];
  return (
    <>
      {homes.map(h => (
        <g key={h.x}>
          <path className="art-flow" style={{ animationDelay: h.d }} d={`M${h.x} 62 L100 96`} {...line} strokeWidth={2.5} strokeDasharray="4 7" fill="none" />
          <path d={`M${h.x - 18} 62 V40 L${h.x} 24 L${h.x + 18} 40 V62 Z`} fill={h.c} {...line} />
          <rect x={h.x - 5} y="48" width="10" height="14" rx="2" fill={CREAM} {...line} strokeWidth={2} />
        </g>
      ))}
      <rect x="62" y="96" width="76" height="30" rx="6" fill={ACCENT.peri} {...line} />
      <circle className="art-blink" cx="76" cy="111" r="4" fill={INK} />
      <circle className="art-blink" style={{ animationDelay: "-0.6s" }} cx="90" cy="111" r="4" fill={INK} />
      <path d="M104 111 H126" {...line} strokeWidth={2.5} />
    </>
  );
}

const stripIn = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const panelIn = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
};

const panels = [
  { Art: Sketchbook, color: ACCENT.gum, title: "It started with a sketchbook.", body: "Years of drawing and making beats: turning ideas into things people can feel." },
  { Art: FirstCode, color: ACCENT.sun, title: "Then I wrote my first JavaScript.", body: "Same feeling. Build it, break it, fix it, watch it work. I was hooked." },
  { Art: Globe, color: ACCENT.peri, title: "Shipped across three countries.", body: "Startups in Nigeria, the UK and the US taught me speed, scale and time zones." },
  { Art: Tenants, color: ACCENT.tomato, title: "Now: building products end to end.", body: "Backend systems, APIs and the frontends on top. Still drawing, just in code." },
];

// The longer telling, tucked behind a toggle under the strip.
const longer = [
  "Before code, there was a sketchbook and a pair of headphones. I spent years drawing and making beats, figuring out how to take something that only exists in my head and turn it into something other people can actually see or hear.",
  "The first time I wrote JavaScript, I knew that feeling. You build something, it breaks, you fix it, and then it finally works. Same itch as finishing a drawing or a beat. I got hooked fast, and I've never been happy just knowing that something works. I want to know why it was built that way.",
  "That curiosity is how I ended up learning the whole stack, from the button you tap down to the row in the database. These days I spend most of my time in the backend: APIs, queues and multi-tenant platforms. My favourite compliment is when nobody notices the engineering at all. The page is fast, the API does what you expect, and you just get on with your day.",
  "I've built with startups in Nigeria, the UK and the US. Some of it was shipping under real pressure, some was reworking things so they'd hold up when more people showed up, and a lot of it was explaining technical stuff to people who don't care about the tech, only whether it works. Turns out that last part is a skill too.",
  "Outside work I edit videos and watch a lot of anime. Both quietly taught me about pacing and composition, and I think that shows up in what I build.",
];

// The longer story as a notebook page dropped onto the desk.
function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="story-title">
      {/* tape */}
      <motion.span
        aria-hidden="true"
        className="absolute -top-3.5 left-1/2 z-10 w-28 h-7 -ml-14 bg-sb-sun/85 border border-sb-ink/20"
        initial={{ scaleX: 0, rotate: -4 }}
        animate={{ scaleX: 1, rotate: -4 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 400, damping: 20 }}
      />
      <div
        className="sb-card sb-lined max-h-[82vh] overflow-y-auto overscroll-contain flex flex-col gap-8 py-10 pr-6 sm:pr-10 pl-12 sm:pl-16"
        style={vars({ "--sh": ACCENT.gum })}
      >
        <h3 id="story-title" className="m-0 font-hand text-[34px] leading-[32px] text-sb-gum-deep -rotate-1 origin-left">
          the longer version
        </h3>
        {longer.map((p, i) => (
          <motion.p
            key={p.slice(0, 20)}
            className="m-0 text-[17px] leading-[32px] text-sb-ink"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 260, damping: 24 }}
          >
            {p}
          </motion.p>
        ))}
        <motion.p
          className="m-0 font-hand text-[26px] text-sb-tomato-deep -rotate-1 origin-left"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + longer.length * 0.07 + 0.1 }}
        >
          that&apos;s the whole story (so far)
        </motion.p>
      </div>
    </Modal>
  );
}

function Skills() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  // hand focus back to the button that opened it
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <Container>
      <Section id="story">
        <SectionHeading
          label="MY STORY" title="How I got here" accent="sun"
          aside={<p className="m-0 font-hand text-[26px] text-sb-gum-deep rotate-2">the short version</p>}
        />
        {/* On phones it's a sideways strip: it only scrolls sideways (never up and
            down inside itself), and the cards pop in together as the section
            appears, so ones further along don't rise up mid-swipe. */}
        <motion.div
          variants={stripIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-3 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:mx-0 lg:px-0"
        >
          {panels.map(({ Art, color, title, body }, i) => (
            <motion.div key={title} variants={panelIn} className="snap-start shrink-0 w-[min(78vw,280px)] lg:w-auto">
              <div className="sb-card h-full p-3.5 flex flex-col gap-3.5" style={{ ...vars({ "--sh": color }), rotate: `${cycleTilt(i) * 0.25}deg` }}>
                <div className="relative h-[150px] rounded-xl border-[2.5px] border-sb-ink overflow-hidden" style={{ background: color }}>
                  <span aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(26,20,16,0.14)_1.2px,transparent_1.6px)] [background-size:14px_14px]" />
                  <svg viewBox="0 0 200 140" aria-hidden="true" className="absolute inset-0 w-full h-full">
                    <Art />
                  </svg>
                </div>
                <div className="flex flex-col gap-1.5 px-1 pb-1">
                  <h3 className="m-0 text-[19px] font-extrabold leading-snug">{title}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-sb-soft">{body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <p className="lg:hidden -mt-6 m-0 font-mono text-xs text-sb-muted text-center">swipe for the rest →</p>

        <div className="flex justify-center">
          <motion.button
            ref={trigger}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            className="sb-btn bg-sb-cream"
          >
            Read the longer version
            <motion.span
              variants={{ hover: { rotate: 90, scale: 1.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
              className="text-xl leading-none"
              aria-hidden="true"
            >
              +
            </motion.span>
          </motion.button>
        </div>
        <StoryModal open={open} onClose={close} />
      </Section>
    </Container>
  );
}

export default Skills;
