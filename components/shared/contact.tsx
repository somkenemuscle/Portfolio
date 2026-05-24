'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { contactlinks } from "@/constants/contactLinks";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">

        {/* Section header */}
        <motion.div {...enter(0.05)} className="mb-16">
          <p
            className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Contact
          </p>
          <h2
            className="font-bold leading-tight tracking-tight text-[#f5f5f7]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Let&apos;s work together.
          </h2>
        </motion.div>

        {/* Contact card */}
        <motion.div {...enter(0.15)}>
          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 transition-all duration-300"
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
            {/* Email */}
            <div>
              <p
                className="text-[11px] font-medium tracking-[0.16em] uppercase mb-3"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Reach out
              </p>
              <Link
                href="mailto:somkeneoj@gmail.com"
                className="text-[18px] md:text-[22px] font-semibold tracking-tight transition-colors duration-150"
                style={{ color: "rgba(255,255,255,0.75)" }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)")
                }
              >
                somkeneoj@gmail.com
              </Link>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {contactlinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.title}
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(255,255,255,0.18)"
                    ;(e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(255,255,255,0.08)"
                    ;(e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)"
                  }}
                >
                  <img src={link.icon} alt={link.title} className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          {...enter(0.25)}
          className="mt-10 text-[12px] text-center"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Designed &amp; built by Somkene Ojukwu
        </motion.p>

      </div>
    </section>
  )
}

export default Contact
