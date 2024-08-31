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
            href: "#",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-orange-500 dark:text-neutral-300" />
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
        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-black dark:text-neutral-300" />
            ),
            href: "#",
        }

    ];


    return (
        <div id="about" className="flex items-center justify-center mt-14 w-full">
            <FloatingDock
                items={contactlinks}
            />
        </div>
    );
}
