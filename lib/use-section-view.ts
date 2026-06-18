"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";

export function useSectionView(sectionId: string, event: string) {
  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          pushDataLayer(event, { section: sectionId });
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sectionId, event]);
}
