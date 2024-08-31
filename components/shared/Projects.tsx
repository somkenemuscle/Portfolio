"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const cards = [
    {
        title: "SwiftDocs",
        description:
            "A live document collaboration application that allows users worldwide to share a common space and exchange innovative ideas seamlessly.",
        technologies: ["React", "Tailwind", "MongoDb", "Next.js", "Express", "Typescript"],
        livePreview: "https://swiftdocs.vercel.app/",
        caseStudy: "#",
        sourceCode: "https://github.com/somkenemuscle/Swift-Docs",
        image: "/assets/images/sd.jpg",
    },
    {
        title: "Appvarsity",
        description:
            "A platform dedicated to bridging the gap in information and resources for Aptech students by providing them with essential tools and support tailored to their needs. ",
        technologies: ["Next.js", "MongoDB", "Tailwind", "Express", "React", "Typescript"],
        livePreview: "https://appvarsity.vercel.app/",
        caseStudy: "#",
        sourceCode: "https://github.com/somkenemuscle/AppVarsity",
        image: "/assets/images/ap.jpg",
    },
    {
        title: "Simplons Beauty Care",
        description:
            "A beauty care website that showcases a range of high-quality products, designed to meet all the skincare and beauty needs of customers.",
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
            <div className="text-center mb-7 mx-4">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Featured <span className="text-yellow-400">Projects</span>
                </p>
                <p className="mt-3  font-light text-gray-500">
                    Check out my selected projects to see my work in action.
                </p>
            </div>

            <div className="hover:cursor-pointer grid grid-cols-1 gap-8 px-4 py-8 lg:mx-36 sm:mx-11">
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
                                <h2 className="text-xl font-bold mb-4">{card.title}</h2>
                                <p className="text-gray-700 mb-4 font-light">{card.description}</p>
                                <div className="flex gap-2 mb-4">
                                    <Link href={card.caseStudy} target="_blank" rel="noopener noreferrer"  className="text-gray-500 hover:underline">
                                    Case Study -
                                    </Link>
                                    <Link href={card.sourceCode} target="_blank" rel="noopener noreferrer" className="text-gray-500  hover:underline">
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
