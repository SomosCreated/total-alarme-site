import { siteConfig } from "@/lib/site-config";
import { whatsappDefaultMessage } from "@/content/site";

export function whatsappUrl(message: string = whatsappDefaultMessage): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${siteConfig.phone}`;
}
