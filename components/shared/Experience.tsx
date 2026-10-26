"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/constants/experience";
import { Container, Pop, Section, SectionHeading, cycleAccent, vars } from "./Sketch";

function Experience() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Container>
      <Section id="experience">
        <SectionHeading
          label="THE ROAD SO FAR" title="Where I've worked" accent="peri"
          aside={<p className="m-0 font-hand text-[26px] text-sb-mint -rotate-2">tap one for the story</p>}
        />
        <div className="flex flex-col gap-4">
          {experiences.map((exp, i) => {
            const company = exp.company.replace("@", "").trim();
            const color = cycleAccent(i + 2);
            const current = /present/i.test(exp.duration);
            const isOpen = open === i;

            return (
              <Pop key={company} delay={i * 0.05}>
                <div className="sb-card" style={vars({ "--sh": color })}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 sm:px-7 py-5 flex flex-wrap items-center gap-x-6 gap-y-2"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 border-sb-cream shrink-0 ${current ? "sb-pulse" : ""}`}
                      style={{ background: color }}
                    />
                    <span className="flex-[1_1_240px] flex flex-col gap-0.5 min-w-0">
                      <span className="flex items-center gap-2.5 text-[22px] font-extrabold">
                        {company}
                        <img src={exp.location} alt="" className="w-5 h-3.5 object-cover rounded-[3px] border border-sb-cream/60" />
                      </span>
                      <span className="text-[15px] text-sb-muted">{exp.summary}</span>
                    </span>
                    <span className="flex-[1_1_200px] text-sb-soft">{exp.role}</span>
                    <span className="font-mono text-[13px] uppercase" style={{ color: current ? color : "#B8AC9B" }}>
                      {exp.duration.replace(" - ", " → ")}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="ml-auto text-2xl font-bold leading-none"
                      style={{ color }}
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-7 pb-6 flex flex-col gap-4 border-t-2 border-dashed border-sb-raised pt-5">
                          <p className="m-0 text-base leading-relaxed text-sb-soft max-w-[820px]">{exp.description1}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((t) => (
                              <span key={t} className="font-mono text-xs px-2.5 py-1 border-2 rounded-lg" style={{ borderColor: color, color }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          {exp.link && (
                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] self-start hover:text-sb-sun">
                              visit {company} ↗
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Pop>
            );
          })}
        </div>
      </Section>
    </Container>
  );
}

export default Experience;
