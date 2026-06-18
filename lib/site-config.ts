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
