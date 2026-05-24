'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { contactlinks } from "@/constants/contactLinks";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

function Contact() {
  return (
    <section id="contact" className="pt-24 md:pt-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Label */}
        <motion.p {...enter(0.05)} className="text-[11px] font-medium tracking-[0.18em] uppercase mb-10 text-pink-200/50">
          Contact
        </motion.p>

        {/* Big heading — lines stagger in */}
        <div className="mb-6 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight text-[#f5f5f7]"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 1.05 }}
          >
            Have something
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 1.05 }}
          >
            in mind?{' '}
            <span className="text-pink-200">Let&apos;s talk.</span>
          </motion.h2>
        </div>

        {/* Sub copy */}
        <motion.p
          {...enter(0.32)}
          className="text-[15px] leading-relaxed mb-12 max-w-[400px]"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          Open to new opportunities, collaborations, and interesting projects. My inbox is always open.
        </motion.p>

        {/* Email CTA */}
        <motion.div {...enter(0.42)}>
          <Link
            href="mailto:somkeneoj@gmail.com"
            className="group inline-flex items-center gap-3 mb-16"
          >
            <span
              className="text-[1.1rem] md:text-[1.35rem] font-semibold tracking-tight transition-colors duration-200 group-hover:text-pink-200"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              somkeneoj@gmail.com
            </span>
            <motion.span
              className="w-8 h-8 rounded-full flex items-center justify-center text-[13px]"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.35)',
              }}
              whileHover={{
                x: 3,
                y: -3,
                borderColor: 'rgba(251,207,232,0.4)',
                color: '#fbcfe8',
                background: 'rgba(251,207,232,0.06)',
              }}
              transition={{ duration: 0.2 }}
            >
              ↗
            </motion.span>
          </Link>
        </motion.div>

        {/* Divider — animates width */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px mb-8 origin-left"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10"
        >
          {/* Left */}
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Somkene Ojukwu
            </span>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              © {new Date().getFullYear()} · Designed &amp; built by me
            </span>
          </div>

          {/* Social icons — stagger in */}
          <div className="flex items-center gap-2.5">
            {contactlinks.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.title}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.border = '1px solid rgba(251,207,232,0.3)'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,207,232,0.05)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.border = '1px solid rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  <img src={link.icon} alt={link.title} className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Contact
