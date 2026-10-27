import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/shared/heroSection";
import { Projects } from "@/components/shared/Projects";
import JournalPreview from "@/components/shared/JournalPreview";
import Experience from "@/components/shared/Experience";
import Contact from "@/components/shared/contact";
import HighlightsBadge from "@/components/shared/HighlightsBadge";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Projects />
      <Experience />
      <JournalPreview />
      <Contact />
      <HighlightsBadge />
    </main>
  );
}
