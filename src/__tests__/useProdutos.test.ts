import { renderHook } from "@testing-library/react";
import { useProdutos } from "../hooks/useProdutos";

describe("useProdutos hook", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;
  });

  afterAll(() => {
jest.restoreAllMocks();
  });

  it("deve retornar estado inicial", () => {
    const { result } = renderHook(() => useProdutos());
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("erro");
  });
});
