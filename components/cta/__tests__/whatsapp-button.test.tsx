import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";

type DL = { dataLayer: Record<string, unknown>[] };

describe("WhatsAppButton", () => {
  it("renderiza link wa.me e dispara evento com a origem", async () => {
    const user = userEvent.setup();
    render(<WhatsAppButton origin="hero">Falar no WhatsApp</WhatsAppButton>);
    const link = screen.getByRole("link", { name: /falar no whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    await user.click(link);
    const dl = (window as unknown as DL).dataLayer;
    expect(dl.at(-1)).toEqual({ event: "whatsapp_click", origin: "hero" });
  });
});
