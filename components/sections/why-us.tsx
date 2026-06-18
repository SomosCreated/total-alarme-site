import { Award, HeartHandshake, Bike, Wrench, Cpu, Users, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { whyUs } from "@/content/site";

const icons: Record<string, LucideIcon> = {
  award: Award, "heart-handshake": HeartHandshake, bike: Bike, wrench: Wrench, cpu: Cpu, users: Users,
};

export function WhyUs() {
  return (
    <Section id="por-que" className="bg-surface/50">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-brand">Por que a Total Alarme</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Tradição que cuida, tecnologia que protege.
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((d) => {
          const Icon = icons[d.icon] ?? Award;
          return (
            <Reveal key={d.title}>
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
