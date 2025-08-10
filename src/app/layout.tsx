import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeContext";
import GoatCounterTracker from "@/components/GoatCountTracker";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A personal portfolio website",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            data-goatcounter="https://kaitex.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
          />
        )}
      </head>
      <body className="max-w-5xl py-5 mx-auto px-5 sm:px-20">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          {process.env.NODE_ENV === "production" && <GoatCounterTracker />}
        </ThemeProvider>
      </body>
    </html>
  );
}
