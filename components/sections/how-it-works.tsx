import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <div className="mb-12 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-brand">Como funciona</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Do disparo à resolução, com presença de verdade.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Da nossa central ao seu endereço, acompanhamos cada ocorrência de perto, 24 horas por dia.
          </p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-border">
          <Image
            src="/images/monitoring.jpg"
            alt="Central de monitoramento da Total Alarme acompanhando ocorrências 24 horas"
            width={1600}
            height={1067}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {howItWorks.map((step, i) => (
          <Reveal key={step.title}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-brand p-7 text-white">
              <span className="absolute -right-2 -top-3 text-7xl font-extrabold text-white/15">{i + 1}</span>
              <div className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-brand">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{step.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
