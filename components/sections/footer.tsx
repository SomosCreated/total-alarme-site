import { Share2, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { nav, footer } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-10 rounded-t-[2.5rem] bg-ink pb-10 pt-16 text-white">
      <Container>
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-3">
          <div>
            <Logo className="text-white [&_.text-muted]:text-white/60" />
            <p className="mt-4 max-w-xs text-sm text-white/60">{footer.tagline}</p>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-medium">Navegação</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-medium">Contato</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden="true" /> {siteConfig.phoneDisplay}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden="true" /> {siteConfig.email}</li>
              <li>
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                  <Share2 className="h-4 w-4" aria-hidden="true" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {year} Total Alarme. {footer.cnpj}.</p>
          <a href="/privacidade" className="transition hover:text-white">Política de Privacidade</a>
        </div>
      </Container>
    </footer>
  );
}
