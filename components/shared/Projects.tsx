"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SlideIn from "./SlideIn";
import { projectData } from "@/constants/projectData";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Projects = () => {
    return (
        <SlideIn direction="bottom">
            <div className="font-sans">
                <div className="text-center mb-10 mx-4 project-header">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Selected <span className="text-pink-200">Projects</span>
                    </p>
                    <p className="mt-3  font-light text-gray-300">
                        Recent works to see my creativity in action.
                    </p>
                </div>

                <div className="card-container px-4 lg:px-8">
                    {projectData.map((project, index) => (
                        <div
                            key={index}
                            className="card md:sticky lg:sticky pb-20 md:pb-0 border-2 border-neutral-800 md:max-w-4xl lg:max-w-6xl mx-auto bg-neutral-900 rounded-3xl my-14 cursor-pointer hover:shadow-[0_0px_10px_0_rgba(255,105,180,0.2)] hover:bg-gradient-to-tl hover:via-transparent hover:from-neutral-950 hover:to-neutral-950 transition-all duration-300"
                            style={{ top: `calc(96px + ${index * 20}px)`, height: "auto" }}
                        >
                            {/* TOP SECTION */}
                            <section className="pl-6 py-9 flex items-center justify-between">
                                <span className="text-gray-400 tracking-widest text-sm font-light card-top-section-header">
                                    {`0${index + 1} | ${project.niche}`}
                                </span>
                                <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                                    <span>
                                        <GitHubLogoIcon className="mr-6 h-7 w-7 border border-neutral-700 rounded-full text-purple-700 hover:scale-105 hover:text-indigo-200 transition-all duration-300" />
                                    </span>
                                </Link>
                            </section>

                            {/* GRID SECTION */}
                            <section className="grid grid-cols-12 gap-4">
                                <div className={`col-span-12 md:col-span-6 lg:col-span-6 ${project.device === 'laptop' && ' md:rounded-tr-3xl md:border-t-[3px] md:border-r-[3px] md:border-zinc-800'}`}>
                                    <img
                                        src={project.image}
                                        alt={`${project.title} project screenshot`}
                                        className={`object-cover h-[400px] mx-auto ${project.device === 'laptop' && 'sm:w-full sm:object-center md:object-left md:border-t-[16px] md:border-r-[16px] md:border-neutral-950 md:rounded-tr-3xl md:rounded-bl-3xl'} `}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-6 pl-6 md:pl-4 pr-8 pt-11 text-left">
                                    {/* HEADER SECTION */}
                                    <h1 className="text-gray-200 text-3xl mb-1 font-medium flex items-center gap-2">
                                        <project.icon className="bg-neutral-950 hover:animate-spin p-2 rounded-full h-10 w-10 border border-neutral-400" /> {project.title}
                                    </h1>
                                    <p className="text-gray-400 tracking-wide pt-2 font-light">{project.description}</p>

                                    {/* TECHNOLOGIES USED ICONS */}
                                    <ul className="pt-11 flex items-center gap-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <li key={techIndex}>
                                                <img className={`mr-4 w-7 h-7 ${tech.style || ''}`} src={tech.icon} alt={`${tech.name} logo`} />
                                            </li>
                                        ))}
                                    </ul>

                                    {/* LIVE PREVIEW LINK */}
                                    <section className="pt-11">
                                        <Link href={project.livePreview} target="_blank" rel="noopener noreferrer">
                                            <p className="text-gray-300 hover:underline tracking-wide">
                                                🌍 Live Preview →
                                            </p>
                                        </Link>
                                    </section>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div >
        </SlideIn >
    );
};
