'use client'
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
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

const EMAIL = "somkeneoj@gmail.com";

// Clicking the address copies it (a mailto link is a dead end for anyone on
// webmail); a "copied!" sticker pops up to say it worked.
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={copy} aria-label={`Copy ${EMAIL}`}
        className="group inline-flex items-center gap-2 font-mono text-base sm:text-lg underline decoration-wavy decoration-2 underline-offset-[6px] hover:decoration-sb-tomato-deep">
        {EMAIL}
        <span className="w-[18px] h-[18px] inline-flex no-underline transition-transform group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true">
          {copied ? <Check size={18} strokeWidth={2.6} /> : <Copy size={18} strokeWidth={2.4} />}
        </span>
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            initial={{ opacity: 0, scale: 0.5, y: 6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
            exit={{ opacity: 0, scale: 0.7, y: -6 }}
            transition={{ type: "spring", stiffness: 420, damping: 16 }}
            className="absolute -top-9 -right-6 font-hand text-[22px] leading-none px-2.5 pt-0.5 pb-1 rounded-md bg-sb-mint border-[2.5px] border-sb-ink shadow-[2px_2px_0_#1A1410] whitespace-nowrap"
          >
            copied!
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

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
            <CopyEmail />
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
          Designed &amp; built by Somkene · © {new Date().getFullYear()}
        </p>
      </section>
    </Container>
  )
}

export default Contact
