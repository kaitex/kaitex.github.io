"use client";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useState, useEffect } from "react";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const toRotate = ["Full stack developer", "Creating with Code. Small details matter", ".Net Devloper"];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);

    return () => {
      clearInterval(ticker);
    };
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, displayText.length - 1)
      : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
      setTypingSpeed(30);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150);
    }
  };

  return (
    <section className=" mt-20 flex flex-col  items-center gap-10 ">
    
        <div className="w-50 rounded-full bg-bg-0 p-[2px]">
          <img
            src="https://avatars.githubusercontent.com/u/106853078?v=4" 
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      

    
    <div className="text-center ">
      
 <p className="text-3xl mb-2 font-medium text-[var(--text-color)]">
         
    Bidur Majgainya
        </p>
        <span className="text-[var(--text-color)] opacity-80 text-sm mt h-5">
          <span className="inline-block border-r-2 border-[var(--text-color)] pr-1 animate-pulse">
            {displayText}
          </span>
        </span>

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
  href="mailto:majgianyabidur02@gmail.com"
  className="flex items-center gap-1 hover:underline text-[var(--text-color)] opacity-70"
>
  <FaEnvelope className="text-[var(--text-color)] opacity-70" /> Email
</a>

        </div>
      </div>
    </section>
  );
}
