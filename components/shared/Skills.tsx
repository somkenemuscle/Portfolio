import {
  IconBrandReact,
  IconBrandMongodb,
  IconBrandTypescript,
  IconBrandNodejs,
  IconBrandDocker,
  IconBrandTailwind,
  IconBrandBootstrap,
  IconBrandNextjs,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconServer2,
} from "@tabler/icons-react";

function Skills() {
  const skills = [
    { name: "HTML5", logo: <IconBrandHtml5 size={64} className="text-orange-500" /> },
    { name: "CSS3", logo: <IconBrandCss3 size={64} className="text-blue-700" /> },
    { name: "JavaScript", logo: <IconBrandJavascript size={64} className="text-yellow-500" /> },
    { name: "TypeScript", logo: <IconBrandTypescript size={64} className="text-blue-600" /> },
    { name: "Bootstrap", logo: <IconBrandBootstrap size={64} className="text-purple-600" /> },
    { name: "Tailwind", logo: <IconBrandTailwind size={64} className="text-teal-500" /> },
    { name: "ReactJs", logo: <IconBrandReact size={64} className="text-blue-500" /> },
    { name: "Next.js", logo: <IconBrandNextjs size={64} className="text-black" /> },
    { name: "Node.js", logo: <IconBrandNodejs size={64} className="text-green-800" /> },
    { name: "Express", logo: <IconServer2 size={64} className="text-gray-700" /> },
    { name: "MongoDB", logo: <IconBrandMongodb size={64} className="text-green-500" /> },
    { name: "Docker", logo: <IconBrandDocker size={64} className="text-indigo-700" /> }
  ];

  return (
    <div id="skills" className="py-12 px-16">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center">
            {skill.logo}
            <span className="mt-2 text-sm font-light">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
