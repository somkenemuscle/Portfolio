'use client'

import { motion } from 'framer-motion'
import { GraduationCap, BadgeCheck } from 'lucide-react'
import { certificates, education } from '@/constants/credentials'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Credentials() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Divider */}
        <div className="h-px mb-16" style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Certificates */}
          <motion.div {...enter(0.05)}>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-8"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              Certificates
            </p>
            <div className="flex flex-col gap-4">
              {certificates.map((cert, i) => (
                <motion.div
                  key={i}
                  {...enter(0.1 + i * 0.08)}
                  className="flex items-start gap-4 rounded-2xl p-5"
                  style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', minHeight: 96 }}
                >
                  <div className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <BadgeCheck size={16} strokeWidth={1.6} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>
                      {cert.title}
                    </h3>
                    <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {cert.issuer}
                      {cert.location && (
                        <span style={{ color: 'rgba(255,255,255,0.22)' }}> · {cert.location}</span>
                      )}
                    </p>
                    <p className="text-[11px] font-medium tracking-[0.1em]"
                      style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {cert.year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div {...enter(0.1)}>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-8"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              Education
            </p>
            <div className="flex flex-col gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  {...enter(0.15 + i * 0.08)}
                  className="flex items-start gap-4 rounded-2xl p-5"
                  style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', minHeight: 96 }}
                >
                  <div className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <GraduationCap size={16} strokeWidth={1.6} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>
                      {edu.degree}
                      {edu.short && (
                        <span className="ml-2 text-[11px] font-medium px-2 py-0.5 rounded-full align-middle"
                          style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.09)' }}>
                          {edu.short}
                        </span>
                      )}
                    </h3>
                    <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {edu.institution}
                    </p>
                    <p className="text-[11px] font-medium tracking-[0.1em]"
                      style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {edu.year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
