import { Radar, Motorbike, Wrench, Smartphone, Check, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/content/site";

const icons: Record<string, LucideIcon> = { radar: Radar, moto: Motorbike, wrench: Wrench, smartphone: Smartphone };

export function Services() {
  return (
    <Section id="servicos" className="bg-surface/50">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-brand">Nossos serviços</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Proteção completa, do monitoramento ao atendimento no local.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s) => {
          const Icon = icons[s.icon] ?? Radar;
          return (
            <Reveal key={s.title}>
              <Card featured={s.featured} className="h-full">
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      s.featured ? "bg-brand text-white" : "bg-ink text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                </div>
                <p className="mb-5 text-muted">{s.description}</p>
                <ul className="space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 rounded-full bg-brand/15 p-1 text-brand">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span className="text-fg/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
