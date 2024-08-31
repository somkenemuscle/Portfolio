'use client'
import {
  IconBrandReact,
  IconBrandMongodb,
  IconBrandTypescript,
  IconBrandNodejs,
  IconBrandDocker,
  IconBrandTailwind,
  IconBrandBootstrap,
  IconBrandNextjs,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconServer2,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import SlideIn from "./SlideIn";

function Skills() {
  const skills = [
    { name: "HTML5", logo: <IconBrandHtml5 size={48} className="text-orange-500" /> },
    { name: "CSS3", logo: <IconBrandCss3 size={48} className="text-blue-700" /> },
    { name: "JavaScript", logo: <IconBrandJavascript size={48} className="text-yellow-500" /> },
    { name: "TypeScript", logo: <IconBrandTypescript size={48} className="text-blue-600" /> },
    { name: "Bootstrap", logo: <IconBrandBootstrap size={48} className="text-purple-600" /> },
    { name: "Tailwind", logo: <IconBrandTailwind size={48} className="text-teal-500" /> },
    { name: "ReactJs", logo: <IconBrandReact size={48} className="text-blue-500" /> },
    { name: "Next.js", logo: <IconBrandNextjs size={48} className="text-black" /> },
    { name: "Node.js", logo: <IconBrandNodejs size={48} className="text-green-800" /> },
    { name: "Express", logo: <IconServer2 size={48} className="text-gray-700" /> },
    { name: "MongoDB", logo: <IconBrandMongodb size={48} className="text-green-500" /> },
    { name: "Docker", logo: <IconBrandDocker size={48} className="text-indigo-700" /> }
  ];

  // Animation variants for each skill
  const skillVariants = {
    hidden: { opacity: 0, y: 50 }, // Starting state
    visible: { opacity: 1, y: 0 }, // Ending state
  };

  return (
    <div id="skills" className="py-12 px-24 my-12 mt-10 mb-36">
      <SlideIn direction="bottom">
        <p className="text-center font-light mb-14 text-gray-900">
          These are the technologies i specialize in, drawn from my experience as a Frontend and Backend developer <span aria-hidden="true">→</span>
        </p>
      </SlideIn>
      <div id="about" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center"
            variants={skillVariants} // Apply the animation variants
            initial="hidden" // Initial animation state
            whileInView="visible" // Animation state when the element is in view
            viewport={{ once: true, amount: 0.2 }} // Controls when the element should animate
            transition={{ duration: 0.5, delay: index * 0.1 }} // Duration and delay for a staggered effect
          >
            {skill.logo}
            <span className="mt-2 text-sm font-light">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
