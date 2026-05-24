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
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            Things I&apos;ve built.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              {...enter(0.1 + index * 0.08)}
              className="group sticky"
              style={{ top: `calc(80px + ${index * 16}px)` }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: '#0c0c0c',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLDivElement).style.border =
                    '1px solid rgba(255,255,255,0.13)')
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLDivElement).style.border =
                    '1px solid rgba(255,255,255,0.07)')
                }
              >
                {/* Card top bar */}
                <div
                  className="flex items-center justify-between px-6 py-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span
                    className="text-[11px] font-medium tracking-[0.16em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {String(index + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{project.niche}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={project.livePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.25)')
                      }
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                    </Link>
                    <Link
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.25)')
                      }
                    >
                      <GitHubLogoIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Card body */}
                <div className="grid grid-cols-12">

                  {/* Image */}
                  <div className="col-span-12 md:col-span-5 lg:col-span-5">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-[260px] md:h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="col-span-12 md:col-span-7 lg:col-span-7 p-7 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-semibold mb-3 text-[#f5f5f7]"
                        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)' }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-[14px] leading-[1.7] mb-6"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        {project.description}
                      </p>

                      {/* Tech pills */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                            style={{
                              color: 'rgba(255,255,255,0.45)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              background: 'rgba(255,255,255,0.03)',
                            }}
                          >
                            <img src={tech.icon} alt={tech.name} className="w-3 h-3" />
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-5">
                      <Link
                        href={project.livePreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-medium transition-colors duration-150 text-pink-200/70"
                        onMouseEnter={e =>
                          ((e.currentTarget as HTMLAnchorElement).style.color = '#fbcfe8')
                        }
                        onMouseLeave={e =>
                          ((e.currentTarget as HTMLAnchorElement).style.color = '')
                        }
                      >
                        Live Preview →
                      </Link>
                      <Link
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-medium transition-colors duration-150"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                        onMouseEnter={e =>
                          ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)')
                        }
                        onMouseLeave={e =>
                          ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)')
                        }
                      >
                        Source Code
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
