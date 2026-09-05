"use client";

import { experiences } from "@/constants/experience";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function Experience() {
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

        <div className="flex flex-col gap-8 md:gap-9">
          {experiences.map((exp, i) => {
            const company = exp.company.replace('@', '').trim()

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <h3
                      className="font-semibold tracking-tight"
                      style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: '#ffffff' }}
                    >
                      {exp.role},
                    </h3>
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 font-semibold tracking-tight underline decoration-1 underline-offset-4 transition-colors duration-150"
                      style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'rgba(255,255,255,0.5)', textDecorationColor: 'rgba(255,255,255,0.25)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)')}
                    >
                      <ArrowUpRight size={14} strokeWidth={2.25} style={{ opacity: 0.6 }} />
                      {company}
                    </Link>
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
                    <img src={exp.location} alt="flag" className="w-4 h-auto rounded-sm opacity-70" />
                  </div>

                  <span
                    className="hidden md:block flex-1 min-w-[24px]"
                    style={{ borderBottom: '1px dotted rgba(255,255,255,0.15)', transform: 'translateY(-4px)' }}
                  />

                  <span
                    className="text-[13px] font-medium tabular-nums shrink-0"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    {exp.duration}
                  </span>
                </div>

                <p
                  className="text-[14px] mt-1.5"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {exp.summary}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Experience;
