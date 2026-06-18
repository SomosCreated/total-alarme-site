# Total Alarme — Site Institucional

Site institucional one-page da **Total Alarme** (monitoramento de alarmes 24h, atendimento tático presencial e assistência técnica), em Next.js, com light/dark mode, conversão WhatsApp-first e tracking GTM + GA4 + Meta Pixel sob Consent Mode v2 (LGPD).

## Stack
- Next.js (App Router) + TypeScript, gerado estático (SSG)
- Tailwind CSS v4 · lucide-react · Plus Jakarta Sans (`next/font`)
- `next-themes` (light/dark) · `@next/third-parties` (GTM)
- Vitest + Testing Library (unit) · Playwright (E2E)

## Desenvolvimento
```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

## Scripts
| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servir o build |
| `npm test` | Testes unitários (Vitest) |
| `npm run e2e` | Testes E2E (Playwright) |
| `npm run lint` | Lint |

## Variáveis de ambiente
| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número do WhatsApp em E.164, só dígitos (ex.: `5547999999999`) |
| `NEXT_PUBLIC_PHONE` | Telefone para clique-pra-ligar (ex.: `+554724410800`) |
| `NEXT_PUBLIC_GTM_ID` | Container GTM (vazio = não carrega) |
| `NEXT_PUBLIC_SITE_URL` | URL canônica (ex.: `https://totalalarme.com.br`) |

## Estrutura
- `app/` — layout, home, `/privacidade`, `sitemap`, `robots`, OG image
- `components/` — `ui/` (primitivos), `cta/` (WhatsApp/ligar), `sections/` (seções da home), `analytics/` (consentimento), `seo/`
- `content/site.ts` — todo o conteúdo, tipado e centralizado
- `lib/` — config, links, analytics, hooks
- `docs/superpowers/` — spec de design e plano de implementação

## Conversão & tracking
CTAs abrem WhatsApp (`wa.me`) e telefone (`tel:`), com eventos no `dataLayer` (`whatsapp_click`, `call_click`, `view_servicos`, `view_contato`). GTM carrega só quando `NEXT_PUBLIC_GTM_ID` está definido; tags de marketing ficam negadas por padrão (Consent Mode v2) até o aceite no banner LGPD.

## Inputs pendentes antes do go-live
Número de WhatsApp real, logo SVG oficial + vermelho calibrado, IDs de GTM/GA4/Pixel, CNPJ, cidades atendidas confirmadas, fotos reais. Todos via env var ou troca de asset, sem alterar a lógica.
