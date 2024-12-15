'use client'
import {
    IconBrandReact,
    IconBrandMongodb,
    IconBrandTypescript,
    IconBrandTailwind,
    IconBrandNextjs,
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
                            With over 4 years of experience as a <span className="font-semibold">Full-stack developer</span> , I have had a deep passion for creating and building things. My journey into
                            software engineering was driven by my love for creation, which began with drawing and making music. This creative inclination naturally
                            led me to explore the world of technology and software development.
                        </p>
                        <p className="font-light mt-5">
                            I specialize in both <span className="font-semibold">Frontend </span> and <span className="font-semibold">Backend </span> development, having worked extensively in both areas. I thrive on the continuous learning
                            process that coding offers and relish the opportunity to apply new knowledge to solve real-world problems. Coding, for me, is more
                            than just a profession, it is a hobby and a source of joy.
                        </p>
                        <p className="font-light mt-5">
                            In addition to my technical skills, I am a highly social person and have always found myself in leadership roles, guiding teams and
                            fostering collaboration. One of the projects I am most proud of is <span className="font-semibold">Appvarsity,</span>  a platform I and my team developed
                            to provide essential information and resources to Aptech students, helping them navigate their academic careers more effectively.
                        </p>
                        <p className="font-light mt-5">
                            I am always excited to take on new challenges and build innovative solutions that make a difference. Let's connect and see how we can
                            create something amazing together!
                        </p>

                        {/* Experience */}
                        <div className="mt-24">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Work Experience</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                                <li>
                                    <h4 className="text-xl font-bold">Founder & Full-Stack Developer, Appvarsity</h4>
                                    <span className="text-sm text-gray-500">Jan 2024 - Present</span>
                                    <p className="mt-2 text-md font-light">
                                        I Founded and led the development of Appvarsity, A platform designed to support Aptech students. I am responsible for overseeing both front-end and back-end development, managing the team, and ensuring we give valuable tools and essential resources to enhance students educational needs.
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
                                        I Focused on creating responsive user interfaces with a strong emphasis on performance and accessibility. I Leveraged agile methodologies to enhance teamwork and foster effective communication, contributing to a more cohesive and productive development process.
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
