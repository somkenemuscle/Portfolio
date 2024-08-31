"use client";
import React from "react";

const cards = [
    {
        title: "SwiftDocs",
        description:
            "This is a description for Project 1. It showcases a responsive website built with React and Tailwind CSS.",
    },
    {
        title: "Appvarsity",
        description:
            "This is a description for Project 2. It involves building a full-stack application using Next.js and MongoDB.",
    },
    {
        title: "Simplons Beauty Care",
        description:
            "This is a description for Project 3. It's a mobile application developed with React Native and integrates with Firebase.",
    }
];

export const Projects = () => {
    return (
        <div>
            <span className="text-center mb-7">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Featured <span className='text-yellow-400'>Projects</span>
                </p>
                <p className="mt-3 font-light text-gray-500">
                    Check out my selected projects to see my work in action.
                </p>
            </span>


            <div className="grid grid-cols-1 gap-8 px-4 py-8 lg:mx-36 sm:mx-11">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="border border-gray-300 p-6 rounded-2xl  bg-white sticky"
                        style={{
                            top: `calc(96px + ${idx * 40}px)`,
                            height: '500px',
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                        <p className="text-gray-700">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};
