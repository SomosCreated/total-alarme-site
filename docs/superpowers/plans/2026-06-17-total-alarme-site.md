# Total Alarme — Site Institucional — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um site institucional one-page (PT-BR) para a Total Alarme em Next.js, com light/dark mode, conversão WhatsApp-first, tracking GTM+GA4+Pixel sob Consent Mode v2, e Core Web Vitals no topo.

**Architecture:** Next.js App Router gerado estático (SSG), servido pela Vercel. Conteúdo isolado em módulo tipado. Tema via `next-themes` (classe no `<html>` + tokens CSS). Conversão por deep links `wa.me`/`tel:` com eventos no `dataLayer`. GTM carregado via `@next/third-parties`, com consentimento LGPD negado por padrão até o aceite.

**Tech Stack:** Next.js (App Router) + React + TypeScript · Tailwind CSS v4 · lucide-react · next-themes · @next/third-parties · Vitest + Testing Library (unit/componente) · Playwright (E2E).

**Convenção de commits:** todo commit termina com o trailer:
```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

**Spec de referência:** [docs/superpowers/specs/2026-06-17-total-alarme-site-design.md](../specs/2026-06-17-total-alarme-site-design.md)

---

## Estrutura de arquivos

```
total-alerme-site/
├── app/
│   ├── layout.tsx              # html/body, fontes, providers, metadata, GTM, JSON-LD
│   ├── page.tsx                # home one-page (compõe as seções)
│   ├── globals.css             # Tailwind v4 + tokens light/dark
│   ├── privacidade/page.tsx    # política de privacidade (LGPD)
│   ├── sitemap.ts              # sitemap
│   └── robots.ts               # robots
├── components/
│   ├── providers.tsx           # ThemeProvider (next-themes)
│   ├── analytics/
│   │   ├── consent-init.tsx    # Consent Mode v2 default (beforeInteractive)
│   │   └── consent-banner.tsx  # banner LGPD
│   ├── cta/
│   │   ├── whatsapp-button.tsx # CTA WhatsApp (variantes)
│   │   └── floating-whatsapp.tsx
│   ├── sections/
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── trust-strip.tsx
│   │   ├── about.tsx
│   │   ├── services.tsx
│   │   ├── how-it-works.tsx
│   │   ├── why-us.tsx
│   │   ├── values.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   └── ui/
│       ├── container.tsx
│       ├── section.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── logo.tsx
│       ├── theme-toggle.tsx
│       └── reveal.tsx
├── content/
│   └── site.ts                 # TODO o conteúdo, tipado
├── lib/
│   ├── site-config.ts          # env vars + dados de contato
│   ├── links.ts                # whatsappUrl(), telHref()
│   ├── analytics.ts            # dataLayer push + trackWhatsApp/trackCall
│   └── use-section-view.ts     # hook IntersectionObserver
├── test/
│   └── setup.ts                # setup Vitest (jest-dom, matchMedia, dataLayer)
├── e2e/
│   └── site.spec.ts            # Playwright
├── .env.example
├── vitest.config.ts
├── playwright.config.ts
└── ...
```

---

## Task 1: Scaffold do projeto + tooling de testes

**Files:**
- Create: projeto Next.js completo na raiz `total-alerme-site/`
- Create: `vitest.config.ts`, `test/setup.ts`, `playwright.config.ts`, `.env.example`
- Test: `lib/__tests__/smoke.test.ts`

- [ ] **Step 1: Scaffold Next.js na raiz do projeto**

Run (a partir de `projetos-created/total-alerme-site`, diretório vazio):
```bash
npx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --use-npm --yes
```
Expected: cria `app/`, `package.json`, `tsconfig.json`, `app/globals.css` com Tailwind v4, `next.config.ts`.

- [ ] **Step 2: Instalar dependências**

Run:
```bash
npm i next-themes lucide-react @next/third-parties
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test
npx playwright install chromium
```
Expected: instala sem erros.

- [ ] **Step 3: Configurar Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**"],
  },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

Create `test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
  window.localStorage.clear();
});
```

- [ ] **Step 4: Configurar Playwright**

Create `playwright.config.ts`:
```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  use: { baseURL: "http://localhost:3100", trace: "on-first-retry" },
  webServer: {
    command: "npm run build && npm run start -- -p 3100",
    url: "http://localhost:3100",
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 5: Adicionar scripts de teste ao package.json**

Modify `package.json` (campo `"scripts"`), garantindo estas entradas:
```json
"test": "vitest run",
"test:watch": "vitest",
"e2e": "playwright test"
```

- [ ] **Step 6: Criar `.env.example`**

Create `.env.example`:
```
# Número de WhatsApp em E.164, só dígitos (ex.: 5547999999999)
NEXT_PUBLIC_WHATSAPP_NUMBER=5547999999999
# Telefone fixo para clique-pra-ligar
NEXT_PUBLIC_PHONE=+554724410800
# Container GTM (deixe vazio para não carregar)
NEXT_PUBLIC_GTM_ID=
# URL canônica do site
NEXT_PUBLIC_SITE_URL=https://totalalarme.com.br
```

- [ ] **Step 7: Smoke test**

Create `lib/__tests__/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("toolchain", () => {
  it("runs vitest", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 8: Rodar o smoke test**

Run: `npm test`
Expected: PASS (1 teste).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold next.js app with vitest and playwright

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Tokens de design + tema (light/dark) + fontes

**Files:**
- Modify: `app/globals.css`
- Create: `components/providers.tsx`
- Modify: `app/layout.tsx`
- Test: `components/ui/__tests__/theme.test.tsx` (criado na Task 7; aqui só validamos layout via build)

- [ ] **Step 1: Definir tokens e tema no globals.css**

Replace todo o conteúdo de `app/globals.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --brand: #e30613;
  --brand-strong: #b8050f;
  --ink: #0b0b0c;
  --bg: #ffffff;
  --surface: #fafafa;
  --card: #ffffff;
  --fg: #0b0b0c;
  --muted: #6b7280;
  --border: #ececed;
}

