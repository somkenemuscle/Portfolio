import { experiences } from "@/constants/experience"
import Link from "next/link"
import { CalendarIcon } from "@radix-ui/react-icons"
import SlideIn from "./SlideIn"
import { ArrowTopRightIcon } from "@radix-ui/react-icons";


function Experience() {
    return (
        <section className="px-4 lg:px-8 my-48 cursor-pointer experience-container">
            <div className="md:max-w-4xl mx-auto lg:max-w-6xl">
                <div className="mt-8 rounded-3xl text-left">
                    <div className="grid grid-cols-12 gap-6">
                        {experiences.map((exp, index) => (
                            <div key={index} className="col-span-12 lg:col-span-6 ">
                                <SlideIn direction="bottom">
                                    <div className="border border-neutral-800 p-8 rounded-2xl experience-card">
                                        <section className="flex items-center justify-between">
                                            <h1 className="font-semibold text-gray-100">
                                                {exp.role},
                                                <Link href={exp.link} target="_blank" rel="noopener noreferrer"> {exp.company} </Link>
                                                {" "}  <img alt="" src={exp.location} className="ml-0.5 inline-block h-auto w-5 shrink-0" />
                                            </h1>
                                            <span className="hidden md:block">
                                                <Link href={exp.link} target="_blank" rel="noopener noreferrer">
                                                    <ArrowTopRightIcon className="text-gray-100 hover:scale-125 transition-all duration-300" />
                                                </Link>
                                            </span>
                                        </section>
                                        <h3 className="mt-1 text-neutral-500 text-sm font-medium mb-4 flex items-center">
                                            <CalendarIcon className="mr-2" /> {exp.duration}
                                        </h3>
                                        <hr className="h-1 bg-gradient-to-r from-pink-500 to-yellow-300 border-0" />
                                        <p className="mt-5 text-gray-100 text-sm tracking-wide">{exp.description1}</p>

                                        <ul className="mt-2">
                                            {exp.technologies.map((tech, techIndex) => (
                                                <li key={techIndex} className="inline-block mr-3 mt-3 font-light border border-neutral-800 rounded text-white py-1 px-2 text-xs bg-neutral-900">
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </SlideIn>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}



export default Experience