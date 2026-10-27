// One place for the site's SEO facts: the live address, the default
// description and the profiles that prove who I am to search engines.

export const SITE_URL = "https://www.somkene.com"
export const SITE_NAME = "Somkene Ojukwu"

export const SITE_TITLE = "Somkene Ojukwu | Software Engineer in Lagos, Nigeria"
export const SITE_DESCRIPTION =
  "Somkene Ojukwu is a software engineer in Lagos, Nigeria who builds products end to end, from the backend systems that run them to the frontends people use."

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/somkene-ojukwu/",
  github: "https://github.com/somkenemuscle",
  x: "https://x.com/somkeneOj",
  instagram: "https://www.instagram.com/codes.by.oj/",
  tiktok: "https://www.tiktok.com/@codes.by.oj",
}
export const X_HANDLE = "@somkeneOj"

// The share card drawn by app/opengraph-image.tsx.
export const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Somkene Ojukwu, software engineer building products from Lagos, Nigeria" }

// Full metadata for one page. Next replaces (rather than merges) a page's
// openGraph and twitter blocks, so each page spells them out in full.
export function pageMeta({ title, description, path }: { title?: string; description?: string; path: string }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE
  const desc = description ?? SITE_DESCRIPTION
  return {
    ...(title && { title }),
    description: desc,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, siteName: SITE_NAME, locale: "en_US", url: path, title: fullTitle, description: desc, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image" as const, creator: X_HANDLE, title: fullTitle, description: desc, images: [SHARE_IMAGE.url] },
  }
}
