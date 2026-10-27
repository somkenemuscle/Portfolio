import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, SOCIALS, X_HANDLE } from "@/constants/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Somkene Ojukwu",
    "Somkene",
    "software engineer",
    "backend engineer",
    "full stack engineer",
    "software engineer Lagos",
    "software engineer Nigeria",
    "NestJS",
    "Node.js",
    "Next.js",
    "TypeScript",
    "multi-tenant SaaS",
    "portfolio",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  // every page sets its own canonical; a root one here would point them all at the homepage
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: X_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Who I am, for search engines: links my profiles together and to this site.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      alternateName: ["Somkene", "Ojukwu Somkene"],
      url: SITE_URL,
      image: `${SITE_URL}/assets/images/profile.jpg`,
      jobTitle: "Software Engineer",
      description: SITE_DESCRIPTION,
      worksFor: { "@type": "Organization", name: "Alkademy", url: "https://www.alkademy.com/" },
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      knowsAbout: ["Backend engineering", "System design", "Multi-tenant SaaS", "NestJS", "Node.js", "PostgreSQL", "Redis", "Next.js", "React", "TypeScript"],
      sameAs: Object.values(SOCIALS),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${hand.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
