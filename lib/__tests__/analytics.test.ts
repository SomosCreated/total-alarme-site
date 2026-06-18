import { describe, it, expect } from "vitest";
import { pushDataLayer, trackWhatsApp, trackCall } from "@/lib/analytics";

type DL = { dataLayer: Record<string, unknown>[] };
const dl = () => (window as unknown as DL).dataLayer;

describe("analytics", () => {
  it("empurra evento genérico no dataLayer", () => {
    pushDataLayer("teste", { a: 1 });
    expect(dl().at(-1)).toEqual({ event: "teste", a: 1 });
  });
  it("trackWhatsApp registra origem", () => {
    trackWhatsApp("hero");
    expect(dl().at(-1)).toEqual({ event: "whatsapp_click", origin: "hero" });
  });
  it("trackCall registra origem", () => {
    trackCall("navbar");
    expect(dl().at(-1)).toEqual({ event: "call_click", origin: "navbar" });
  });
});
