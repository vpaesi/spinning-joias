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
    // @ts-expect-error: mockClear may not exist on fetch, but we need to clear the mock for tests
    global.fetch.mockClear();
    delete (global as unknown as { fetch?: unknown }).fetch;
  });

  it("deve retornar estado inicial", () => {
    const { result } = renderHook(() => useProdutos());
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("erro");
  });
});
