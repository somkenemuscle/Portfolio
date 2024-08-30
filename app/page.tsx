import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/shared/heroSection";
// import { About } from "@/components/shared/About";
import Projects from "@/components/shared/Projects";
import Skills from "@/components/shared/Skills";
import Contact from "@/components/shared/contact";


export default function Home() {

  return (
    <main>
      <Navbar />
      <HeroSection />
      {/* <About /> */}
      <Projects />
      <Skills />
      <Contact />

    </main>
  );
}

