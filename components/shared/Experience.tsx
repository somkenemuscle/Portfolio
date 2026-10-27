"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/constants/experience";
import { Container, Pop, Section, SectionHeading, cycleAccent, deep, vars } from "./Sketch";

function Experience() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Container>
      <Section id="experience">
        <SectionHeading
          label="THE ROAD SO FAR" title="Where I've worked" accent="peri"
          aside={<p className="m-0 font-hand text-[26px] text-sb-mint-deep -rotate-2">tap one for the story</p>}
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
                    className="group relative w-full text-left pl-6 pr-14 sm:px-7 py-5 flex flex-wrap items-center gap-x-5 gap-y-3"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 border-sb-ink shrink-0 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.4] ${current ? "sb-pulse" : ""}`}
                      style={{ background: color }}
                    />
                    <span className="flex-1 min-w-[200px] flex flex-col gap-0.5">
                      <span className="flex flex-wrap items-center gap-2.5 text-[22px] font-extrabold">
                        {company}
                        <img src={exp.location} alt="" loading="lazy" decoding="async" className="w-5 h-3.5 object-cover rounded-[3px] border border-sb-ink/60" />
                      </span>
                      <span className="flex flex-wrap items-center gap-2 text-[15px] text-sb-soft">
                        {exp.role}
                        {exp.badge && (
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] leading-none px-1.5 py-1 rounded-md border-[1.5px] border-sb-ink bg-sb-cream text-sb-ink -rotate-2">
                            {exp.badge}
                          </span>
                        )}
                      </span>
                    </span>
                    {/* right side: the headline result, dates and the toggle */}
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-5 basis-full sm:basis-auto pl-[34px] sm:pl-0">
                      {exp.win && (
                        <span className="sb-sticker !text-[14px] !px-3 !py-1 !border-[2.5px] whitespace-nowrap"
                          style={{ ...vars({ "--r": `${i % 2 ? 2 : -2}deg` }), background: color }}>
                          {exp.win}
                        </span>
                      )}
                      <span className="font-mono text-[13px] uppercase whitespace-nowrap" style={{ color: current ? deep(color) : "#6F6255" }}>
                        {exp.duration.replace(" - ", " → ")}
                      </span>
                      <span aria-hidden="true" className="absolute top-6 right-6 sm:static inline-block transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-125">
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          className="block text-2xl font-bold leading-none"
                          style={{ color: deep(color) }}
                        >
                          +
                        </motion.span>
                      </span>
                    </span>
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
                        <div className="px-6 sm:px-7 pb-6 pt-5 sm:pl-[61px] flex flex-col gap-4 border-t-2 border-dashed border-sb-raised">
                          <p className="m-0 font-hand text-[22px] leading-snug" style={{ color: deep(color) }}>{exp.summary}</p>
                          {/* what I did, one thing per line */}
                          <ul className="m-0 p-0 list-none flex flex-col gap-2.5 max-w-[780px]">
                            {exp.points.map((pt, pi) => (
                              <motion.li
                                key={pt}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.08 + pi * 0.06 }}
                                className="flex gap-3 text-base leading-relaxed text-sb-soft"
                              >
                                <span aria-hidden="true" className="mt-[9px] w-2.5 h-2.5 shrink-0 rounded-full border-2 border-sb-ink" style={{ background: color }} />
                                {pt}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((t) => (
                              <span key={t} className="font-mono text-xs px-2.5 py-1 border-2 rounded-lg" style={{ borderColor: color, color: deep(color) }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          {exp.link && (
                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] self-start hover:text-sb-tomato-deep">
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
