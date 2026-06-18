import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ui/theme-toggle";

describe("ThemeToggle", () => {
  it("renderiza um botão acessível de troca de tema", () => {
    render(
      <ThemeProvider attribute="class">
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByRole("button", { name: /tema/i })).toBeInTheDocument();
  });
});
