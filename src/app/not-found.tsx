"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    // Add some interactive elements
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.location.href = "/";
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="text-center px-4">
        <div className="mb-8">
          <h3 className="text-6xl md:text-8xl font-bold mb-4 text-[#fe8019]">404</h3>
          <h3 className="text-2xl md:text-3xl font-medium mb-4">Page Not Found</h3>
          <p className="text-lg opacity-80 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
           className="links "
          >
            <p  className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors duration-200">  Go Home</p>
          
          </Link>

        
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <Link href="/posts" className="p-4 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors">
              <span className="block font-medium">📚 Posts</span>
              <span className="text-xs opacity-70">Read my latest articles</span>
            </Link>
            <Link href="/projects" className="p-4 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors">
              <span className="block font-medium">💻 Projects</span>
              <span className="text-xs opacity-70">Check out my work</span>
            </Link>
            <Link href="/talks" className="p-4 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors">
              <span className="block font-medium">🎤 Talks</span>
              <span className="text-xs opacity-70">See my presentations</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
