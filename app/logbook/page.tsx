import Navbar from "@/components/shared/Navbar";
import LogbookWall from "@/components/shared/LogbookWall";
import Contact from "@/components/shared/contact";

export const metadata = {
  title: "Logbook — Somkene Ojukwu",
  description: "Talks, hackathons, events and credentials: everything Somkene Ojukwu has shown up for, with photos and links.",
};

export default function LogbookPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <LogbookWall />
      <Contact />
    </main>
  );
}
