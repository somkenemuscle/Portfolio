import type { Metadata } from "next";
import { pageMeta } from "@/constants/site";
import Navbar from "@/components/shared/Navbar";
import Skills from "@/components/shared/Skills";
import AboutHero from "@/components/shared/AboutHero";
import Interests from "@/components/shared/Interests";
import Know from "@/components/shared/Know";
import HighlightsBoard from "@/components/shared/HighlightsBoard";
import Contact from "@/components/shared/contact";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "About Somkene Ojukwu, a software engineer in Lagos, Nigeria: how I got here, the tools I use, highlights from talks and hackathons, and life outside the editor.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <Skills />
      <Know />
      <HighlightsBoard />
      <Interests />
      <Contact />
    </main>
  );
}
