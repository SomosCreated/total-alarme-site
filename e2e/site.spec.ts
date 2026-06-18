import { test, expect } from "@playwright/test";

test.describe("Total Alarme - home", () => {
  test("renderiza seções-chave e CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/segurança/i);
    await expect(page.locator("#servicos")).toBeVisible();
    await expect(page.locator("#contato")).toBeVisible();
    const wpp = page.getByRole("link", { name: /falar no whatsapp/i }).first();
    await expect(wpp).toHaveAttribute("href", /wa\.me/);
  });

  test("banner de consentimento aparece e some ao aceitar", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: /privacidade/i });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /aceitar/i }).click();
    await expect(dialog).toBeHidden();
  });

  test("toggle de tema adiciona a classe dark no html", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await page.getByRole("button", { name: /tema/i }).click();
    await expect(html).toHaveClass(/dark/);
  });

  test("botão flutuante do whatsapp aponta para wa.me", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[aria-label="Falar no WhatsApp"]')).toHaveAttribute("href", /wa\.me/);
  });

  test("página de privacidade abre", async ({ page }) => {
    await page.goto("/privacidade");
    await expect(page.getByRole("heading", { name: /política de privacidade/i })).toBeVisible();
  });
});
