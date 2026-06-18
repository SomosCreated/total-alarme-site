import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-brand">Como funciona</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Do disparo à resolução, com presença de verdade.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {howItWorks.map((step, i) => (
          <Reveal key={step.title}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7">
              <span className="absolute -right-2 -top-3 text-7xl font-extrabold text-brand/10">{i + 1}</span>
              <div className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
