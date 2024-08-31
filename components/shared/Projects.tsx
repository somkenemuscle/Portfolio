"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const cards = [
    {
        title: "SwiftDocs",
        description:
            "A live-document collaboration application which allows users from all around the world , to share the same space and share innovative ideas.",
        technologies: ["React", "Tailwind", "MongoDb", "Next.js", "Express", "Typescript"],
        livePreview: "https://swiftdocs.vercel.app/",
        caseStudy: "#",
        sourceCode: "https://github.com/somkenemuscle/Swift-Docs",
        image: "/assets/images/sd.jpg",
    },
    {
        title: "Appvarsity",
        description:
            "This is a description for Project 2. It involves building a full-stack application using Next.js and MongoDB.",
        technologies: ["Next.js", "MongoDB", "Tailwind", "Express", "React", "Typescript"],
        livePreview: "https://appvarsity.vercel.app/",
        caseStudy: "#",
        sourceCode: "https://github.com/somkenemuscle/AppVarsity",
        image: "/assets/images/ap.jpg",
    },
    {
        title: "Simplons Beauty Care",
        description:
            "This is a description for Project 3. It's a mobile application developed with React Native and integrates with Firebase.",
        technologies: ["React", "Bootstrap", "Css", "Javascript"],
        livePreview: "https://simplons-beauty-care.vercel.app/",
        caseStudy: "#",
        sourceCode: "https://github.com/somkenemuscle/Simplons-Beauty-Care",
        image: "/assets/images/sn.jpg",
    },
];

export const Projects = () => {
    return (
        <div>
            <span className="text-center mb-7 block">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Featured <span className="text-yellow-400">Projects</span>
                </p>
                <p className="mt-3 font-light text-gray-500">
                    Check out my selected projects to see my work in action.
                </p>
            </span>

            <div className="grid grid-cols-1 gap-8 px-4 py-8 lg:mx-36 sm:mx-11">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="border border-gray-300 rounded-2xl bg-white sticky grid md:grid-cols-1 lg:grid-cols-2 gap-4"
                        style={{
                            top: `calc(96px + ${idx * 40}px)`,
                            height: "auto",
                        }}
                    >
                        {/* Text Section */}
                        <div className="p-6 flex flex-col justify-between order-2 lg:order-1">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                                <p className="text-gray-700 mb-4">{card.description}</p>
                                <div className="flex gap-2 mb-4">
                                    <Link href={card.caseStudy} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        Case Study
                                    </Link>
                                    <Link href={card.sourceCode} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        Source Code
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {card.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Link
                                href={card.livePreview}
                                className="inline-block mt-auto px-4 py-2 text-white bg-black text-center rounded-xl hover:bg-gray-700"
                                target="_blank" rel="noopener noreferrer"
                            >
                                Live Preview
                            </Link>
                        </div>

                        {/* Image Section */}
                        <div className="p-6 order-1 lg:order-2">
                            <Image
                                src={card.image}
                                alt={card.title}
                                className="w-full h-auto object-cover rounded-2xl"
                                width={500}
                                height={500}
                                layout="responsive"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>



    );
};
