import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaitex",
  description: "A personal Blog and Portfolio ",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="../public/globe.svg" sizes="any" />
      </head>
      <body className="max-w-5xl py-5 mx-auto px-5 sm:px-20">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
      
        </ThemeProvider>
      </body>
    </html>
  );
}
