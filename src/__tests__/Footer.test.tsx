import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer";

jest.mock("../utils/scrollToElement", () => ({
  scrollToElement: jest.fn(),
}));

describe("Footer", () => {
  it("limpa a categoria ao retornar à home e aponta os créditos para o site da autora", () => {
    const onHome = jest.fn();
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Footer onHome={onHome} />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("link", { name: "Retornar à página inicial" })
    );
    expect(onHome).toHaveBeenCalledTimes(1);

    expect(screen.getByText(/v\. 3\.0 by/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Vitória de Camargo" })
    ).toHaveAttribute("href", "https://vitoria-de-camargo.vercel.app/");
  });
});
