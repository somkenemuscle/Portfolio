"use client";

import { useState } from "react";
import { experiences } from "@/constants/experience";
import { techIcons } from "@/constants/techIcons";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

function Experience() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i)

  return (
    <section id="experience" className="pb-24 md:pb-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-medium tracking-[0.18em] uppercase mb-10"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Experience
        </motion.p>

        <div className="flex flex-col gap-14 md:gap-16">
          {experiences.map((exp, i) => {
            const company = exp.company.replace('@', '').trim()
            const isOpen = openIndex === i

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row md:gap-10"
              >
                {/* Duration column */}
                <div className="mb-3 md:mb-0 md:w-40 shrink-0">
                  <span
                    className="text-[12px] font-medium tabular-nums"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    {exp.duration}
                  </span>
                </div>

                {/* Content column */}
                <div className="flex-1 max-w-2xl">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                          <h3
                            className="font-semibold tracking-tight"
                            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: '#ffffff' }}
                          >
                            {exp.role}
                          </h3>
                          {exp.badge && (
                            <span
                              className="text-[10px] font-semibold tracking-[0.12em] uppercase"
                              style={{
                                color: 'rgba(255,255,255,0.25)',
                                borderLeft: '2px solid rgba(255,255,255,0.15)',
                                paddingLeft: 6,
                              }}
                            >
                              {exp.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-[14px] font-medium transition-colors duration-150"
                            style={{ color: 'rgba(255,255,255,0.4)' }}
                            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')}
                            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)')}
                          >
                            {company}
                          </Link>
                          <img src={exp.location} alt="flag" className="w-4 h-auto rounded-sm opacity-70" />
                        </div>
                      </div>

                      <div
                        className="w-7 h-7 flex items-center justify-center rounded-full shrink-0 mt-0.5 transition-all duration-200"
                        style={{
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: isOpen ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)',
                        }}
                      >
                        {isOpen
                          ? <Minus size={12} strokeWidth={2} />
                          : <Plus size={12} strokeWidth={2} />
                        }
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          className="text-[14px] leading-[1.85] mt-4 mb-4"
                          style={{ color: 'rgba(255,255,255,0.8)' }}
                        >
                          {exp.description1}
                        </p>

                        <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                          {exp.technologies.map((tech, j) => {
                            const icon = techIcons[tech]
                            return (
                              <span
                                key={j}
                                className="inline-flex items-center gap-1.5 text-[12px] font-medium"
                                style={{ color: 'rgba(255,255,255,0.4)' }}
                              >
                                {icon && (
                                  <img
                                    src={icon}
                                    alt=""
                                    className="w-3.5 h-3.5 opacity-70"
                                    style={(tech === 'Express' || tech === 'Socket.io') ? { filter: 'invert(1)' } : undefined}
                                  />
                                )}
                                {tech}
                              </span>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Experience;
