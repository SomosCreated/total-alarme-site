import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";

export function NightBand() {
  return (
    <section className="relative my-8 overflow-hidden">
      <Image
        src="/images/home-night.jpg"
        alt="Residência protegida durante a noite"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <Container className="relative py-20 text-center text-white md:py-28">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          Enquanto você descansa, nossa central não descansa.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          Monitoramento 24 horas e equipe tática pronta para agir, todos os dias do ano.
        </p>
        <div className="mt-8 flex justify-center">
          <WhatsAppButton origin="band" variant="primary" className="px-7 py-3.5 text-base">
            Falar com a Total Alarme
          </WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
