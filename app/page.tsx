import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/shared/heroSection";
import Marquee from "@/components/shared/Marquee";
import Now from "@/components/shared/Now";
import { Projects } from "@/components/shared/Projects";
import JournalPreview from "@/components/shared/JournalPreview";
import Experience from "@/components/shared/Experience";
import Contact from "@/components/shared/contact";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Marquee />
      <Now />
      <Projects />
      <Experience />
      <JournalPreview />
      <Contact />
    </main>
  );
}
