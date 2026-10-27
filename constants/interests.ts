// "Outside the editor": the things on my desk. Each id matches a drawing in
// components/shared/Interests.tsx; hovering (or tapping) it shows the bubble.
// Text in [BRACKETS] is a placeholder and stays hidden until filled in.

export type DeskObject = "laptop" | "headphones" | "parfait" | "camera" | "sketchbook" | "notepad" | "food" | "screen" | "controller"

export interface DeskItem {
  id: DeskObject
  label: string
  note: string
  now?: string // "now: …" line, e.g. what I'm watching
  links?: { label: string; href: string; icon: "tiktok" | "instagram" | "journal" }[]
}

export const desk: DeskItem[] = [
  {
    id: "laptop",
    label: "The editor",
    note: "Closed for now. This bit is about everything else.",
  },
  {
    id: "headphones",
    label: "Music & making beats",
    note: "Where it all started, before I wrote a line of code.",
    now: "Goyard by Mavo",
  },
  {
    id: "parfait",
    label: "Parfait",
    note: "Non-negotiable. Yogurt, granola, fruit, repeat.",
  },
  {
    id: "camera",
    label: "Coding videos",
    note: "Short videos about code and building things. I shoot and edit them myself.",
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@codes.by.oj", icon: "tiktok" },
      { label: "Instagram", href: "https://www.instagram.com/codes.by.oj/", icon: "instagram" },
    ],
  },
  {
    id: "sketchbook",
    label: "Drawing",
    note: "The sketchbook came before the code editor.",
  },
  {
    id: "notepad",
    label: "Writing",
    note: "Thinking out loud about the things I build.",
    links: [{ label: "Read the journal", href: "/journal", icon: "journal" }],
  },
  {
    id: "food",
    label: "Jollof rice & chicken",
    note: "My favourite thing to eat, and to cook.",
  },
  {
    id: "screen",
    label: "Anime",
    note: "Quietly taught me pacing and composition.",
    now: "Black Clover",
  },
  {
    id: "controller",
    label: "Gaming",
    note: "PS5, once the commits are in.",
    now: "Fortnite",
  },
]
