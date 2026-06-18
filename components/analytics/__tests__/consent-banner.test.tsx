import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConsentBanner } from "@/components/analytics/consent-banner";

describe("ConsentBanner", () => {
  it("aparece quando não há preferência salva", () => {
    render(<ConsentBanner />);
    expect(screen.getByRole("dialog", { name: /privacidade/i })).toBeInTheDocument();
  });
  it("ao aceitar, persiste e some", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);
    await user.click(screen.getByRole("button", { name: /aceitar/i }));
    expect(localStorage.getItem("ta-consent")).toBe("granted");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("não aparece quando já há preferência", () => {
    localStorage.setItem("ta-consent", "denied");
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
