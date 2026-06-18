import { describe, it, expect } from "vitest";
import { whatsappUrl, telHref } from "@/lib/links";

describe("whatsappUrl", () => {
  it("usa o número configurado e codifica a mensagem padrão", () => {
    const url = whatsappUrl();
    expect(url).toMatch(/^https:\/\/wa\.me\/\d{12,13}\?text=/);
    expect(url).toContain(encodeURIComponent("Total Alarme"));
  });
  it("codifica uma mensagem custom", () => {
    expect(whatsappUrl("oi & tchau")).toContain(encodeURIComponent("oi & tchau"));
  });
});

describe("telHref", () => {
  it("monta tel: com o telefone configurado", () => {
    expect(telHref()).toBe("tel:+554724410800");
  });
});
