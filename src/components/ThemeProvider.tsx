"use client";

import React, { useEffect, useState, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (theme: string) => {
      root.classList.remove("light", "dark");
      if (theme === "light") {
        root.classList.add("light");
      } else if (theme === "dark") {
        root.classList.add("dark");
      }
    };

    if (theme === "system") {
      const isDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(isDark ? "dark" : "light");

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { theme, setTheme });
        }
        return child;
      })}
    </>
  );
}