.dark {
  --bg: #0a0a0b;
  --surface: #141417;
  --card: #141417;
  --fg: #f4f4f5;
  --muted: #9aa0a6;
  --border: #262629;
}

@theme inline {
  --color-brand: var(--brand);
  --color-brand-strong: var(--brand-strong);
  --color-ink: var(--ink);
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-card: var(--card);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --font-sans: var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif;
  --radius-pill: 999px;
}

* { border-color: var(--border); }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--fg); font-family: var(--font-sans); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2: Criar o ThemeProvider**

Create `components/providers.tsx`:
```tsx
"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Atualizar o root layout com fonte e providers**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Total Alarme",
  description: "Monitoramento de alarmes 24 horas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="bg-bg text-fg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verificar o build**

Run: `npm run build`
Expected: build conclui sem erros de tipo/CSS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, light/dark theme and fonts

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Config do site + módulo de conteúdo

**Files:**
- Create: `lib/site-config.ts`
- Create: `content/site.ts`
- Test: `lib/__tests__/site-config.test.ts`

- [ ] **Step 1: Escrever o teste do site-config**

Create `lib/__tests__/site-config.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("expõe número de whatsapp só com dígitos", () => {
    expect(siteConfig.whatsappNumber).toMatch(/^\d{12,13}$/);
  });
  it("expõe telefone e e-mail de contato", () => {
    expect(siteConfig.phone).toContain("+55");
    expect(siteConfig.email).toContain("@");
  });
});
```

- [ ] **Step 2: Rodar o teste (deve falhar)**

Run: `npm test -- site-config`
Expected: FAIL (módulo não existe).

- [ ] **Step 3: Implementar o site-config**

Create `lib/site-config.ts`:
```ts
export const siteConfig = {
  name: "Total Alarme",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5547999999999",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+554724410800",
  phoneDisplay: "(47) 2441-0800",
  email: "total@totalalarme.com.br",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://totalalarme.com.br",
  cities: ["Barra Velha", "Piçarras", "São João do Itaperiú"],
  instagram: "https://instagram.com/totalalarme",
} as const;
```

- [ ] **Step 4: Rodar o teste (deve passar)**

Run: `npm test -- site-config`
Expected: PASS.

- [ ] **Step 5: Escrever o módulo de conteúdo**

Create `content/site.ts` (copy do cliente preservada, sem travessão):
```ts
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  featured?: boolean;
}
export interface Step { title: string; description: string; }
export interface Differentiator { icon: string; title: string; description: string; }
export interface FaqItem { q: string; a: string; }

