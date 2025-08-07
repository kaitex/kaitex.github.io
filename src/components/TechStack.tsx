import React from "react";
import {
    FaReact,
   
    FaNodeJs,
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
 
    SiCypress,
    SiDotnet
} from "react-icons/si";

const techStack = [
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Next JS", icon: <SiNextdotjs className="text-white" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
   { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "ASP.NET Core", icon: <SiDotnet className="text-purple-500" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-teal-400" /> },
    { name: "Cypress", icon: <SiCypress className="text-green-400" /> },
];

const TechStack = () => {
    return (
        <section className="py-10 my-10">
            <h2 className="text-lg sm:text-xl font-semibold tracking-wider text-white mb-6">
                TECH STACK
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {techStack.map((tech) => (
                    <div
                        key={tech.name}
                        className="flex flex-col cursor-pointer items-center justify-center gap-2 border border-neutral-600 rounded-lg p-4 
             transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-accent/40"
                    >
                        <div className="text-3xl">{tech.icon}</div>
                        <span className="text-sm text-neutral-300">{tech.name}</span>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default TechStack;
