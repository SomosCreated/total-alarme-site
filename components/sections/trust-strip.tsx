import { Container } from "@/components/ui/container";
import { stats } from "@/content/site";

export function TrustStrip() {
  return (
    <Container className="py-10">
      <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border bg-surface px-6 py-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-extrabold tracking-tight text-brand md:text-3xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
