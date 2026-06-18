# Total Alarme — Site Institucional (Design Spec)

- **Data:** 2026-06-17
- **Autor:** Edgar Kretzer (Created) + Claude
- **Status:** Aprovado para plano de implementação
- **Stack-alvo:** Next.js (App Router) + TypeScript, deploy na Vercel

---

## 1. Contexto

A **Total Alarme** é uma empresa nova de **monitoramento eletrônico de alarmes** que resgata o espírito da antiga empresa familiar **Tele Alarme**. Participam do projeto o filho do fundador da Tele Alarme e técnicos veteranos daquela época.

- **Serviço central:** monitoramento de alarmes 24h para clientes **residenciais e comerciais de pequeno porte**.
- **Diferencial (núcleo da comunicação):** **atendimento tático presencial** — quando o alarme dispara, a equipe vai ao local verificar (de moto/viatura). O concorrente regional (VSeg/Vero Suri) deixou de fazer isso. É o gancho emocional e prático do site.
- **Região:** foco em **Barra Velha + litoral** (3 cidades, litoral de SC). Sem setor de vendas nacional. Importa para SEO local e tom de confiança/proximidade.
- **Posicionamento:** tradição + tecnologia, empresa familiar, atendimento humanizado.
- **Contato:** (47) 2441-0800 · total@totalalarme.com.br · domínios `totalalarme.com.br` e `totalalarme.com` (registrados).
- **Marca:** vermelho / preto / branco, emblema em escudo, "total" em condensada pesada (Swiss721 BlkCN) + "alarme" em geométrica (Century Gothic). Tom: tradição encontra tecnologia.

A copy do site já foi escrita pelo cliente (texto humano) e será preservada, com polimento leve. **Restrições de voz:** sem travessão (em-dash), sem padrões de escrita de IA, prosa direta.

## 2. Objetivos

1. Site institucional de **página única** de alta conversão, em PT-BR.
2. Conversão **WhatsApp-first** (sem formulário/backend).
3. **Light + dark mode** com toggle, respeitando preferência do sistema.
4. **Core Web Vitals / PageSpeed no topo** (meta Lighthouse 95+ em todas as categorias).
5. **Traqueamento de conversão pronto:** GTM + GA4 + Meta Pixel, com consentimento LGPD.
6. **Fidelidade à marca:** vermelho/preto/branco + escudo, usando o sistema de design da referência CONDOR adaptado.

## 3. Não-objetivos (YAGNI)

- Sem formulário de lead, banco de dados ou backend de e-mail (conversão é só WhatsApp/telefone).
- Sem CMS — conteúdo estático, estruturado em código (arquivo de conteúdo tipado).
- Sem e-commerce, login de cliente ou app funcional (o "App de Controle" é descrição de feature + mockup ilustrativo).
- Sem multi-idioma (apenas PT-BR).
- Sem blog (por enquanto).

## 4. Stack técnica

| Camada | Escolha |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Renderização | Estático (SSG) — sem dados dinâmicos em runtime |
| Estilo | Tailwind CSS (compilado no build — **não** o runtime CDN do CONDOR) |
| Ícones | `lucide-react` (tree-shaken) |
| Fonte | **Plus Jakarta Sans** via `next/font/google` (self-host) |
| Tema | `next-themes` (classe no `<html>`, sem flash) |
| Tracking | `@next/third-parties` (GTM) + Consent Mode v2 |
| Deploy | Vercel (CDN, domínio `totalalarme.com.br`) |

## 5. Sistema de design (CONDOR adaptado)

### Tokens de cor
- **Vermelho da marca (accent):** `#E30613` *(provisório — calibrar no SVG oficial)*.
- **Tinta/quase-preto:** `~#0B0B0C`. **Grafite (superfície dark):** `~#141417`.
- **Branco / neutros:** branco + `neutral-50/100` (light); `neutral-900/800` (dark).
- **Texto suave:** `neutral-500` (light) / `neutral-400` (dark).

