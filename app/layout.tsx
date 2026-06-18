import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Providers } from "@/components/providers";
import { ConsentInit } from "@/components/analytics/consent-init";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Monitoramento de Alarmes 24h em Barra Velha | Total Alarme",
    template: "%s | Total Alarme",
  },
  description:
    "Monitoramento de alarmes 24 horas, atendimento tático no local e assistência técnica própria em Barra Velha e litoral. Fale com a Total Alarme.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.siteUrl,
    siteName: "Total Alarme",
    title: "Monitoramento de Alarmes 24h em Barra Velha | Total Alarme",
    description:
      "Monitoramento de alarmes 24h, atendimento tático no local e assistência técnica própria em Barra Velha e litoral norte de SC.",
  },
  alternates: { canonical: siteConfig.siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="bg-bg text-fg antialiased">
        <ConsentInit />
        <Providers>{children}</Providers>
        <ConsentBanner />
        <LocalBusinessJsonLd />
        {siteConfig.gtmId ? <GoogleTagManager gtmId={siteConfig.gtmId} /> : null}
      </body>
    </html>
  );
}
