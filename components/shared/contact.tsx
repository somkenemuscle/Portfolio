'use client'
import type { ReactNode } from "react";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { XLogo } from "./BrandIcons";
import { Container, Pop, Spark, ACCENT } from "./Sketch";

const radix = "w-full h-full";
const links: { label: string; href: string; bg: string; icon: ReactNode }[] = [
  { label: "Email", href: "mailto:somkeneoj@gmail.com", bg: "bg-sb-tomato", icon: <EnvelopeClosedIcon className={radix} aria-hidden="true" /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/somkene-ojukwu/", bg: "bg-sb-peri", icon: <LinkedInLogoIcon className={radix} aria-hidden="true" /> },
  { label: "GitHub", href: "https://github.com/somkenemuscle", bg: "bg-sb-cream", icon: <GitHubLogoIcon className={radix} aria-hidden="true" /> },
  { label: "X / Twitter", href: "https://x.com/somkeneOj", bg: "bg-sb-mint", icon: <XLogo /> },
];

function Contact() {
  return (
    <Container>
      <section id="hi" className="scroll-mt-28 pt-28 md:pt-32 pb-12">
        <Pop>
          <div className="sb-card relative overflow-hidden !bg-sb-sun text-sb-ink px-6 sm:px-10 py-16 flex flex-col items-center gap-7 text-center"
            style={{ boxShadow: "8px 8px 0 #1A1410" }}>
            <Spark size={90} fill={ACCENT.gum} className="sb-spin absolute -top-5 -left-5" />
            <Spark size={50} fill={ACCENT.mint} className="sb-spin absolute bottom-6 right-8" style={{ animationDirection: "reverse" }} />
            <p className="m-0 font-hand text-[32px] -rotate-2">got an idea?</p>
            <h2 className="m-0 font-extrabold tracking-[-0.03em] leading-none text-[clamp(44px,6vw,80px)]">
              Let&apos;s build something fun.
            </h2>
            <a href="mailto:somkeneoj@gmail.com" className="font-mono text-base sm:text-lg underline decoration-wavy decoration-2 underline-offset-[6px]">
              somkeneoj@gmail.com
            </a>
            <div className="flex flex-wrap justify-center gap-3.5">
              {links.map(l => (
                <a key={l.label} href={l.href} aria-label={l.label}
                  className={`sb-btn ${l.bg} max-sm:!w-14 max-sm:!h-14 max-sm:!p-0 max-sm:justify-center max-sm:!rounded-full`}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="w-[22px] h-[22px] sm:w-[18px] sm:h-[18px] shrink-0 flex">{l.icon}</span>
                  <span className="max-sm:hidden">{l.label}</span>
                </a>
              ))}
            </div>
          </div>
        </Pop>
        <p className="font-mono text-center mt-10 text-xs text-sb-muted">
          Built by Somkene · © {new Date().getFullYear()} Somkene Ojukwu
        </p>
      </section>
    </Container>
  )
}

export default Contact
