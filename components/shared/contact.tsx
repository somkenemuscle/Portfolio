'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const socials = [
  { label: 'GitHub',    href: 'https://github.com/somkenemuscle'                  },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/somkene-ojukwu/'       },
  { label: 'Twitter',   href: 'https://x.com/somkeneOj'                           },
  { label: 'Instagram', href: 'https://www.instagram.com/codes.by.oj/'            },
]

function Contact() {
  return (
    <footer id="contact">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Main CTA area */}
        <div className="py-16 md:py-20">

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] font-medium tracking-[0.22em] uppercase mb-5"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Get in touch
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <h2
              className="font-bold tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#ffffff' }}
            >
              Have something in mind?{' '}
              <span style={{ color: 'rgba(255,255,255,0.32)' }}>Let&apos;s talk</span>
            </h2>

            <Link
              href="mailto:somkeneoj@gmail.com"
              className="group inline-flex items-center gap-3"
            >
              <span
                className="font-medium transition-colors duration-300 group-hover:text-white"
                style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.42)' }}
              >
                somkeneoj@gmail.com
              </span>
              <motion.div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.3)',
                }}
                whileHover={{
                  scale: 1.1,
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </motion.div>
            </Link>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-7">

            {/* Name */}
            <Link
              href="/"
              className="text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')}
            >
              Somkene Ojukwu
            </Link>

            {/* Socials */}
            <div className="flex items-center gap-6">
              {socials.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.25)')}
                >
                  {label}
                </Link>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </footer>
  )
}

export default Contact
