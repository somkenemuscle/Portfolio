"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SlideIn from "./SlideIn";
import { projectData } from "@/constants/projectData";
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export const Projects = () => {
    return (
        <SlideIn direction="left">
            <div className="font-sans">
                <div className="text-center mb-7 mx-4">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Featured <span className="text-yellow-400">Projects</span>
                    </p>
                    <p className="mt-3  font-light text-gray-500">
                        Check out my selected projects to see my work in action.
                    </p>
                </div>

                <div className="hover:cursor-pointer grid grid-cols-1 gap-8 px-4 py-8 mx-auto max-w-6xl">


                    {projectData.map((project, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-2xl bg-white sticky grid md:grid-cols-1 lg:grid-cols-2 gap-4 shadow-sm hover:shadow-md"
                            style={{
                                top: `calc(96px + ${index * 40}px)`,
                                height: "auto",
                            }}
                        >
                            {/* Text Section */}
                            <div className="p-6 flex flex-col justify-between order-2 lg:order-1">
                                <div>
                                    <h2 className="text-xl font-bold mb-4">{project.title}</h2>
                                    <p className="text-gray-700 mb-4 font-light">{project.description}</p>
                                    <div className="flex gap-2 mb-4">
                                        {/* <Link href={project.caseStudy} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">
                                            Case Study -
                                        </Link> */}
                                        <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm mb-4  hover:underline">
                                            <div className="flex items-center space-x-1">
                                                <GitHubLogoIcon className="h-4 w-4 text-indigo-950 dark:text-neutral-300" />
                                                <span className="text-indigo-950 font-normal">Source Code ...</span>
                                            </div>

                                        </Link>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-1 text-xs font-sans text-white bg-gray-800 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link
                                    href={project.livePreview}
                                    className="inline-block mt-auto px-4 py-2 text-sm  text-white bg-black text-center rounded-xl hover:bg-gray-800"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    Live Preview
                                </Link>
                            </div>

                            {/* Image Section */}
                            <div className="p-6 order-1 lg:order-2">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto object-cover rounded-2xl"
                                    width={1200}
                                    height={800}
                                    priority
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SlideIn>



    );
};
