// The "What I know" sticker collection on the About page, grouped by what
// each tool is for. Hovering (or tapping) a sticker shows which projects in
// projectData.ts used it, so nothing to maintain here for that.
// Names in [BRACKETS] are placeholders and stay hidden until filled in.

export interface SkillGroup {
  title: string
  note: string // handwritten line under the title
  accent: "mint" | "sun" | "peri"
  wide?: boolean // takes the full row
  skills: string[]
  learning?: string[] // dashed stickers: picking these up right now
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    note: "where I spend most days",
    accent: "mint",
    wide: true,
    skills: [
      "NestJS", "Node.js", "Express", "REST APIs", "GraphQL",
      "PostgreSQL", "MySQL", "MongoDB", "Redis", "BullMQ",
      "Microservices", "Modular monoliths", "Event-driven", "System design",
    ],
    learning: ["Golang", "[SKILL]"],
  },
  {
    title: "Frontend",
    note: "the bit you get to touch",
    accent: "sun",
    skills: [
      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind",
      "React Query", "Zustand", "Framer Motion",
      "Responsive design", "Accessibility", "SEO", "Micro-frontends",
    ],
  },
  {
    title: "Shipping",
    note: "getting it out the door",
    accent: "peri",
    skills: ["Docker", "AWS", "GitHub Actions", "Playwright", "Jest", "Postman", "Excalidraw", "Claude Code", "Codex", "Cloud"],
    learning: ["DevOps"],
  },
]

// Tools used on every project, even if a project's tech list doesn't say so.
export const usedEverywhere = ["GitHub Actions", "Excalidraw", "Claude Code", "Codex"]
