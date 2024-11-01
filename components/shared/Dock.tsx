'use client'
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandX,
    IconBrandLinkedin,
    IconBrandGmail

} from "@tabler/icons-react";

export function FloatingDockDemo() {
    const contactlinks = [
        {
            title: "Linkedin",
            icon: (
                <IconBrandLinkedin className="h-full w-full text-black dark:text-neutral-300" />
            ),
            href: "https://www.linkedin.com/in/somkene-ojukwu/",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-indigo-950 dark:text-neutral-300" />
            ),
            href: "https://github.com/somkenemuscle",
        },
        {
            title: "E-mail",
            icon: (
                <IconBrandGmail className="h-full w-full text-red-900" />
            ),
            href: "mailto:somkeneoj@gmail.com",
        },
        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-black dark:text-neutral-300" />
            ),
            href: "https://x.com/somkeneOj",
        }

    ];


    return (
        <div id="projects" className="flex items-center justify-center mt-14 w-full">
            <FloatingDock
                items={contactlinks}
            />
        </div>
    );
}
