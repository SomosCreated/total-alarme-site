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
