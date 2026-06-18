import { Target, Eye, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { mvv } from "@/content/site";

export function Values() {
  return (
    <Section id="valores">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Target className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-bold">Missão</h3>
          <p className="mt-2 leading-relaxed text-muted">{mvv.mission}</p>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Eye className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-bold">Visão</h3>
          <p className="mt-2 leading-relaxed text-muted">{mvv.vision}</p>
        </div>
      </div>
      <div className="mt-6 rounded-3xl border border-border bg-ink p-8 text-white">
        <h3 className="text-xl font-bold">Valores</h3>
        <ul className="mt-5 flex flex-wrap gap-3">
          {mvv.values.map((v) => (
            <li key={v} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Check className="h-4 w-4 text-brand" aria-hidden="true" />
              {v}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
