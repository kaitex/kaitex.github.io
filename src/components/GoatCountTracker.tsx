"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Define proper types for GoatCounter
declare global {
  interface Window {
    goatcounter?: {
      count: (args: { path: string }) => void;
    };
  }
}

export default function GoatCounterTracker(): React.ReactNode {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.goatcounter) {
      window.goatcounter.count({ path: pathname });
    }
  }, [pathname]);

  return null;
}
