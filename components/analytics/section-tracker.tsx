"use client";

import { useSectionView } from "@/lib/use-section-view";

export function SectionTracker() {
  useSectionView("servicos", "view_servicos");
  useSectionView("contato", "view_contato");
  return null;
}
