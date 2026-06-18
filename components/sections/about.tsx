import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { about } from "@/content/site";

export function About() {
  return (
    <Section id="quem-somos">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand">{about.title}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{about.lead}</h2>
        <div className="mt-6 space-y-4 text-left text-base leading-relaxed text-muted md:text-center">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
