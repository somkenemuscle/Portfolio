"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projectData } from "@/constants/projectData";

const gradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)',
  'linear-gradient(135deg, #211a2e 0%, #2e1a3a 55%, #47105f 100%)',
  'linear-gradient(135deg, #1a2620 0%, #163e2e 55%, #0f6050 100%)',
  'linear-gradient(135deg, #2e2418 0%, #3e2f16 55%, #60420f 100%)',
]

function ProjectVisual({ project, index }: { project: typeof projectData[0]; index: number }) {
  const [imgError, setImgError] = useState(false)
  const Icon = project.icon
  const showImage = Boolean(project.image) && !imgError

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{ background: gradients[index % gradients.length] }}
    >
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {!showImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={64} strokeWidth={1} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </div>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)' }}
      />
      <p
        className="absolute bottom-5 left-6 text-[11px] font-semibold tracking-[0.18em] uppercase"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        {project.niche}
      </p>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const monogramPalette = [
  'bg-amber-500/20 text-amber-300',
  'bg-sky-500/20 text-sky-300',
  'bg-rose-500/20 text-rose-300',
  'bg-emerald-500/20 text-emerald-300',
  'bg-violet-500/20 text-violet-300',
]

function monogramColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return monogramPalette[hash % monogramPalette.length]
}

function TechPill({ tech }: { tech: typeof projectData[0]['technologies'][0] }) {
  return (
    <span
      className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full text-[12px] font-medium"
      style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.02)' }}
    >
      {tech.icon ? (
        <span
          className={`w-5 h-5 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${tech.style ?? ''}`}
          style={{ background: tech.style ? undefined : 'rgba(255,255,255,0.07)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tech.icon} alt="" className="w-3 h-3 object-contain" />
        </span>
      ) : (
        <span
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${monogramColor(tech.name)}`}
        >
          {tech.name.charAt(0)}
        </span>
      )}
      {tech.name}
    </span>
  )
}

function CtaLink({
  href,
  icon,
  children,
  emphasis = false,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  emphasis?: boolean
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      className="inline-flex items-center gap-2 text-[13px] font-medium"
      style={{
        padding: '9px 16px',
        borderRadius: 10,
        border: `1px solid ${emphasis ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.09)'}`,
        background: emphasis ? 'rgba(255,255,255,0.07)' : 'transparent',
        color: emphasis ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
      }}
      whileHover={{
        borderColor: 'rgba(255,255,255,0.28)',
        background: 'rgba(255,255,255,0.1)',
        color: '#ffffff',
      }}
      transition={{ duration: 0.15 }}
    >
      {icon}
      {children}
    </motion.a>
  )
}

function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: typeof projectData[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="border-t"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <button onClick={onToggle} className="w-full text-left py-7 md:py-8 group">
        <div className="flex items-center gap-4 md:gap-6">
          <span
            className="shrink-0 md:w-10 flex items-center justify-center transition-transform duration-200"
            style={{ transform: isOpen ? 'scale(1)' : 'scale(0.8)' }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full transition-opacity duration-200"
              style={{ background: gradients[index % gradients.length], opacity: isOpen ? 1 : 0.5 }}
            />
          </span>

          {/* mobile-only thumbnail */}
          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 md:hidden">
            <ProjectVisual project={project} index={index} />
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            <h3
              className="font-bold tracking-tight transition-colors duration-200"
              style={{
                fontSize: 'clamp(1.15rem, 2.6vw, 1.75rem)',
                color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.55)',
              }}
            >
              {project.title}
            </h3>

            <span
              className="text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: isOpen ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)' }}
            >
              {project.niche}
            </span>
          </div>

          <span
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: isOpen ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)',
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <ArrowUpRight size={15} strokeWidth={2} />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
              className="pb-9 md:pb-12 md:pl-16 max-w-xl"
            >
              {/* mobile-only visual, larger */}
              <motion.div variants={fadeUp} className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 md:hidden">
                <ProjectVisual project={project} index={index} />
              </motion.div>

              <motion.p variants={fadeUp} className="text-[14px] leading-[1.85] mb-7" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {project.description}
              </motion.p>

              <motion.div variants={fadeUp} className="mb-8">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.22)' }}>
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <TechPill key={i} tech={tech} />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                <CtaLink href={project.livePreview} icon={<ArrowUpRight size={14} strokeWidth={2} />} emphasis>
                  Live Preview
                </CtaLink>
                {project.sourceCode && (
                  <CtaLink href={project.sourceCode} icon={<Github size={14} strokeWidth={2} />}>
                    Source Code
                  </CtaLink>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Projects = () => {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <section id="projects" className="pb-24 md:pb-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-medium tracking-[0.18em] uppercase mb-10"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Some Selected Work
        </motion.p>

        <div className="grid md:grid-cols-[1fr_340px] gap-x-12">
          <div>
            {projectData.map((project, i) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
            <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          </div>

          <div className="hidden md:block sticky top-28 self-start" style={{ height: 420 }}>
            <AnimatePresence mode="wait">
              {openIndex >= 0 ? (
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <ProjectVisual project={projectData[openIndex]} index={openIndex} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full rounded-2xl flex items-center justify-center"
                  style={{ border: '1px dashed rgba(255,255,255,0.08)' }}
                >
                  <p className="text-[12px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    Select a project to preview
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
