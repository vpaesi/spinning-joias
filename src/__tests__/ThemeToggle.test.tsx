import { fireEvent, render, screen } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeProvider } from "../context/ThemeProvider";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("inicia no tema escuro e persiste a mudança escolhida pela pessoa", () => {
    const { unmount } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("button", { name: "Ativar tema claro" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme-preference")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Ativar tema claro" }));

    expect(
      screen.getByRole("button", { name: "Ativar tema escuro" })
    ).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme-preference")).toBe("light");

    unmount();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("button", { name: "Ativar tema escuro" })
    ).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("ignora a preferência antiga salva automaticamente e inicia escuro", () => {
    localStorage.setItem("theme", "light");

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("button", { name: "Ativar tema claro" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme-preference")).toBeNull();
  });
});
