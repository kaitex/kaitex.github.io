"use client";

import Link from "next/link";
import { useTheme } from "./ThemeContext";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import "../styles/underline.css"
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const cycleTheme = () => {
    const themes = ["light", "dark"] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
          </svg>
        );
      case "dark":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        );
    }
  };

  return (
    <nav className="">
      <div className="mx-auto gap-5 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-xl md:text-2xl font-medium">
            Kaitex
          </Link>
          <Link className="linkWithUnderline text-lg mt-2" href="https://github.com/kaitex">
            <FaGithub /></Link>
             
        </div>
        <div className="flex space-x-6 items-center">
          <Link href="/posts" className="text-md md:text-lg hover:opacity-70">
             Posts
          </Link>
          <Link href="/projects" className="text-md md:text-lg hover:opacity-70">
            Projects
          </Link>
      
          <button
            onClick={cycleTheme}
            className="p-2 rounded-full"
            aria-label="Toggle theme"
            title={`Current theme: ${theme}`}
          >
            {getThemeIcon()}
          </button>
        </div>
      </div>
    </nav>

  );
}
