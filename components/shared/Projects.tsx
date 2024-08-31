"use client";

import React from "react";

type Card = {
    title: string;
    description: string;
};

const cards: Card[] = [
    {
        title: "Project 1",
        description:
            "This is a description for Project 1. It showcases a responsive website built with React and Tailwind CSS.",
    },
    {
        title: "Project 2",
        description:
            "This is a description for Project 2. It involves building a full-stack application using Next.js and MongoDB.",
    },
    {
        title: "Project 3",
        description:
            "This is a description for Project 3. It's a mobile application developed with React Native and integrates with Firebase.",
    },
    {
        title: "Project 4",
        description:
            "This is a description for Project 4. The project focuses on creating an e-commerce platform with payment integration.",
    },
];

export const Projects = () => {
    return (
        <div id="projects" className="grid grid-cols-1 gap-8 px-4 py-8 lg:mx-36 sm:mx-11">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="border border-gray-300 p-6 rounded-2xl h-96 bg-white sticky"
                    style={{
                        top: `calc(96px + ${idx * 40}px)`,
                    }}
                >
                    <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                    <p className="text-gray-700">{card.description}</p>
                </div>
            ))}
        </div>
    );
};
