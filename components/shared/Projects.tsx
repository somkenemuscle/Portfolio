"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectData } from "@/constants/projectData";
import { GitHubLogoIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

export const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Section header */}
        <motion.div {...enter(0.05)} className="mb-16">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-pink-200/50">
            Selected Work
          </p>
          <h2
            className="font-bold leading-tight tracking-tight text-[#f5f5f7]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Things I&apos;ve built.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {projectData.map((project, index) => (
            <motion.div key={index} {...enter(0.1 + index * 0.08)} className="group">
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300 grid grid-cols-1 md:grid-cols-2"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.13)")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)")}
              >
                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-between order-2 md:order-1">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-pink-200/50">
                        {String(index + 1).padStart(2, "0")}&nbsp;&nbsp;/&nbsp;&nbsp;{project.niche}
                      </span>
                      <div className="flex items-center gap-3">
                        <Link href={project.livePreview} target="_blank" rel="noopener noreferrer"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)")}
                          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)")}
                        >
                          <ExternalLinkIcon className="w-4 h-4" />
                        </Link>
                        <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)")}
                          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)")}
                        >
                          <GitHubLogoIcon className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <h3 className="text-[1.6rem] md:text-[2rem] font-bold tracking-tight text-[#f5f5f7] mb-3">
                      {project.title}
                    </h3>
                    <p className="text-[14px] leading-[1.75] mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{ color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
                        >
                          <img src={tech.icon} alt={tech.name} className="w-3 h-3" />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <Link href={project.livePreview} target="_blank" rel="noopener noreferrer"
                      className="text-[13px] font-medium text-pink-200/70 transition-colors duration-150"
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#fbcfe8")}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "")}
                    >
                      Live Preview →
                    </Link>
                    <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer"
                      className="text-[13px] font-medium transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)")}
                    >
                      Source Code
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="overflow-hidden h-64 md:h-auto order-1 md:order-2">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