Dois conjuntos de tokens (light/dark) expostos como CSS variables, dirigidos pela classe do `next-themes`.

### Linguagem visual (herdada do CONDOR)
- Cantos bem arredondados (`rounded-[2rem]`/`[2.5rem]`), botões **pílula** com seta.
- Cards com borda fina + hover (sombra/elevação sutil), "glow orbs" discretos.
- Passos numerados com número grande de marca-d'água.
- FAQ com `<details>`/`<summary>` (acordeão nativo, acessível).
- Nav **sticky com blur**; footer **preto com topo arredondado**.
- Mockup de celular no hero (o "App de Controle").

### Hero
- **Painel vermelho cheio** (adaptação direta do bloco lime do CONDOR): título branco, pílula preta de CTA, chips de confiança translúcidos, mockup do app à direita.
- **Diferencial tático embutido no mockup do app** ("equipe tática a caminho").
- *Alternativa registrada:* painel escuro (grafite) com vermelho de accent, ecoando a capa do manual da marca. Decisão atual = painel vermelho.

### Tipografia
- **Plus Jakarta Sans** em todo o corpo/UI (coesão + performance).
- O **logo** carrega a tipografia da marca (vetor oficial).
- *Opcional (decidir na implementação):* uma display condensada apenas nos H1 grandes para ecoar o "total". Default = só Plus Jakarta Sans para minimizar peso de fonte.

## 6. Estrutura da página (one-page ancorada)

Seções na ordem, mapeadas à copy do cliente:

1. **Nav** — logo + âncoras (Serviços, Como funciona, Quem somos) + CTA WhatsApp. Sticky com blur. Toggle de tema.
2. **Hero** — H1 + subtítulo + CTAs (WhatsApp / ligar) + chips + mockup do app.
3. **Régua de confiança** — `24h` · `Atendimento tático` · `Assistência própria` · `Décadas de experiência`.
4. **Quem somos** — continuidade da Tele Alarme, empresa familiar, atendimento humanizado.
5. **Serviços** — 4 cards:
   - Monitoramento de Alarmes 24h
   - Atendimento Tático Presencial *(card de destaque)*
   - Assistência Técnica Especializada
   - Aplicativo de Controle *(com mockup)*
   - Cada card lista os bullets fornecidos pelo cliente.
6. **Como funciona o monitoramento** — passos numerados: alarme dispara → central recebe o evento → **equipe tática vai ao local** → verificação e resolução.
7. **Por que escolher a Total Alarme** — grid de diferenciais (Experiência, Atendimento próximo, Atendimento tático, Assistência própria, Tecnologia confiável, Atendimento humanizado).
8. **Missão · Visão · Valores** — faixa enxuta (3 colunas + lista de valores).
9. **Contato / CTA final** — bloco com WhatsApp + telefone + e-mail + **região atendida** (Barra Velha e litoral). "Solicite uma visita."
10. **Footer** — preto, topo arredondado: contato, navegação, Instagram, aviso LGPD, © + CNPJ *(placeholder até sair)*.

`+` **/privacidade** — página de Política de Privacidade (LGPD).

Conteúdo centralizado em um módulo tipado (ex.: `content/site.ts`) para edição fácil.

## 7. Conversão & tracking

### CTAs (sem formulário)
- **WhatsApp:** `https://wa.me/<NUMERO>?text=<msg pré-preenchida>` — mensagem padrão tipo "Olá! Gostaria de saber mais sobre o monitoramento da Total Alarme."
- **Ligar:** `tel:+554724410800`.
- **Botão WhatsApp flutuante** fixo (canto inferior), presente em todas as telas.
- CTAs repetidos nos pontos-chave (hero, serviços, contato).

### Stack de tags
- **GTM** como container único (permite adicionar tags sem redeploy).
- Dentro do GTM: **GA4** + **Meta Pixel**.
- IDs via env vars (`NEXT_PUBLIC_GTM_ID`, etc.).

