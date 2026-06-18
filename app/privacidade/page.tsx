import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Total Alarme trata seus dados e cookies.",
  robots: { index: false },
};

export default function Privacidade() {
  return (
    <Container className="py-16">
      <Link href="/" className="text-sm text-brand">← Voltar ao início</Link>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Política de Privacidade</h1>
      <div className="mt-6 space-y-4 text-muted">
        <p>
          A Total Alarme respeita a sua privacidade e trata seus dados pessoais de acordo com a Lei
          Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
        </p>
        <h2 className="pt-4 text-xl font-bold text-fg">Dados que coletamos</h2>
        <p>
          Este site não possui formulários de cadastro. O contato acontece por WhatsApp e telefone.
          Coletamos apenas dados de navegação anônimos por meio de cookies de análise, e somente após
          o seu consentimento.
        </p>
        <h2 className="pt-4 text-xl font-bold text-fg">Cookies e medição</h2>
        <p>
          Utilizamos Google Analytics e ferramentas de medição de anúncios para entender o desempenho
          do site. Esses cookies só são ativados quando você aceita no banner de consentimento. Você
          pode recusar sem prejuízo à navegação.
        </p>
        <h2 className="pt-4 text-xl font-bold text-fg">Seus direitos</h2>
        <p>
          Você pode solicitar informações sobre seus dados a qualquer momento pelo e-mail{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
