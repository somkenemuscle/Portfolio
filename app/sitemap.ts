import type { MetadataRoute } from "next";
import { blogs } from "@/constants/blogs";
import { SITE_URL } from "@/constants/site";

// Every page, plus one entry per journal post, so new posts get found
// without touching this file.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const latestPost = blogs.reduce((d, b) => (b.date > d ? b.date : d), "");
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/highlights`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/journal`, lastModified: latestPost ? new Date(latestPost) : now, changeFrequency: "weekly", priority: 0.7 },
    ...blogs.map(post => ({
      url: `${SITE_URL}/journal/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
