'use client'
import {
    IconBrandReact,
    IconBrandMongodb,
    IconBrandTypescript,
    IconBrandNodejs,
    IconBrandTailwind,
    IconBrandNextjs,
    IconBrandJavascript,
    IconBrandGit,
    IconServer2


} from "@tabler/icons-react";
import SlideIn from "./SlideIn";
import { motion } from "framer-motion";

const About = () => {
    const technologies = [
        { logo: <IconBrandReact size={24} className="text-blue-500" />, name: "React" },
        { logo: <IconBrandNextjs size={24} className="text-black" />, name: "Next.js" },
        { logo: <IconBrandTypescript size={24} className="text-blue-600" />, name: "TypeScript" },
        { logo: <IconServer2 size={24} className="text-teal-500" />, name: "Express" },
        { logo: <IconBrandMongodb size={24} className="text-green-500" />, name: "MongoDB" },
    ];
    const technologies2 = [
        { logo: <IconBrandReact size={24} className="text-blue-500" />, name: "React" },
        { logo: <IconBrandNextjs size={24} className="text-black" />, name: "Next.js" },
        { logo: <IconBrandTypescript size={24} className="text-blue-600" />, name: "TypeScript" },
        { logo: <IconBrandTailwind size={24} className="text-teal-500" />, name: "Tailwind" },
        { logo: <IconBrandGit size={24} className="text-orange-600" />, name: "Git" },

    ];
    // Animation variants for each skill
    const skillVariants = {
        hidden: { opacity: 0, y: 50 }, // Starting state
        visible: { opacity: 1, y: 0 }, // Ending state
    };


    return (
        <SlideIn direction='bottom'>
            <section className="px-8 md:px-16 lg:px-32 mb-24">
                <div className="container mx-auto flex flex-col items-center md:flex-row">
                    {/* Description */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl text-center font-semibold mb-4 text-gray-800">About <span className="text-yellow-400">Me</span> </h2>
                        <p className="font-light">
                            I am a passionate developer with a keen interest in building scalable and efficient software solutions. With over
                            4 years of experience in full-stack development, I specialize in creating dynamic and user-friendly
                            web applications. I enjoy tackling complex problems and learning new technologies to enhance my skill
                            set. Outside of coding, I love exploring new places, reading about tech innovations, and contributing
                            to open-source projects. Which blah has improved my skill and dedication to my crafty wise untology beyong hayys.
                        </p>

                        {/* Experience */}
                        <div className="mt-24">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Work Experience</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                                <li>
                                    <h4 className="text-xl font-bold">Founder & Full-Stack Developer, Appvarsity</h4>
                                    <span className="text-sm text-gray-500">Aug 2024 - Present</span>
                                    <p className="mt-2 text-md font-light">
                                        Founded and led the development of Appvarsity, a platform designed to support Aptech students. Responsible for overseeing both front-end and back-end development, managing the team, and ensuring the site gives valuable tools to enhance students educational needs.
                                        <span className="block mt-2 font-semibold">Technologies Used <span aria-hidden="true">→</span></span>
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                        {technologies.map((tech, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex flex-col items-center"
                                                variants={skillVariants} // Apply the animation variants
                                                initial="hidden" // Initial animation state
                                                whileInView="visible" // Animation state when the element is in view
                                                viewport={{ once: true, amount: 0.2 }} // Controls when the element should animate
                                                transition={{ duration: 0.5, delay: index * 0.1 }} // Duration and delay for a staggered effect
                                            >
                                                <button
                                                    key={index}
                                                    className="flex flex-col items-center justify-center p-3 rounded-md  transition-transform transform  focus:outline-none"
                                                >
                                                    <span className="text-lg">{tech.logo}</span>
                                                    <span className="mt-1 text-xs text-gray-700">{tech.name}</span>
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </li>
                                <li>
                                    <h4 className="text-xl font-bold">Frontend Developer Intern, Mindera</h4>
                                    <span className="text-sm text-gray-500">Jan 2023 - Jul 2023</span>
                                    <p className="mt-2 text-md font-light">
                                        Focused on creating responsive user interfaces with a strong emphasis on performance and accessibility. Leveraged agile methodologies to enhance teamwork and foster effective communication, contributing to a more cohesive and productive development process.
                                        <span className="block mt-2 font-semibold">Technologies Used <span aria-hidden="true">→</span></span>
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                        {technologies2.map((tech, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex flex-col items-center"
                                                variants={skillVariants} // Apply the animation variants
                                                initial="hidden" // Initial animation state
                                                whileInView="visible" // Animation state when the element is in view
                                                viewport={{ once: true, amount: 0.2 }} // Controls when the element should animate
                                                transition={{ duration: 0.5, delay: index * 0.1 }} // Duration and delay for a staggered effect
                                            >
                                                <button
                                                    key={index}
                                                    className="flex flex-col items-center justify-center p-3 rounded-md transition-transform transform  focus:outline-none"
                                                >
                                                    <span className="text-lg">{tech.logo}</span>
                                                    <span className="mt-1 text-xs text-gray-700">{tech.name}</span>
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </SlideIn>
    );
};

export default About;
