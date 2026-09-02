import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Somkene Ojukwu | Software Engineer",
  description:
    "Portfolio of Somkene Ojukwu — software engineer specializing in building modern web applications.",
  keywords: [
    "Somkene Ojukwu",
    "Somkene",
    "Ojukwu Somkene",
    "somkene.com",
    "software engineer",
    "web developer",
    "portfolio",
  ],
  authors: [{ name: "Somkene Ojukwu", url: "https://somkene.com" }],
  creator: "Somkene Ojukwu",
  metadataBase: new URL("https://somkene.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://somkene.com",
    title: "Somkene Ojukwu | Software Engineer",
    description:
      "Portfolio of Somkene Ojukwu — software engineer specializing in building modern web applications.",
    siteName: "Somkene Ojukwu",
  },
  twitter: {
    card: "summary",
    title: "Somkene Ojukwu | Software Engineer",
    description:
      "Portfolio of Somkene Ojukwu — software engineer specializing in building modern web applications.",
    creator: "@somkene",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Somkene Ojukwu",
  alternateName: ["Somkene", "Ojukwu Somkene"],
  url: "https://somkene.com",
  jobTitle: "Software Engineer",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" style={{ background: '#111111' }}>{children}</body>
    </html>
  );
}
