"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projectData } from "@/constants/projectData";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

function ProjectCard({ project, index }: { project: typeof projectData[0]; index: number }) {
  return (
    <motion.div {...enter(0.1 + index * 0.1)}>
      <motion.div
        className="rounded-2xl overflow-hidden relative"
        style={{ background: '#1a1a1a', borderLeft: '2px solid transparent' }}
        whileHover={{
          y: -3,
          borderLeftColor: 'rgba(255,255,255,0.15)',
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
      >
        <div className="p-6 flex flex-col gap-5">

          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.22)' }}>
              {project.niche}
            </p>
            <div className="flex items-center gap-4">
              <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer"
                className="text-[13px] font-medium transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.28)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.28)')}>
                Github ↗
              </Link>
              <Link href={project.livePreview} target="_blank" rel="noopener noreferrer"
                className="text-[13px] font-medium transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.28)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.28)')}>
                Live ↗
              </Link>
            </div>
          </div>

          <h3 className="font-bold tracking-tight leading-snug"
            style={{ fontSize: '1.25rem', color: '#ffffff' }}>
            {project.title}
          </h3>

          <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.42)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-[12px] px-3 py-1 rounded-full"
                style={{ color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.09)' }}>
                {tech.name}
              </span>
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

export const Projects = () => {
  const left  = projectData.filter((_, i) => i % 2 === 0)
  const right = projectData.filter((_, i) => i % 2 === 1)

  return (
    <section id="projects" className="pb-24 md:pb-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="text-[11px] font-medium tracking-[0.18em] uppercase mb-10"
          style={{ color: 'rgba(255,255,255,0.25)' }}>
          Selected Work
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {left.map((project, i) => <ProjectCard key={project.title} project={project} index={i * 2} />)}
          </div>
          <div className="flex flex-col gap-4 md:mt-16">
            {right.map((project, i) => <ProjectCard key={project.title} project={project} index={i * 2 + 1} />)}
          </div>
        </div>

      </div>
    </section>
  )
}
