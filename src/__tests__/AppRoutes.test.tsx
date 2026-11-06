import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import { ThemeProvider } from "../context/ThemeProvider";
import { useProdutos } from "../hooks/useProdutos";

jest.mock("../hooks/useProdutos", () => ({
  useProdutos: jest.fn(),
}));
jest.mock("../components/Header", () => ({ __esModule: true, default: () => null }));
jest.mock("../components/Footer", () => ({ __esModule: true, default: () => null }));
jest.mock("../components/BtnBackToTop", () => ({ __esModule: true, default: () => null }));
jest.mock("../pages/Home", () => ({ __esModule: true, default: () => null }));
jest.mock("../pages/ProdutoDetalhes", () => ({ __esModule: true, default: () => null }));
jest.mock("../pages/About", () => ({ __esModule: true, default: () => null }));
jest.mock("../pages/Faq", () => ({ __esModule: true, default: () => null }));

function CurrentPath() {
  const location = useLocation();
  return <output data-testid="current-path">{location.pathname}</output>;
}

describe("rotas antigas do catálogo", () => {
  beforeEach(() => {
    (useProdutos as jest.Mock).mockReturnValue({
      produtos: [],
      loading: false,
      erro: null,
    });
    localStorage.clear();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("redireciona /carrinho para a home sem consumir dados legados", async () => {
    const dadosLegados = JSON.stringify([{ id: 1, quantidade: 2 }]);
    localStorage.setItem("carrinho", dadosLegados);

    render(
      <MemoryRouter
        initialEntries={["/carrinho"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ThemeProvider>
          <AppRoutes />
          <CurrentPath />
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("current-path")).toHaveTextContent("/");
    });
    expect(localStorage.getItem("carrinho")).toBe(dadosLegados);
    expect(
      screen.queryByRole("button", { name: /adicionar ao carrinho|finalizar compra/i })
    ).not.toBeInTheDocument();
  });
});
