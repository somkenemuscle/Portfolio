import { IconClothesRack, IconSchool, IconSocial, IconCloud, IconBook2 } from "@tabler/icons-react";
export const projectData = [
    {
        title: "Alkademy Press",
        icon: IconBook2,
        niche: 'JOURNAL MANAGEMENT PLATFORM',
        device: 'laptop',
        description:
            "A multi-tenant journal management platform built to handle complex editorial workflows and large datasets. Contributed to backend architecture, data processing, API optimization, asynchronous job processing, caching, and cloud storage infrastructure.",
        technologies: [
            {
                name: "TypeScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
            },
            {
                name: "React",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
            },
            {
                name: "NestJS",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg"
            },
            {
                name: "Node.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
            },
            {
                name: "PostgreSQL",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
            },
            {
                name: "Redis",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
            },
            {
                name: "BullMQ"
            },
            {
                name: "AWS S3",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
            }
        ],
        livePreview: "https://press.alkademy.com",
        blurb: "A multi-tenant journal platform for heavy editorial workflows: async jobs, caching and cloud storage under the hood.",
        accent: "sun",
        art: "journals",
        architecture: [
            { role: "client", nodes: ["React app"] },
            { role: "api", nodes: ["NestJS · Node.js"] },
            { role: "data", nodes: ["PostgreSQL", "Redis cache", "BullMQ jobs"] },
            { role: "files", nodes: ["AWS S3 · signed URLs"] },
        ],
        image: "/assets/images/alkademypress.png"
    },
    {
        title: "Clouddley",
        icon: IconCloud,
        device: 'laptop',
        niche: 'CLOUD INFRASTRUCTURE PLATFORM',
        description:
            "Contributed to the development of Clouddley's cloud infrastructure platform, building frontend experiences that enabled developers to provision and manage applications, databases, VPS instances, and AI workloads.",
        technologies: [
            {
                name: "React",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
            },
            {
                name: "Next.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
                style: "bg-white p-0.5"
            },
            {
                name: "TypeScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
            },
            {
                name: "Cloud Infrastructure",
                icon: "https://api.iconify.design/tabler/cloud.svg",
                style: "bg-gray-100 p-2 rounded-full"
            },
            {
                name: "React Query",
                icon: "https://api.iconify.design/simple-icons/reactquery.svg"
            },
            {
                name: "Zustand"
            },
        ],
        livePreview: "https://clouddley.com",
        blurb: "Frontend for a platform where developers spin up apps, databases, VPS instances and AI workloads.",
        accent: "peri",
        art: "cloud",
        architecture: [
            { role: "ui", nodes: ["Next.js · TypeScript"] },
            { role: "state", nodes: ["React Query", "Zustand"] },
            { role: "api", nodes: ["Clouddley platform API"] },
            { role: "infra", nodes: ["Apps", "Databases", "VPS", "AI"] },
        ],
        image: "/assets/images/cdd.PNG"
    },
    {
        title: "Celestique",
        icon: IconClothesRack,
        niche: 'ECOMMERCE WEBSITE',
        device: 'laptop',
        description:
            "A modern e-commerce online store, where customers can browse clothes ranging for both men and women , make and track their orders and an onsite payment integration for easy payments for users.",
        technologies: [
            {
                name: "TypeScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
            },
            {
                name: "Next.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
                style: "bg-white p-0.5"
            },
            {
                name: "Tailwind",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
            },
            {
                name: "Node.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
            },
            {
                name: "Express.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
                style: "bg-gray-100 p-2 rounded-full",
            },
            {
                name: "Postman",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
            },
            {
                name: "MongoDB",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
            }
        ],
        livePreview: "https://celestique.vercel.app/",
        blurb: "A clothing store for men and women with order tracking and payments built right in.",
        accent: "gum",
        art: "hanger",
        architecture: [
            { role: "store", nodes: ["Next.js · Tailwind"] },
            { role: "api", nodes: ["Express · Node.js"] },
            { role: "data", nodes: ["MongoDB", "Orders", "Payments"] },
        ],
        sourceCode: "https://github.com/somkenemuscle/celestique",
        image: "/assets/images/cq.png"
    },
    {
        title: "Appvarsity",
        icon: IconSchool,
        niche: 'STUDENT LEARNING PLATFORM',
        device: 'laptop',
        description:
            "The one place for your Aptech journey: project guides, past questions, and free courses, organized in one place, kept current every semester, and free to start.",
        technologies: [
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", style: "bg-white p-0.5" },
            { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        ],
        livePreview: "https://appvarsity.vercel.app/",
        blurb: "A free hub I built for Aptech students: project guides, past questions and courses, kept current every semester.",
        accent: "mint",
        art: "campus",
        architecture: [
            { role: "client", nodes: ["Next.js · Tailwind"] },
            { role: "api", nodes: ["Express · Node.js"] },
            { role: "data", nodes: ["MongoDB"] },
            { role: "content", nodes: ["Guides", "Past questions", "Courses"] },
        ],
        image: "/assets/images/appvarsity.png"
    },
    // {
    //     title: "Appvarsity",
    //     icon: IconSchool,
    //     device: 'laptop',
    //     niche: 'EDUCATIONAL SITE',
    //     description:
    //         "A platform with over 70+ users dedicated to bridging the gap in information and resources for Aptech students by providing them with essential tools and support tailored to their needs.",
    //     technologies: [
    //         {
    //             name: "TypeScript",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
    //         },
    //         {
    //             name: "Next.js",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    //             style: "bg-white p-0.5"
    //         },
    //         {
    //             name: "Tailwind",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    //         },
    //         {
    //             name: "MongoDB",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
    //         },
    //         {
    //             name: "Postman",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
    //         },
    //         {
    //             name: "Express.js",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    //             style: "bg-gray-100 p-2 rounded-full",
    //         },

    //     ],
    //     livePreview: "https://appvarsity.vercel.app/",
    //     sourceCode: "https://github.com/somkenemuscle/AppVarsity",
    //     image: "/assets/images/appvarsity.png"
    // },
    // {
    //     title: "Retweet",
    //     icon: IconSocial,
    //     device: 'laptop',
    //     niche: 'SOCIAL MEDIA APP',
    //     description:
    //         "A fun and interactive social media platform designed for sharing posts and connecting with friends, built specifically for my school or any community and friends to create our very own online fun hangout space! 😂",
    //     technologies: [
    //         {
    //             name: "TypeScript",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
    //         },
    //         {
    //             name: "Next.js",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    //             style: "bg-white p-0.5"

    //         },
    //         {
    //             name: "Tailwind",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    //         },
    //         {
    //             name: "Node.js",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
    //         },
    //         {
    //             name: "Express.js",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    //             style: "bg-gray-100 p-2 rounded-full",
    //         },
    //         {
    //             name: "Postman",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
    //         },
    //         {
    //             name: "MongoDB",
    //             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
    //         }
    //     ],
    //     livePreview: "https://retweet-frontend.vercel.app/",
    //     sourceCode: "https://github.com/somkenemuscle/Retweet-backend",
    //     image: "/assets/images/retweet.png"
    // }
];
