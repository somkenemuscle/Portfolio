"use client";

import { useState } from "react";
import { experiences } from "@/constants/experience";
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

        <div>
          {/* Top border */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

          {experiences.map((exp, i) => {
            const isOpen = openIndex === i
            const company = exp.company.replace('@', '').trim()

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Row header — clickable */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left py-6 flex items-center gap-6 group"
                >
                  {/* Index */}
                  <span
                    className="text-[11px] font-medium tabular-nums shrink-0 hidden sm:block"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Role + company */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <div className="flex items-center gap-2.5">
                      <h3
                        className="font-semibold transition-colors duration-150"
                        style={{
                          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                          color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.75)',
                        }}
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
                      <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>·</span>
                      <Link
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-[13px] font-medium transition-colors duration-150"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)')}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')}
                      >
                        {company}
                      </Link>
                      <img src={exp.location} alt="flag" className="w-4 h-auto rounded-sm opacity-70" />
                    </div>
                  </div>

                  {/* Duration + toggle icon */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className="text-[12px] hidden md:block"
                      style={{ color: 'rgba(255,255,255,0.28)' }}
                    >
                      {exp.duration}
                    </span>
                    <div
                      className="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200"
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

                {/* Expandable content */}
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
                      <div className="pb-6 pl-0 sm:pl-12 flex flex-col gap-4">
                        {/* Duration on mobile */}
                        <p className="text-[12px] md:hidden" style={{ color: 'rgba(255,255,255,0.28)' }}>
                          {exp.duration}
                        </p>
                        <p
                          className="text-[14px] leading-[1.85] max-w-2xl"
                          style={{ color: 'rgba(255,255,255,0.45)' }}
                        >
                          {exp.description1}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, j) => (
                            <span
                              key={j}
                              className="text-[12px] px-3 py-1 rounded-full"
                              style={{
                                color: 'rgba(255,255,255,0.38)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Experience;
