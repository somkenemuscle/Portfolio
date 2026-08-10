const devicon = (slug: string, variant = "original") =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`;

export const techIcons: Record<string, string> = {
    "React": devicon("react"),
    "Postgresql": devicon("postgresql"),
    "NextJs": devicon("nextjs"),
    "Typescript": devicon("typescript"),
    "Javascript": devicon("javascript"),
    "NodeJs": devicon("nodejs"),
    "NestJs": devicon("nestjs"),
    "Express": devicon("express"),
    "MySQL": devicon("mysql"),
    "MongoDB": devicon("mongodb"),
    "Redis": devicon("redis"),
    "AWS": devicon("amazonwebservices", "original-wordmark"),
    "Tailwind": devicon("tailwindcss"),
    "CSS": devicon("css3"),
    "Custom Css": devicon("css3"),
    "Jest": devicon("jest", "plain"),
    "Docker": devicon("docker"),
    "Socket.io": devicon("socketio"),
};
