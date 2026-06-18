import { Clock, Bike, Wrench, Phone, ShieldCheck, Bell } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { BrandWatermark } from "@/components/ui/brand-motif";
import { telHref } from "@/lib/links";
import { hero } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

const chipIcons = [Clock, Bike, Wrench];

export function Hero() {
  return (
    <Container className="pt-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand p-8 md:p-14">
        <BrandWatermark className="pointer-events-none absolute -right-10 -top-12 h-72 w-72 text-white opacity-[0.07]" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.25fr_minmax(0,1fr)]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-1.5 text-xs font-medium text-white">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {hero.badge}
            </span>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton origin="hero" variant="dark" className="px-7 py-3.5 text-base">
                Falar no WhatsApp
              </WhatsAppButton>
              <a
                href={telHref()}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {hero.chips.map((chip, i) => {
                const Icon = chipIcons[i] ?? Clock;
                return (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {chip}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mx-auto">
            <AppMockup />
          </div>
        </div>
      </div>
    </Container>
  );
}

function AppMockup() {
  return (
    <div className="w-[230px] rounded-[2rem] border-[7px] border-[#1a1a20] bg-[#0e0e12] p-4 text-white shadow-2xl">
      <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#2a2a31]" />
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold">
          total<span className="font-medium text-[#9aa0a6]"> alarme</span>
        </span>
        <Bell className="h-4 w-4 text-[#9aa0a6]" aria-hidden="true" />
      </div>
      <div className="mb-2.5 rounded-2xl border border-[#26262e] bg-[#15151b] p-4 text-center">
        <span className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-brand/15 text-brand">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-sm font-bold">Sistema armado</p>
        <p className="mt-0.5 flex items-center justify-center gap-1.5 text-xs text-green-500">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Tudo protegido
        </p>
      </div>
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-brand/35 bg-brand/10 p-2.5">
        <Bike className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
        <span className="text-[11px] leading-tight">Disparo na Casa Centro. Equipe tática a caminho.</span>
      </div>
      <div className="flex gap-2">
        <span className="flex-1 rounded-xl border border-[#33333c] py-2 text-center text-[11px] font-medium">Desarmar</span>
        <span className="flex-1 rounded-xl bg-brand py-2 text-center text-[11px] font-medium">Armar</span>
      </div>
    </div>
  );
}
