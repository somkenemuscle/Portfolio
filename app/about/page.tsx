import Navbar from "@/components/shared/Navbar";
import Skills from "@/components/shared/Skills";
import AboutHero from "@/components/shared/AboutHero";
import Credentials from "@/components/shared/Credentials";
import Interests from "@/components/shared/Interests";
import Know from "@/components/shared/Know";
import Contact from "@/components/shared/contact";

export const metadata = {
  title: "About — Somkene Ojukwu",
  description: "Learn more about Somkene Ojukwu — software engineer, full-stack developer, and creative based in Lagos, Nigeria.",
};

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <Skills />
      <Know />
      <Interests />
      <Credentials />
      <Contact />
    </main>
  );
}
