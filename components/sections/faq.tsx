import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { faq } from "@/content/site";

export function Faq() {
  return (
    <Section id="faq" className="bg-surface/50">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-brand">Dúvidas frequentes</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Perguntas que a gente sempre ouve</h2>
        </div>
        <div className="space-y-3">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-card p-5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium list-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <FaqJsonLd />
    </Section>
  );
}

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
