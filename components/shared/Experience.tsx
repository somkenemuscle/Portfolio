"use client";

import { experiences } from "@/constants/experience";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowTopRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

function Experience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const stopDrag = () => setIsDragging(false);

  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setProgress(scrollLeft / (scrollWidth - clientWidth));
  };

  return (
    <section className="py-24 md:py-32 overflow-hidden">

      {/* Header */}
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-pink-200/50">
              Experience
            </p>
            <h2
              className="font-bold leading-tight tracking-tight text-[#f5f5f7]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Where I&apos;ve worked.
            </h2>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block text-[11px] tracking-[0.14em] uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            drag to explore →
          </motion.span>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 select-none"
        style={{
          scrollSnapType: "x mandatory",
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onScroll={onScroll}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ scrollSnapAlign: "start", flexShrink: 0, width: "min(500px, 82vw)" }}
          >
            <div
              className="rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-300 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                minHeight: "320px",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.13)")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)")
              }
            >
              {/* Role + company */}
              <div className="flex items-start gap-2 flex-wrap mb-1 relative z-10">
                <h3
                  className="font-semibold text-[#f5f5f7] leading-snug"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
                >
                  {exp.role}
                </h3>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <Link
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[14px] font-medium transition-colors duration-150 text-pink-200/50"
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#fbcfe8")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "")}
                >
                  {exp.company.replace("@", "").trim()}
                  <ArrowTopRightIcon className="w-3 h-3" />
                </Link>
                <img src={exp.location} alt="flag" className="w-4 h-auto rounded-sm mt-0.5" />
              </div>

              {/* Date */}
              <p
                className="flex items-center gap-1.5 text-[12px] font-medium mb-5 relative z-10"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                <CalendarIcon className="w-3 h-3" />
                {exp.duration}
              </p>

              {/* Divider */}
              <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Description */}
              <p
                className="text-[13.5px] leading-[1.85] mb-6 relative z-10 flex-1"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                {exp.description1}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 relative z-10">
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

      {/* Progress bar */}
      <div className="mt-4">
        <div
          className="h-[1px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${Math.max(progress * 100, 6)}%`,
              background: "rgba(251,207,232,0.5)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>
            {String(1).padStart(2, "0")}
          </span>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>
            {String(experiences.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      </div>

    </section>
  );
}

export default Experience;
