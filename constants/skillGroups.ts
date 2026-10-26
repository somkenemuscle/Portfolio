// The "What I know" sticker collection on the homepage.
// Move a skill between groups as you get more (or less) comfortable with it.

export interface SkillGroup {
  title: string
  hint: string
  accent: "mint" | "sun" | "peri"
  learning?: boolean // dashed "still peeling" style
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Daily drivers",
    hint: "use it every day",
    accent: "mint",
    skills: ["TypeScript", "JavaScript", "NestJS", "Node.js", "PostgreSQL", "React", "Next.js"],
  },
  {
    title: "Comfortable",
    hint: "reach for it often",
    accent: "sun",
    skills: ["Redis", "BullMQ", "Docker", "AWS", "Express", "MongoDB", "Tailwind", "Jest", "Postman"],
  },
  {
    title: "Still peeling",
    hint: "learning now",
    accent: "peri",
    learning: true,
    skills: ["Golang", "[SKILL]"],
  },
]