### Eventos (`dataLayer`)
- `whatsapp_click` (com origem: hero/serviços/contato/flutuante)
- `call_click`
- `view_servicos`, `view_contato` (IntersectionObserver)
- Marcados como conversão no GA4/Google Ads e como `Lead`/`Contact` no Pixel.

### LGPD
- **Banner de consentimento** + **Consent Mode v2**: `denied` por padrão para `ad_storage`/`analytics_storage`; tags de marketing só disparam após aceite. Preferência persistida (localStorage/cookie).

## 8. Performance (meta: PageSpeed alto)

- **SSG + CDN** — HTML estático, sem trabalho de servidor em runtime.
- `next/font` self-host (sem FOUT/CLS); `next/image` (AVIF/WebP, lazy, dimensões fixas); **logo SVG inline**.
- Tailwind compilado no build (remove o runtime JS do CONDOR); ícones Lucide tree-shaken.
- Scripts de tracking carregados via `@next/third-parties`, **após consentimento/idle**, fora do caminho crítico de render.
- **Metas:** LCP < 2.5s, CLS < 0.1, INP < 200ms, Lighthouse ≥ 95 (Performance/Acessibilidade/Best Practices/SEO).

## 9. SEO

- `metadata` (title/description), OpenGraph + Twitter Card, canonical.
- **JSON-LD `LocalBusiness`** (`SecuritySystemService`): nome, telefone, e-mail, `areaServed` = cidades atendidas, horário 24h.
- `sitemap.xml` + `robots.txt`.
- Conteúdo com palavras-chave locais ("monitoramento de alarmes Barra Velha", etc.) de forma natural.

## 10. Acessibilidade

- HTML semântico, navegação por teclado, estados de foco visíveis.
- Contraste: validar texto sobre o vermelho (preferir branco em títulos grandes; cuidado com texto pequeno preto sobre vermelho).
- `prefers-reduced-motion` respeitado nas animações.
- `aria-label` em botões de ícone; alt em imagens; toggle de tema acessível.

## 11. Configuração / inputs pendentes

Sigo com **placeholders** (env vars) até receber:

| Input | Uso | Placeholder |
|---|---|---|
| Número de WhatsApp (celular, E.164) | `wa.me` + flutuante | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Logo SVG oficial (+ variações) | Nav, footer, OG | Emblema provisório |
| Cidades exatas (Barra Velha + 2) | `areaServed`, seção contato | "Barra Velha e região" |
| Fotos reais (equipe/viatura/instalação) | Hero/seções | Ilustrativo / stock |
| IDs GTM / GA4 / Pixel | Tracking | Env vars vazias |
| O app existe? (links de loja) | Card App de Controle | Mockup "em breve" |
| CNPJ | Footer | Placeholder |
| Vermelho exato da marca | Tokens | `#E30613` |

## 12. Critérios de sucesso

- One-page responsivo, light/dark, fiel à marca e à copy do cliente.
- Todos os CTAs disparam WhatsApp/telefone com eventos rastreados no `dataLayer`.
- GTM + GA4 + Pixel carregando sob Consent Mode v2 com banner LGPD funcional.
- Lighthouse ≥ 95 nas 4 categorias em mobile.
- Deploy na Vercel no domínio `totalalarme.com.br`.
- Conteúdo isolado em módulo tipado, fácil de editar.

## 13. Riscos / observações

- **Contraste do vermelho:** texto pequeno sobre `#E30613` pode falhar em AA. Mitigação: branco para títulos, evitar corpo de texto pequeno sobre vermelho; calibrar no vetor.
- **Número de WhatsApp:** o (47) 2441-0800 é fixo; o `wa.me` exige celular. Bloqueia a conversão principal até confirmar — por isso entra como env var trocável sem redeploy de lógica.
- **CNPJ pendente:** footer com placeholder; trocar quando sair.
- **Monorepo:** o projeto vive em `projetos-created/total-alerme-site` dentro do repo opensquad; avaliar repo próprio antes do deploy de produção.
