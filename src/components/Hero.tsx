import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function Hero() {
  return (
    <section className=" mt-20 flex flex-col md:flex-row items-center gap-10 ">
    
        <div className="w-80 rounded-full bg-bg-0 p-[2px]">
          <img
            src="https://avatars.githubusercontent.com/u/106853078?v=4" // replace with your image path
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      

    
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold">
          Hey, I'm <span className="text-white">Bidur</span>.{" "}
          <span className="text-text-1 text-gray-400">I'm a  Software Developer.</span>
         
        </h1>

        <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-text-1">
          <span className="flex items-center gap-1">
            <MdLocationOn className="text-lg" /> kathmandu, Nepal.
          </span>

          <a
            href="https://linkedin.com"
            className="flex items-center gap-1 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-blue-600" /> LinkedIn
          </a>

          <a
            href="https://github.com"
            className="flex items-center gap-1 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
