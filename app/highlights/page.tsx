import Navbar from "@/components/shared/Navbar";
import HighlightsWall from "@/components/shared/HighlightsWall";
import Contact from "@/components/shared/contact";

export const metadata = {
  title: "Highlights — Somkene Ojukwu",
  description: "Talks, hackathons, events and credentials: everything Somkene Ojukwu has shown up for, with photos and links.",
};

export default function HighlightsPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HighlightsWall />
      <Contact />
    </main>
  );
}
