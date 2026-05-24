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
    <section className="py-24 md:py-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Section header */}
        <motion.div {...enter(0.05)} className="mb-16">
          <p
            className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Stack &amp; About
          </p>
          <h2
            className="font-bold leading-tight tracking-tight text-[#f5f5f7]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            I don&apos;t have dark secrets,<br />only bright ones.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-4">

          {/* Stack panel */}
          <motion.div {...enter(0.15)} className="col-span-12 lg:col-span-4">
            <div
              className="rounded-2xl p-6 h-full"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="text-[11px] font-medium tracking-[0.16em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {stackIcons.map((icon, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded-full"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <img src={icon.src} alt={icon.name} className="w-3.5 h-3.5" />
                    {icon.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* About panel */}
          <motion.div {...enter(0.25)} className="col-span-12 lg:col-span-8">
            <div
              className="rounded-2xl p-8 h-full"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="text-[11px] font-medium tracking-[0.16em] uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                About
              </p>
              <div
                className="text-[15px] leading-[1.8] space-y-4"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                <p>
                  My journey into{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>
                    software engineering
                  </span>{" "}
                  began with a passion for artistic creation, honed through
                  drawing and making music. This creative background naturally
                  guided me toward technology, where I could merge artistry
                  with problem-solving through code.
                </p>
                <p>
                  I specialize in both{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>frontend</span>{" "}
                  and{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>backend</span>{" "}
                  development, with extensive experience across the full stack.
                  I thrive on the continuous learning and creativity that
                  coding offers — transforming ideas into impactful digital
                  solutions.{" "}
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    For me, coding is not just a profession, it&apos;s a space
                    to innovate and unleash creativity.
                  </span>
                </p>
                <p>
                  Beyond coding, I enjoy video creation, video editing, and
                  watching anime — both of which shape how I think about{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>
                    visual storytelling
                  </span>{" "}
                  and{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>aesthetics</span>{" "}
                  in UI/UX design.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Skills;