export const nav = {
  links: [
    { href: "#servicos", label: "Serviços" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#quem-somos", label: "Quem somos" },
    { href: "#contato", label: "Contato" },
  ],
};

export const hero = {
  badge: "A continuidade da Tele Alarme",
  title: "Sua segurança merece presença quando realmente importa.",
  subtitle:
    "Monitoramento 24 horas, atendimento tático presencial e assistência técnica especializada por uma equipe que conhece o mercado de segurança da nossa região há décadas.",
  chips: ["24 horas por dia", "Atendimento tático", "Assistência própria"],
};

export const stats = [
  { value: "24h", label: "Monitoramento por dia" },
  { value: "Tático", label: "Atendimento presencial" },
  { value: "Própria", label: "Assistência técnica" },
  { value: "Décadas", label: "De experiência" },
];

export const about = {
  title: "Quem somos",
  lead: "A tradição da segurança, preparada para o futuro.",
  paragraphs: [
    "A Total Alarme é uma empresa de monitoramento eletrônico criada por profissionais que dedicaram grande parte de suas vidas à segurança eletrônica.",
    "Fazem parte deste projeto colaboradores que ajudaram a construir uma trajetória de confiança no mercado regional, incluindo o filho do fundador da antiga Tele Alarme e diversos profissionais que fizeram parte daquela história.",
    "Somos uma empresa familiar que acredita que tecnologia é importante, mas que nada substitui o atendimento humano quando o cliente realmente precisa.",
  ],
};

export const services: ServiceItem[] = [
  {
    icon: "radar",
    title: "Monitoramento de Alarmes 24 Horas",
    description:
      "Sua residência ou empresa protegida todos os dias do ano através de uma central preparada para agir rapidamente diante de qualquer ocorrência.",
    bullets: [
      "Monitoramento 24 horas por dia",
      "Recebimento instantâneo dos eventos do sistema",
      "Acionamento imediato dos responsáveis",
      "Registro completo das ocorrências",
      "Acompanhamento permanente do funcionamento do sistema",
    ],
  },
  {
    icon: "bike",
    title: "Atendimento Tático Presencial",
    featured: true,
    description:
      "Quando uma ocorrência exige presença física, nossa equipe realiza atendimento no local para verificação e apoio ao cliente.",
    bullets: [
      "Verificação presencial da ocorrência",
      "Apoio imediato ao cliente",
      "Atendimento rápido e profissional",
      "Maior tranquilidade para você",
    ],
  },
  {
    icon: "wrench",
    title: "Assistência Técnica Especializada",
    description:
      "Prestamos assistência técnica para todos os equipamentos instalados pela Total Alarme.",
    bullets: [
      "Manutenção preventiva",
      "Manutenção corretiva",
      "Atualizações de equipamentos",
      "Configurações e ajustes",
      "Suporte técnico especializado",
    ],
  },
  {
    icon: "smartphone",
    title: "Aplicativo de Controle",
    description: "Tenha o controle da sua segurança na palma da mão.",
    bullets: [
      "Arme e desarme seu sistema remotamente",
      "Receba notificações em tempo real",
      "Consulte eventos do alarme",
      "Gerencie usuários autorizados",
      "Acompanhe tudo pelo celular",
    ],
  },
];

export const howItWorks: Step[] = [
  { title: "O alarme dispara", description: "Seu sistema detecta a ocorrência e envia o evento na hora." },
  { title: "A central recebe", description: "Nossa central de monitoramento recebe e analisa o evento 24 horas por dia." },
  { title: "Equipe tática no local", description: "Quando necessário, nossa equipe vai até o endereço verificar a ocorrência." },
  { title: "Resolução e registro", description: "Acionamos os responsáveis, apoiamos o cliente e registramos tudo." },
];

export const whyUs: Differentiator[] = [
  { icon: "award", title: "Experiência", description: "Profissionais com ampla vivência no mercado de monitoramento eletrônico." },
  { icon: "heart-handshake", title: "Atendimento próximo", description: "Transparente e baseado na confiança." },
  { icon: "bike", title: "Atendimento tático", description: "Equipe preparada para agir quando necessário." },
  { icon: "wrench", title: "Assistência própria", description: "Suporte especializado para os sistemas instalados pela empresa." },
  { icon: "cpu", title: "Tecnologia confiável", description: "Equipamentos modernos e soluções eficientes." },
  { icon: "users", title: "Atendimento humanizado", description: "Você fala com pessoas que conhecem seu sistema e suas necessidades." },
];

export const mvv = {
  mission:
    "Proteger pessoas, famílias e empresas através de soluções eficientes de monitoramento eletrônico, com atendimento próximo, tecnologia confiável e suporte especializado.",
  vision:
    "Ser referência em monitoramento eletrônico na região, reconhecida pela confiança, excelência operacional e relacionamento duradouro com os clientes.",
  values: [
    "Confiança", "Transparência", "Honestidade", "Responsabilidade",
    "Respeito às pessoas", "Comprometimento", "Excelência no atendimento",
  ],
};

export const contact = {
  title: "Entre em contato",
  lead: "Solicite uma visita e conheça nossas soluções.",
  text: "Nossa equipe está pronta para ajudar você a proteger aquilo que realmente importa.",
};

export const footer = {
  tagline: "Monitoramos. Protegemos. Cuidamos. 24 horas por dia ao seu lado.",
  cnpj: "CNPJ em breve",
};

export const whatsappDefaultMessage =
  "Olá! Gostaria de saber mais sobre o monitoramento da Total Alarme.";
```

- [ ] **Step 6: Rodar a suíte completa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add site config and typed content module

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Utilitários de link e analytics (TDD)

**Files:**
- Create: `lib/links.ts`, `lib/analytics.ts`
- Test: `lib/__tests__/links.test.ts`, `lib/__tests__/analytics.test.ts`

- [ ] **Step 1: Escrever os testes de links**

Create `lib/__tests__/links.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { whatsappUrl, telHref } from "@/lib/links";

describe("whatsappUrl", () => {
  it("usa o número configurado e codifica a mensagem padrão", () => {
    const url = whatsappUrl();
    expect(url).toMatch(/^https:\/\/wa\.me\/\d{12,13}\?text=/);
    expect(url).toContain(encodeURIComponent("Total Alarme"));
  });
  it("codifica uma mensagem custom", () => {
    expect(whatsappUrl("oi & tchau")).toContain(encodeURIComponent("oi & tchau"));
  });
});

describe("telHref", () => {
  it("monta tel: com o telefone configurado", () => {
    expect(telHref()).toBe("tel:+554724410800");
  });
});
```

- [ ] **Step 2: Rodar (deve falhar)**

Run: `npm test -- links`
Expected: FAIL (módulo não existe).

- [ ] **Step 3: Implementar links.ts**

Create `lib/links.ts`:
```ts
import { siteConfig, } from "@/lib/site-config";
import { whatsappDefaultMessage } from "@/content/site";

export function whatsappUrl(message: string = whatsappDefaultMessage): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${siteConfig.phone}`;
}
```

- [ ] **Step 4: Rodar (deve passar)**

Run: `npm test -- links`
Expected: PASS.

- [ ] **Step 5: Escrever os testes de analytics**

Create `lib/__tests__/analytics.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { pushDataLayer, trackWhatsApp, trackCall } from "@/lib/analytics";

type DL = { dataLayer: Record<string, unknown>[] };
const dl = () => (window as unknown as DL).dataLayer;

describe("analytics", () => {
  it("empurra evento genérico no dataLayer", () => {
    pushDataLayer("teste", { a: 1 });
    expect(dl().at(-1)).toEqual({ event: "teste", a: 1 });
  });
  it("trackWhatsApp registra origem", () => {
    trackWhatsApp("hero");
    expect(dl().at(-1)).toEqual({ event: "whatsapp_click", origin: "hero" });
  });
  it("trackCall registra origem", () => {
    trackCall("navbar");
    expect(dl().at(-1)).toEqual({ event: "call_click", origin: "navbar" });
  });
});
```

- [ ] **Step 6: Rodar (deve falhar)**

Run: `npm test -- analytics`
Expected: FAIL.

- [ ] **Step 7: Implementar analytics.ts**

Create `lib/analytics.ts`:
```ts
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function pushDataLayer(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}

export function trackWhatsApp(origin: string): void {
  pushDataLayer("whatsapp_click", { origin });
}

export function trackCall(origin: string): void {
  pushDataLayer("call_click", { origin });
}
```

- [ ] **Step 8: Rodar (deve passar)**

Run: `npm test -- analytics`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add link and analytics utilities

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Consentimento LGPD + GTM (Consent Mode v2)

**Files:**
- Create: `components/analytics/consent-init.tsx`, `components/analytics/consent-banner.tsx`
- Modify: `app/layout.tsx`
- Test: `components/analytics/__tests__/consent-banner.test.tsx`

- [ ] **Step 1: Implementar o init de consentimento (default negado)**

Create `components/analytics/consent-init.tsx`:
```tsx
import Script from "next/script";

export function ConsentInit() {
  return (
    <Script id="consent-init" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500
        });
        try {
          if (localStorage.getItem('ta-consent') === 'granted') {
            gtag('consent', 'update', {
              ad_storage: 'granted', ad_user_data: 'granted',
              ad_personalization: 'granted', analytics_storage: 'granted'
            });
          }
        } catch (e) {}
      `}
    </Script>
  );
}
```

- [ ] **Step 2: Escrever o teste do banner**

Create `components/analytics/__tests__/consent-banner.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConsentBanner } from "@/components/analytics/consent-banner";

