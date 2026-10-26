// The "Now" board on the homepage. Edit by hand whenever things change,
// and bump `updatedAt` so the stamp stays honest.

export type NowAccent = "mint" | "peri" | "sun" | "gum" | "tomato"

export interface NowItem {
  label: string // sticker text, e.g. "Building"
  title: string
  note?: string
  accent: NowAccent
  progress?: number // 0–100, renders a progress bar
  music?: boolean // renders the little equaliser bars
}

export const nowUpdatedAt = "2026-10-26"

export const now: NowItem[] = [
  {
    label: "Building",
    title: "A business-per-workspace SaaS",
    note: "Shared schema, a tenant_id on every row and a Prisma extension that keeps each workspace's data to itself.",
    accent: "mint",
    progress: 40,
  },
  {
    label: "Learning",
    title: "[WHAT YOU'RE LEARNING]",
    note: "[One line on why, or what you've picked up so far.]",
    accent: "peri",
  },
  {
    label: "Reading",
    title: "[BOOK TITLE]",
    note: "by [AUTHOR]",
    accent: "sun",
  },
  {
    label: "On repeat",
    title: "[SONG / ALBUM]",
    accent: "gum",
    music: true,
  },
]
