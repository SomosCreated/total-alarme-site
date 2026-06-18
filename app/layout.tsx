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
