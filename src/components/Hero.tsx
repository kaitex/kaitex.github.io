import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function Hero() {
  return (
    <section className=" mt-20 flex flex-col md:flex-row items-center gap-10 ">
    
        <div className="w-70 rounded-full bg-bg-0 p-[2px]">
          <img
            src="https://avatars.githubusercontent.com/u/106853078?v=4" // replace with your image path
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      

    
      <div className="text-center md:text-left">
        <p className="text-3xl font-bold text-[var(--text-color)]">
          Hey, I'm <span className="text-[var(--text-color)]">Bidur</span>.{" "}
          <span className="text-[var(--text-color)] opacity-80">I'm a Software Developer.</span>
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
          <span className="flex items-center gap-1 text-[var(--text-color)] opacity-70">
            <MdLocationOn className="text-lg" /> kathmandu, Nepal.
          </span>

          <a
            href="https://www.linkedin.com/in/bidur-majgianya-196318248/"
            className="flex items-center gap-1 hover:underline text-[var(--text-color)] opacity-70"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-[var(--text-color)] opacity-60" /> LinkedIn
          </a>

          <a
            href="https://github.com/bidurmajgainya"
            className="flex items-center gap-1 hover:underline text-[var(--text-color)] opacity-70"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-[var(--text-color)] opacity-70" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
