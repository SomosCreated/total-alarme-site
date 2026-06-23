import { Clock, Motorbike, Wrench, Phone, ShieldCheck, Bell, Menu, User, Lock, LockOpen, ChevronRight, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { BrandWatermark } from "@/components/ui/brand-motif";
import { telHref } from "@/lib/links";
import { hero } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

const chipIcons = [Clock, Motorbike, Wrench];

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
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
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
    <div className="w-[250px] overflow-hidden rounded-[2rem] border-[7px] border-[#1a1a20] bg-[#0e0e12] text-left shadow-2xl">
      <div className="relative bg-[#eceef1]">
        <div className="bg-gradient-to-b from-[#586272] to-[#333b46] px-3 pb-7 pt-3 text-white">
          <div className="flex items-center justify-between">
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            <Logo size={38} />
            <span className="relative">
              <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="absolute -right-2 -top-1.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#e23b3b] px-0.5 text-[10px] font-bold leading-none">
                2
              </span>
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7e9ed] text-[#7b828c]">
              <User className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-tight">Minha Casa</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2fd07a]" />
                Sistema armado
              </p>
              <p className="mt-0.5 text-[11px] text-[#aeb4be]">Armado por João às 22:40</p>
            </div>
          </div>
        </div>

        <div className="relative -mt-4 rounded-t-[18px] bg-[#eceef1] px-3.5 pb-4 pt-4">
          <span className="absolute right-3 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1aa86a] text-white shadow-md">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>

          <p className="text-[17px] font-bold text-[#2b2f36]">Ações</p>
          <div className="mt-2.5 w-[100px] rounded-xl border border-[#e3e6ea] bg-white p-3">
            <Wrench className="h-6 w-6 text-[#34b3a4]" aria-hidden="true" />
            <p className="mt-2 text-xs text-[#6b7280]">Serviços</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[17px] font-bold text-[#2b2f36]">Atividades</p>
            <span className="flex items-center gap-0.5 text-[11px] text-[#5e90c4]">
              Ver todas <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>

          <div className="my-3 flex items-center gap-2">
            <span className="rounded-full border border-[#cfd3d9] px-3 py-0.5 text-[10px] text-[#6b7280]">HOJE</span>
            <span className="h-px flex-1 bg-[#dde0e4]" />
          </div>

          <div className="flex flex-col gap-3">
            <ActivityRow color="#e0a93c" Icon={Lock} label="Armado: João" time="22:40" />
            <ActivityRow color="#4cb3a0" Icon={LockOpen} label="Desarmado: João" time="18:05" />
            <ActivityRow color="#e0a93c" Icon={Lock} label="Armado: Maria" time="07:30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityRow({ color, Icon, label, time }: { color: string; Icon: LucideIcon; label: string; time: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px]"
        style={{ borderColor: color, color }}
      >
        <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs text-[#2b2f36]">{label}</p>
        <p className="text-[11px] text-[#9aa0a8]">{time}</p>
      </div>
    </div>
  );
}
