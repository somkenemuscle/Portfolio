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
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-black dark:text-neutral-300"/>
            ),
            href: "#",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-purple-600 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Linkedin",
            icon: (
                <IconBrandLinkedin className="h-full w-full text-blue-900 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "E-mail",
            icon: (
                <IconBrandGmail className="h-full w-full text-red-500" />
            ),
            href: "#",
        },
    ];


    return (
        <div className="flex items-center justify-center mt-14 w-full">
            <FloatingDock
                items={contactlinks}
            />
        </div>
    );
}
