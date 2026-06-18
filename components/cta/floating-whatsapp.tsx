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
