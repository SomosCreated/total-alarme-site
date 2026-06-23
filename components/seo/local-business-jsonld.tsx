import { siteConfig } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SecuritySystemService",
    name: "Total Alarme",
    description:
      "Monitoramento de alarmes 24 horas, atendimento tático presencial e assistência técnica em Balneário Piçarras, Barra Velha e Penha, no litoral norte de Santa Catarina.",
    slogan: "Monitoramos. Protegemos. Cuidamos.",
    image: `${siteConfig.siteUrl}/opengraph-image.png`,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    areaServed: siteConfig.cities.map((c) => ({ "@type": "City", name: c })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barra Velha",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    sameAs: [siteConfig.instagram],
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