describe("ConsentBanner", () => {
  it("aparece quando não há preferência salva", () => {
    render(<ConsentBanner />);
    expect(screen.getByRole("dialog", { name: /privacidade/i })).toBeInTheDocument();
  });
  it("ao aceitar, persiste e some", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);
    await user.click(screen.getByRole("button", { name: /aceitar/i }));
    expect(localStorage.getItem("ta-consent")).toBe("granted");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("não aparece quando já há preferência", () => {
    localStorage.setItem("ta-consent", "denied");
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Rodar (deve falhar)**

Run: `npm test -- consent-banner`
Expected: FAIL.

- [ ] **Step 4: Implementar o banner**

Create `components/analytics/consent-banner.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";

type Gtag = (...args: unknown[]) => void;

function updateConsent(granted: boolean) {
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  const value = granted ? "granted" : "denied";
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push([
    "consent",
    "update",
    { ad_storage: value, ad_user_data: value, ad_personalization: value, analytics_storage: value },
  ]);
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("ta-consent")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(granted: boolean) {
    try {
      localStorage.setItem("ta-consent", granted ? "granted" : "denied");
    } catch {}
    updateConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de privacidade"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-5 backdrop-blur-md shadow-lg sm:inset-x-auto sm:right-4 sm:left-4"
    >
      <p className="text-sm text-muted">
        Usamos cookies para medir o desempenho do site e melhorar sua experiência. Você pode aceitar
        ou recusar. Veja a{" "}
        <a href="/privacidade" className="text-brand underline underline-offset-2">
          Política de Privacidade
        </a>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => decide(true)}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong"
        >
          Aceitar
        </button>
        <button
          onClick={() => decide(false)}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition hover:bg-surface"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Rodar (deve passar)**

Run: `npm test -- consent-banner`
Expected: PASS (3 testes).

- [ ] **Step 6: Montar ConsentInit, GTM e banner no layout**

Modify `app/layout.tsx` — adicionar imports e montar. O arquivo final:
```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Providers } from "@/components/providers";
import { ConsentInit } from "@/components/analytics/consent-init";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Total Alarme",
  description: "Monitoramento de alarmes 24 horas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <ConsentInit />
      </head>
      <body className="bg-bg text-fg antialiased">
        <Providers>{children}</Providers>
        <ConsentBanner />
        {siteConfig.gtmId ? <GoogleTagManager gtmId={siteConfig.gtmId} /> : null}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Verificar build + testes**

Run: `npm run build && npm test`
Expected: ambos PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add LGPD consent banner with Consent Mode v2 and GTM

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: Primitivos de UI

**Files:**
- Create: `components/ui/container.tsx`, `components/ui/section.tsx`, `components/ui/card.tsx`, `components/ui/logo.tsx`, `components/ui/reveal.tsx`

- [ ] **Step 1: Container**

Create `components/ui/container.tsx`:
```tsx
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: Section**

Create `components/ui/section.tsx`:
```tsx
import type { ReactNode } from "react";
import { Container } from "./container";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
```

- [ ] **Step 3: Card**

Create `components/ui/card.tsx`:
```tsx
import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  featured = false,
}: {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-7 transition ${
        featured
          ? "border-brand/40 bg-brand/[0.04]"
          : "border-border bg-surface hover:shadow-lg hover:shadow-black/5"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Logo (SVG provisório)**

Create `components/ui/logo.tsx`:
```tsx
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="Total Alarme">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l8 3v7c0 5-3.5 8-8 10-4.5-2-8-5-8-10V5l8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-[17px] font-extrabold tracking-tight">
        total<span className="font-medium text-muted"> alarme</span>
      </span>
    </span>
  );
}
```

- [ ] **Step 5: Reveal (animação respeitando reduced-motion)**

Create `components/ui/reveal.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Verificar build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add UI primitives (container, section, card, logo, reveal)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: Botões de CTA, WhatsApp flutuante e theme toggle (com testes)

**Files:**
- Create: `components/cta/whatsapp-button.tsx`, `components/cta/floating-whatsapp.tsx`, `components/ui/theme-toggle.tsx`
- Test: `components/cta/__tests__/whatsapp-button.test.tsx`, `components/ui/__tests__/theme-toggle.test.tsx`

- [ ] **Step 1: Teste do WhatsAppButton**

Create `components/cta/__tests__/whatsapp-button.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";

type DL = { dataLayer: Record<string, unknown>[] };

describe("WhatsAppButton", () => {
  it("renderiza link wa.me e dispara evento com a origem", async () => {
    const user = userEvent.setup();
    render(<WhatsAppButton origin="hero">Falar no WhatsApp</WhatsAppButton>);
    const link = screen.getByRole("link", { name: /falar no whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    await user.click(link);
    const dl = (window as unknown as DL).dataLayer;
    expect(dl.at(-1)).toEqual({ event: "whatsapp_click", origin: "hero" });
  });
});
```

- [ ] **Step 2: Rodar (deve falhar)**

Run: `npm test -- whatsapp-button`
Expected: FAIL.

- [ ] **Step 3: Implementar WhatsAppButton**

Create `components/cta/whatsapp-button.tsx`:
```tsx
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/links";
import { trackWhatsApp } from "@/lib/analytics";

type Variant = "primary" | "dark" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  dark: "bg-ink text-white hover:opacity-90",
  outline: "border border-border text-fg hover:bg-surface",
};

export function WhatsAppButton({
  origin,
  children,
  variant = "primary",
  message,
  className = "",
}: {
  origin: string;
  children: ReactNode;
  variant?: Variant;
  message?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp(origin)}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${styles[variant]} ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
```

- [ ] **Step 4: Rodar (deve passar)**

Run: `npm test -- whatsapp-button`
Expected: PASS.

- [ ] **Step 5: Implementar o WhatsApp flutuante**

Create `components/cta/floating-whatsapp.tsx`:
```tsx
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/links";
import { trackWhatsApp } from "@/lib/analytics";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp("floating")}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-strong"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
```

- [ ] **Step 6: Teste do ThemeToggle**

Create `components/ui/__tests__/theme-toggle.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ui/theme-toggle";

describe("ThemeToggle", () => {
  it("renderiza um botão acessível de troca de tema", () => {
    render(
      <ThemeProvider attribute="class">
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByRole("button", { name: /tema/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Rodar (deve falhar)**

Run: `npm test -- theme-toggle`
Expected: FAIL.

- [ ] **Step 8: Implementar ThemeToggle**

Create `components/ui/theme-toggle.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Alternar tema claro e escuro"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg transition hover:bg-surface"
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
```

- [ ] **Step 9: Rodar (deve passar) + suíte completa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add CTA buttons, floating whatsapp and theme toggle

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8: Navbar

**Files:**
- Create: `components/sections/navbar.tsx`

- [ ] **Step 1: Implementar a Navbar**

Create `components/sections/navbar.tsx`:
```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { nav } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-3.5">
        <a href="#topo" aria-label="Início">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:block">
            <WhatsAppButton origin="navbar" variant="primary" className="px-5 py-2.5">
              WhatsApp
            </WhatsAppButton>
          </div>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>
      {open ? (
        <Container className="border-t border-border py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1 text-fg">
                {l.label}
              </a>
            ))}
            <WhatsAppButton origin="navbar-mobile" className="mt-2 justify-center">
              Falar no WhatsApp
            </WhatsAppButton>
          </nav>
        </Container>
      ) : null}
    </header>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add navbar with mobile menu

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 9: Hero (painel vermelho + mockup do app)

**Files:**
- Create: `components/sections/hero.tsx`

- [ ] **Step 1: Implementar o Hero**

Create `components/sections/hero.tsx`:
```tsx
import { Clock, Bike, Wrench, Phone, ShieldCheck, Bell } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { telHref } from "@/lib/links";
import { hero } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

const chipIcons = [Clock, Bike, Wrench];

export function Hero() {
  return (
    <Container className="pt-6">
      <div className="overflow-hidden rounded-[2.5rem] bg-brand p-8 md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_minmax(0,1fr)]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-1.5 text-xs font-medium text-white">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {hero.badge}
            </span>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton origin="hero" variant="dark" className="px-7 py-3.5 text-base">
                Falar no WhatsApp
              </WhatsAppButton>
              <a
                href={telHref()}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {hero.chips.map((chip, i) => {
                const Icon = chipIcons[i] ?? Clock;
                return (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {chip}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mx-auto">
            <AppMockup />
          </div>
        </div>
      </div>
    </Container>
  );
}

function AppMockup() {
  return (
    <div className="w-[230px] rounded-[2rem] border-[7px] border-[#1a1a20] bg-[#0e0e12] p-4 text-white shadow-2xl">
      <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#2a2a31]" />
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold">
          total<span className="font-medium text-[#9aa0a6]"> alarme</span>
        </span>
        <Bell className="h-4 w-4 text-[#9aa0a6]" aria-hidden="true" />
      </div>
      <div className="mb-2.5 rounded-2xl border border-[#26262e] bg-[#15151b] p-4 text-center">
        <span className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-brand/15 text-brand">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-sm font-bold">Sistema armado</p>
        <p className="mt-0.5 flex items-center justify-center gap-1.5 text-xs text-green-500">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Tudo protegido
        </p>
      </div>
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-brand/35 bg-brand/10 p-2.5">
        <Bike className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
        <span className="text-[11px] leading-tight">Disparo na Casa Centro. Equipe tática a caminho.</span>
      </div>
      <div className="flex gap-2">
        <span className="flex-1 rounded-xl border border-[#33333c] py-2 text-center text-[11px] font-medium">Desarmar</span>
        <span className="flex-1 rounded-xl bg-brand py-2 text-center text-[11px] font-medium">Armar</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add hero section with red panel and app mockup

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 10: Trust strip + Quem somos

**Files:**
- Create: `components/sections/trust-strip.tsx`, `components/sections/about.tsx`

- [ ] **Step 1: Trust strip**

Create `components/sections/trust-strip.tsx`:
```tsx
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
```

- [ ] **Step 2: Quem somos**

Create `components/sections/about.tsx`:
```tsx
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
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: add trust strip and about sections

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 11: Serviços

**Files:**
- Create: `components/sections/services.tsx`

- [ ] **Step 1: Implementar Serviços**

Create `components/sections/services.tsx`:
```tsx
import { Radar, Bike, Wrench, Smartphone, Check, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/content/site";

const icons: Record<string, LucideIcon> = { radar: Radar, bike: Bike, wrench: Wrench, smartphone: Smartphone };

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
```

- [ ] **Step 2: Build + commit**

Run: `npm run build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: add services section

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 12: Como funciona + Por que escolher

**Files:**
- Create: `components/sections/how-it-works.tsx`, `components/sections/why-us.tsx`

- [ ] **Step 1: Como funciona (passos numerados)**

Create `components/sections/how-it-works.tsx`:
```tsx
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
```

- [ ] **Step 2: Por que escolher (grid de diferenciais)**

Create `components/sections/why-us.tsx`:
```tsx
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
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: add how-it-works and why-us sections

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 13: Missão/Visão/Valores + Contato

**Files:**
- Create: `components/sections/values.tsx`, `components/sections/contact.tsx`

- [ ] **Step 1: Missão / Visão / Valores**

Create `components/sections/values.tsx`:
```tsx
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
```

- [ ] **Step 2: Contato (CTA final + região)**

Create `components/sections/contact.tsx`:
```tsx
import { Phone, Mail, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { telHref } from "@/lib/links";
import { trackCall } from "@/lib/analytics";
import { contact } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <Section id="contato">
      <div className="overflow-hidden rounded-[2.5rem] bg-brand p-8 text-white md:p-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{contact.lead}</h2>
          <p className="mt-4 text-white/90">{contact.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton origin="contato" variant="dark" className="px-7 py-3.5 text-base">
              Falar no WhatsApp
            </WhatsAppButton>
            <a
              href={telHref()}
              onClick={() => trackCall("contato")}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3.5 text-base font-medium transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" /> {siteConfig.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {siteConfig.cities.join(", ")} e região
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: add values and contact sections

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 14: Footer

**Files:**
- Create: `components/sections/footer.tsx`

- [ ] **Step 1: Implementar o Footer**

Create `components/sections/footer.tsx`:
```tsx
import { Instagram, Phone, Mail } from "lucide-react";
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
                  <Instagram className="h-4 w-4" aria-hidden="true" /> Instagram
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
```

- [ ] **Step 2: Build + commit**

Run: `npm run build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: add footer

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 15: Composição da home + tracking de seção

**Files:**
- Create: `lib/use-section-view.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Hook de visualização de seção**

Create `lib/use-section-view.ts`:
```ts
"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";

export function useSectionView(sectionId: string, event: string) {
  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          pushDataLayer(event, { section: sectionId });
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sectionId, event]);
}
```

- [ ] **Step 2: Componente client de tracking de seções**

Create `components/analytics/section-tracker.tsx`:
```tsx
"use client";

import { useSectionView } from "@/lib/use-section-view";

export function SectionTracker() {
  useSectionView("servicos", "view_servicos");
  useSectionView("contato", "view_contato");
  return null;
}
```

- [ ] **Step 3: Compor a home**

Replace `app/page.tsx`:
```tsx
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyUs } from "@/components/sections/why-us";
import { Values } from "@/components/sections/values";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { FloatingWhatsApp } from "@/components/cta/floating-whatsapp";
import { SectionTracker } from "@/components/analytics/section-tracker";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="topo">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Values />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <SectionTracker />
    </>
  );
}
```

- [ ] **Step 4: Subir o dev e conferir visualmente**

Run: `npm run dev`
Expected: home renderiza todas as seções; toggle de tema funciona; banner LGPD aparece; CTAs apontam para `wa.me`/`tel:`. Encerre o dev depois (Ctrl+C).

- [ ] **Step 5: Build + commit**

Run: `npm run build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: compose home page with section view tracking

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 16: Página de Privacidade (LGPD)

**Files:**
- Create: `app/privacidade/page.tsx`

- [ ] **Step 1: Implementar a página**

Create `app/privacidade/page.tsx`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade | Total Alarme",
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
```

- [ ] **Step 2: Build + commit**

Run: `npm run build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: add privacy policy page

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 17: SEO (metadata, JSON-LD, sitemap, robots)

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/seo/local-business-jsonld.tsx`, `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Metadata rica no layout**

Modify o `export const metadata` em `app/layout.tsx` para:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Total Alarme | Monitoramento de alarmes 24h em Barra Velha e região",
    template: "%s | Total Alarme",
  },
  description:
    "Monitoramento de alarmes 24 horas, atendimento tático presencial e assistência técnica própria. A tradição da Tele Alarme, agora Total Alarme.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.siteUrl,
    siteName: "Total Alarme",
    title: "Total Alarme | Monitoramento de alarmes 24h",
    description:
      "Monitoramento 24h, atendimento tático presencial e assistência técnica própria na sua região.",
  },
  alternates: { canonical: siteConfig.siteUrl },
};
```

- [ ] **Step 2: JSON-LD LocalBusiness**

Create `components/seo/local-business-jsonld.tsx`:
```tsx
import { siteConfig } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SecuritySystemService",
    name: "Total Alarme",
    image: `${siteConfig.siteUrl}/og.png`,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: siteConfig.cities.map((c) => ({ "@type": "City", name: c })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Monte-o no `<body>` do `app/layout.tsx` (antes de `</body>`):
```tsx
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
// ...dentro do body, após {children} providers:
<LocalBusinessJsonLd />
```

- [ ] **Step 3: sitemap + robots**

Create `app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.siteUrl, priority: 1 },
    { url: `${siteConfig.siteUrl}/privacidade`, priority: 0.3 },
  ];
}
```

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/privacidade" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Build + commit**

Run: `npm run build`
Expected: PASS; rotas `/sitemap.xml` e `/robots.txt` geradas.
```bash
git add -A
git commit -m "feat: add SEO metadata, LocalBusiness JSON-LD, sitemap and robots

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 18: E2E (Playwright)

**Files:**
- Create: `e2e/site.spec.ts`

- [ ] **Step 1: Escrever os testes E2E**

Create `e2e/site.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test.describe("Total Alarme — home", () => {
  test("renderiza seções-chave e CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/segurança/i);
    await expect(page.locator("#servicos")).toBeVisible();
    await expect(page.locator("#contato")).toBeVisible();
    const wpp = page.getByRole("link", { name: /falar no whatsapp/i }).first();
    await expect(wpp).toHaveAttribute("href", /wa\.me/);
  });

  test("banner de consentimento aparece e some ao aceitar", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: /privacidade/i });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /aceitar/i }).click();
    await expect(dialog).toBeHidden();
  });

  test("toggle de tema adiciona a classe dark no html", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await page.getByRole("button", { name: /tema/i }).click();
    await expect(html).toHaveClass(/dark/);
  });

  test("botão flutuante do whatsapp aponta para wa.me", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[aria-label="Falar no WhatsApp"]')).toHaveAttribute("href", /wa\.me/);
  });

  test("página de privacidade abre", async ({ page }) => {
    await page.goto("/privacidade");
    await expect(page.getByRole("heading", { name: /política de privacidade/i })).toBeVisible();
  });
});
```

- [ ] **Step 2: Rodar os E2E**

Run: `npm run e2e`
Expected: PASS (5 testes). O `webServer` faz build+start automaticamente.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test: add playwright e2e covering critical flows

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 19: Verificação final de performance e acessibilidade

**Files:**
- Modify: conforme achados (contraste, alt, etc.)

- [ ] **Step 1: Build de produção limpo**

Run: `npm run build`
Expected: zero erros/avisos de tipo; todas as rotas estáticas (○/●), nenhuma rota forçada a dinâmica.

- [ ] **Step 2: Rodar a suíte unit completa**

Run: `npm test`
Expected: todos PASS.

- [ ] **Step 3: Lighthouse local (mobile)**

Run:
```bash
npm run start -- -p 3100 &
npx --yes lighthouse http://localhost:3100 --quiet --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --output=json --output-path=./lighthouse.json
```
Expected: todas as categorias ≥ 0.95. Encerre o server depois. Se alguma falhar, registre o gargalo (ex.: contraste do texto sobre o vermelho, dimensões de imagem) e corrija antes de seguir.

- [ ] **Step 4: Checklist de acessibilidade/contraste**

Verificar manualmente:
- Texto branco sobre `--brand` em títulos grandes (ok); evitar corpo pequeno cinza sobre vermelho.
- Foco visível em links/botões (tab pelo site).
- `prefers-reduced-motion`: animações do `Reveal` desativadas.
Corrigir o que falhar (ex.: aumentar peso/tamanho, trocar cor de texto).

- [ ] **Step 5: Remover artefato do lighthouse e commit final**

Run:
```bash
rm -f lighthouse.json
git add -A
git commit -m "chore: final performance and accessibility pass

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review (preenchido pelo autor do plano)

**1. Cobertura do spec:**
- One-page PT-BR → Tasks 8–15. ✓
- Light/dark → Task 2 + 7 (toggle). ✓
- WhatsApp-first, sem backend → Tasks 4, 7, 9, 13, 15 (CTAs `wa.me`/`tel:`, flutuante). ✓
- GTM+GA4+Pixel + Consent Mode v2 + banner LGPD → Task 5. ✓ (GA4/Pixel são tags configuradas dentro do container GTM; o site fornece o `dataLayer` e o consentimento.)
- Eventos `whatsapp_click`/`call_click`/`view_servicos`/`view_contato` → Tasks 4, 7, 13, 15. ✓
- Performance (SSG, next/font, next/image, scripts deferidos) → Tasks 1–2, 5, 19. ✓
- SEO local (metadata, JSON-LD, sitemap, robots) → Task 17. ✓
- Página de privacidade → Task 16. ✓
- Acessibilidade/reduced-motion → Tasks 6, 19. ✓
- Inputs com placeholders (env) → Tasks 1, 3. ✓

**2. Placeholders proibidos:** nenhum "TODO/TBD/handle edge cases" nos passos; todo passo de código traz o código real. As pendências de conteúdo (logo, número, IDs) são inputs externos documentados, com defaults funcionais.

**3. Consistência de tipos/nomes:** `siteConfig.*`, `whatsappUrl()/telHref()`, `pushDataLayer()/trackWhatsApp()/trackCall()`, classes Tailwind de token (`bg-brand`, `text-fg`, `text-muted`, `bg-surface`, `bg-ink`, `border-border`) e ícones Lucide conferidos entre as tasks. IDs de seção (`servicos`, `contato`, `quem-somos`, `como-funciona`) batem entre `content/site.ts`, as seções e o `SectionTracker`.

**Observações de execução:**
- `next/image` entra quando houver fotos reais; com placeholders, o hero usa só SVG/CSS (zero CLS).
- GA4/Pixel ficam vazios até os IDs chegarem; o `GoogleTagManager` só monta se `NEXT_PUBLIC_GTM_ID` existir.
- Avaliar transformar o projeto em repositório próprio antes do deploy de produção na Vercel.
