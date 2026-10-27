import type { Metadata } from "next";
import { pageMeta } from "@/constants/site";
import Navbar from "@/components/shared/Navbar";
import HighlightsWall from "@/components/shared/HighlightsWall";
import Contact from "@/components/shared/contact";

export const metadata: Metadata = pageMeta({
  title: "Highlights",
  description:
    "Talks, hackathons, events and credentials from Somkene Ojukwu, a software engineer in Lagos, Nigeria, with photos and links.",
  path: "/highlights",
});

export default function HighlightsPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HighlightsWall />
      <Contact />
    </main>
  );
}
