import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/shared/heroSection";
// import { About } from "@/components/shared/About";
import Test from "@/components/shared/Test";
import Skills from "@/components/shared/Skills";
import Contact from "@/components/shared/contact";
export default function TabsDemo() {

  return (
    <main>
      <Navbar />
      <HeroSection />
      {/* <About /> */}
      {/* <Test /> */}
      <Skills />
      <Contact />

    </main>
  );
}

