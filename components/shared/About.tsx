import {
    IconBrandReact,
    IconBrandMongodb,
    IconBrandTypescript,
    IconBrandNodejs,
    IconBrandTailwind,
    IconBrandNextjs,
    IconBrandJavascript,
} from "@tabler/icons-react";

const About = () => {
    const technologies = [
        { logo: <IconBrandTypescript size={34} className="text-blue-600" /> },
        { logo: <IconBrandTailwind size={34} className="text-teal-500" /> },
        { logo: <IconBrandReact size={34} className="text-blue-500" /> },
        { logo: <IconBrandNextjs size={34} className="text-black" /> },
        { logo: <IconBrandNodejs size={34} className="text-green-800" /> },
        { logo: <IconBrandMongodb size={34} className="text-green-500" /> },

    ];
    const technologies2 = [
        { logo: <IconBrandTypescript size={34} className="text-blue-600" /> },
        { logo: <IconBrandTailwind size={34} className="text-teal-500" /> },
        { logo: <IconBrandReact size={34} className="text-blue-500" /> },
        { logo: <IconBrandNextjs size={34} className="text-black" /> },
        { logo: <IconBrandJavascript size={34} className="text-yellow-500" /> },
    ];

    return (
        <section id="about" className="px-8 md:px-16 lg:px-32">
            <div className="container mx-auto flex flex-col items-center md:flex-row">
                {/* Description */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">About Me</h2>
                    <p className="text-lg font-light text-gray-600 mb-6">
                        I am a passionate developer with a keen interest in building scalable and efficient software solutions. With over 4 years of experience in full-stack development, I specialize in creating dynamic and user-friendly web applications. I enjoy tackling complex problems and learning new technologies to enhance my skill set. Outside of coding, I love exploring new places, reading about tech innovations, and contributing to open-source projects.
                    </p>

                    {/* Experience */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Experience</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                            <li>
                                <h4 className="text-xl font-bold">Founder & Full-Stack Developer, Appvarsity</h4>
                                <span className="text-sm text-gray-500">Aug 2024 - Present</span>
                                <p className="mt-2 text-md font-light">
                                    Founded and led the development of Appvarsity, A platform designed to support Aptech students. I am Responsible for
                                    overseeing both front-end and back-end development, Managing the team and Ensuring the platform delivers valuable tools to
                                    enhance students educational needs.
                                    <span className="block mt-2 font-semibold">Technologies Used <span aria-hidden="true">→</span></span>
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                    {technologies.map((tech, index) => (
                                        <span key={index} className="flex items-center justify-center">
                                            {tech.logo}
                                        </span>
                                    ))}
                                </div>
                            </li>
                            <li>
                                <h4 className="text-xl font-bold">Frontend Developer Intern, Mindera</h4>
                                <span className="text-sm text-gray-500">Jun 2023 - Jul 2023</span>
                                <p className="mt-2 text-md font-light">
                                    Focused on creating responsive user interfaces with a strong emphasis on
                                    performance and accessibility. Leveraged agile methodologies to enhance
                                    teamwork and foster effective communication, contributing to a more cohesive
                                    and productive development process.

                                    <span className="block mt-2 font-semibold">Technologies Used <span aria-hidden="true">→</span></span>
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                    {technologies2.map((tech, index) => (
                                        <span key={index} className="flex items-center justify-center">
                                            {tech.logo}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </section>

    );
};

export default About;
