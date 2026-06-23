"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { nav } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-3.5">
        <a href="#topo" aria-label="Início">
          <Logo size={64} />
        </a>
        <div className="flex items-center gap-6 lg:gap-8">
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex lg:gap-7">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:block">
              <WhatsAppButton origin="navbar" variant="primary" className="px-5 py-2.5">
                WhatsApp
              </WhatsAppButton>
            </div>
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </Container>
      {open ? (
        <Container className="border-t border-border py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1 text-fg">
                {l.label}
              </a>
            ))}
            <WhatsAppButton origin="navbar-mobile" className="mt-2 justify-center">
              Falar no WhatsApp
            </WhatsAppButton>
          </nav>
        </Container>
      ) : null}
    </header>
  );
}
