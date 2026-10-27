// The Logbook: talks, hackathons, events I showed up to, and the paperwork.
// Order doesn't matter, entries are sorted by date. The first photo is the
// cover (the polaroid on the About corkboard). Photos live in public/logbook/.

export type LogType = "talk" | "hackathon" | "event" | "open-source" | "award" | "paperwork"

export interface LogLink {
  label: string // what it is, e.g. "The announcement"
  href: string
  kind: "instagram" | "x" | "linkedin" | "github" | "web"
}

export interface LogEntry {
  slug: string // used in the URL: /logbook#slug
  type: LogType
  title: string
  date: string // "2026-09-27", "2026-10" or "2026"
  endDate?: string // for multi-day things
  place?: string
  role?: string // e.g. "Speaker", "Builder"
  blurb: string // one line, shown on the card
  story?: string[] // optional paragraphs for the pop-up
  photos?: { src: string; alt: string }[]
  links?: LogLink[]
  icon?: "grad" // paperwork only: a cap instead of a badge
}

export const logbook: LogEntry[] = [
  {
    slug: "paystack-ai-builder-challenge-2026",
    type: "hackathon",
    title: "Paystack AI Builder Challenge",
    date: "2026-10-10",
    endDate: "2026-10-24",
    place: "Lagos",
    role: "Builder",
    blurb: "Two weeks building and shipping an AI product on Paystack's APIs, alongside real Paystack businesses.",
    story: [
      "Paystack and Google for Developers ran this one as a two-week build rather than a weekend sprint. Builders worked on real problems facing businesses on Paystack (or brought their own idea), with mentorship and office hours along the way, and the businesses tested what we built as we went.",
      "These photos are from the final day.",
    ],
    photos: [
      { src: "/logbook/paystack-thumbs-up.jpg", alt: "Four builders at the Paystack AI Builder Challenge, one giving a thumbs up" },
      { src: "/logbook/paystack-the-four.jpg", alt: "Four builders posing together at the end of the challenge" },
      { src: "/logbook/paystack-the-four-2.jpg", alt: "The same four builders in front of the glass wall at the venue" },
      { src: "/logbook/paystack-duo.jpg", alt: "Two builders at the challenge venue" },
      { src: "/logbook/paystack-duo-wide.jpg", alt: "Two builders at the venue, with cameras and lights set up around them" },
      { src: "/logbook/paystack-duo-lounge.jpg", alt: "Two builders in the lounge at the venue" },
    ],
    links: [
      { label: "About the challenge", href: "https://paystack.com/build-challenge", kind: "web" },
    ],
  },
  {
    slug: "youthversary-2026",
    type: "talk",
    title: "Youthversary 2026",
    date: "2026-09-27",
    place: "NCFEM HQ",
    role: "Speaker",
    blurb: "Shared my journey into tech, and why the best way to start building is to start with a real problem.",
    story: [
      "I was invited to speak at Youthversary 2026 about getting into tech. I walked through my own path, from curiosity to learning, building, working and finally solving real problems.",
      "The main idea: don't start with a tool or a course. Notice a problem, understand it properly, learn only what you need, build it, then improve it and scale it.",
    ],
    photos: [
      { src: "/logbook/youthversary-start-with-a-problem.jpg", alt: "Somkene speaking on stage in front of a slide titled Start with a problem" },
      { src: "/logbook/youthversary-journey-slide.jpg", alt: "Somkene speaking with a slide about his journey into tech behind him" },
      { src: "/logbook/youthversary-on-the-mic.jpg", alt: "Somkene speaking into the mic" },
      { src: "/logbook/youthversary-wave.jpg", alt: "Somkene waving to the audience while speaking" },
      { src: "/logbook/youthversary-front-row.jpg", alt: "Somkene seated in the front row before his talk" },
    ],
    links: [
      { label: "The speaker announcement", href: "https://www.instagram.com/p/DdZPIYoMgB1/", kind: "instagram" },
      { label: "The thank-you post", href: "https://www.instagram.com/p/Dd33ER8jLzE/", kind: "instagram" },
    ],
  },
  {
    slug: "mindera-frontend-certificate",
    type: "paperwork",
    title: "Frontend Web Developer Certificate",
    date: "2023",
    place: "Mindera Code Academy, UK",
    blurb: "Completed Mindera Code Academy's frontend web development programme.",
  },
  {
    slug: "aptech-adse",
    type: "paperwork",
    title: "Diploma in Software Engineering (ADSE)",
    date: "2023",
    place: "Aptech",
    blurb: "Aptech's Advanced Diploma in Software Engineering.",
    icon: "grad",
  },
]
