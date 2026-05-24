"use client";

import { experiences } from "@/constants/experience";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowTopRightIcon, CalendarIcon } from "@radix-ui/react-icons";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

function Experience() {
  return (
    <section className="py-24 md:py-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Section header */}
        <motion.div {...enter(0.05)} className="mb-16">
          <p
            className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Experience
          </p>
          <h2
            className="font-bold leading-tight tracking-tight text-[#f5f5f7]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Where I&apos;ve worked.
          </h2>
        </motion.div>

        {/* Experience list */}
        <div className="flex flex-col gap-4">
          {experiences.map((exp, index) => (
            <motion.div key={index} {...enter(0.12 + index * 0.1)}>
              <div
                className="rounded-2xl p-7 md:p-8 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLDivElement).style.border =
                    "1px solid rgba(255,255,255,0.13)")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLDivElement).style.border =
                    "1px solid rgba(255,255,255,0.07)")
                }
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className="font-semibold text-[#f5f5f7]"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
                    >
                      {exp.role}
                    </h3>
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[14px] font-medium transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)")
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")
                      }
                    >
                      {exp.company.replace("@", "")}
                      <ArrowTopRightIcon className="w-3 h-3" />
                    </Link>
                    <img
                      src={exp.location}
                      alt="location flag"
                      className="w-4 h-auto rounded-sm"
                    />
                  </div>

                  <span
                    className="hidden md:flex items-center gap-1.5 text-[12px] font-medium shrink-0"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    {exp.duration}
                  </span>
                </div>

                {/* Date — mobile */}
                <p
                  className="md:hidden flex items-center gap-1.5 text-[12px] font-medium mb-4"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  <CalendarIcon className="w-3 h-3" />
                  {exp.duration}
                </p>

                {/* Divider */}
                <div
                  className="my-5 h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />

                {/* Description */}
                <p
                  className="text-[14px] leading-[1.8] mb-6"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {exp.description1}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Experience;
