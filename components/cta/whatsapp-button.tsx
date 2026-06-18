"use client";

import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/links";
import { trackWhatsApp } from "@/lib/analytics";

type Variant = "primary" | "dark" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  dark: "bg-ink text-white hover:opacity-90",
  outline: "border border-border text-fg hover:bg-surface",
};

export function WhatsAppButton({
  origin,
  children,
  variant = "primary",
  message,
  className = "",
}: {
  origin: string;
  children: ReactNode;
  variant?: Variant;
  message?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp(origin)}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${styles[variant]} ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
