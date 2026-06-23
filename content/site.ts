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
    { href: "#faq", label: "Dúvidas" },
    { href: "#contato", label: "Contato" },
  ],
};

export const hero = {
  badge: "Equipe com décadas de experiência",
  title: "Sua segurança merece presença quando realmente importa.",
  subtitle:
    "Monitoramento de alarmes 24 horas, atendimento tático no local e assistência técnica própria em Balneário Piçarras, Barra Velha e Penha, por uma equipe que conhece a segurança da região há décadas.",
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
    "A Total Alarme é uma empresa de monitoramento eletrônico criada por profissionais que dedicaram boa parte da vida à segurança eletrônica na nossa região.",
    "Reunimos uma equipe com décadas de atuação em monitoramento de alarmes, reconhecida pelo compromisso, pela responsabilidade e pela dedicação ao cliente.",
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

export const faq: FaqItem[] = [
  { q: "A Total Alarme atende a minha cidade?", a: "Atendemos Balneário Piçarras, Barra Velha, Penha e região do litoral norte de Santa Catarina, com monitoramento 24 horas e atendimento no local." },
  { q: "O que é o atendimento tático presencial?", a: "Quando o alarme dispara e a ocorrência exige presença física, nossa equipe vai até o endereço verificar a situação e dar apoio, em vez de só registrar o evento à distância." },
  { q: "Como funciona o monitoramento 24 horas?", a: "Seu sistema envia os eventos para a nossa central, que acompanha tudo 24 horas por dia. Diante de uma ocorrência, acionamos os responsáveis e, quando necessário, a equipe vai ao local." },
  { q: "Vocês fazem monitoramento residencial e comercial?", a: "Sim. Atendemos residências e empresas de pequeno porte, com soluções adequadas a cada tipo de imóvel." },
  { q: "Preciso trocar meu sistema de alarme atual?", a: "Na maioria dos casos, não. Avaliamos o seu sistema e indicamos a melhor forma de integrá-lo à nossa central. Solicite uma visita e a gente te orienta." },
  { q: "Como faço para contratar?", a: "Fale com a gente pelo WhatsApp ou telefone. Agendamos uma visita, avaliamos o local e apresentamos a solução de monitoramento ideal para você." },
];
