import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { BrandWatermark } from "@/components/ui/brand-motif";
import { about } from "@/content/site";

export function About() {
  return (
    <Section id="quem-somos" className="relative overflow-hidden">
      <BrandWatermark className="pointer-events-none absolute -right-20 -top-10 hidden h-80 w-80 text-brand opacity-[0.05] lg:block" />
      <div className="relative grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wider text-brand">{about.title}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{about.lead}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border">
              <Image
                src="/images/family-safe.jpg"
                alt="Família tranquila e protegida em casa"
                width={1600}
                height={1068}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden w-44 overflow-hidden rounded-2xl border-4 border-bg shadow-xl sm:block">
              <Image
                src="/images/technician.jpg"
                alt="Técnico da equipe Total Alarme ao lado da viatura"
                width={800}
                height={552}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
