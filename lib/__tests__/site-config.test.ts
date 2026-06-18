import { describe, it, expect } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("expõe número de whatsapp só com dígitos", () => {
    expect(siteConfig.whatsappNumber).toMatch(/^\d{12,13}$/);
  });
  it("expõe telefone e e-mail de contato", () => {
    expect(siteConfig.phone).toContain("+55");
    expect(siteConfig.email).toContain("@");
  });
});
