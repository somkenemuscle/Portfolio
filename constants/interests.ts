// Stickers for the "Things I'm into" board. Order = render order;
// colours cycle automatically. A sticker can carry small icon links.

export interface Interest {
  label: string
  links?: { label: string; href: string; icon: "tiktok" | "instagram" }[]
}

export const interests: Interest[] = [
  {
    label: "Making coding videos",
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@codes.by.oj", icon: "tiktok" },
      { label: "Instagram", href: "https://www.instagram.com/codes.by.oj/", icon: "instagram" },
    ],
  },
  { label: "System design" },
  { label: "Multi-tenant SaaS" },
  { label: "Writing" },
  { label: "Video editing" },
  { label: "Anime" },
  { label: "[FOOD / PLACE]" },
]
