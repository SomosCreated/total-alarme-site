"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { BrandWatermark } from "@/components/ui/brand-motif";
import { telHref } from "@/lib/links";
import { trackCall } from "@/lib/analytics";
import { contact } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <Section id="contato">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand p-8 text-white md:p-14">
        <BrandWatermark className="pointer-events-none absolute -left-12 -bottom-16 h-72 w-72 text-white opacity-[0.07]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{contact.lead}</h2>
          <p className="mt-4 text-white/90">{contact.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton origin="contato" variant="dark" className="px-7 py-3.5 text-base">
              Falar no WhatsApp
            </WhatsAppButton>
            <a
              href={telHref()}
              onClick={() => trackCall("contato")}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3.5 text-base font-medium transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" /> {siteConfig.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {siteConfig.cities.join(", ")} e região
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
