import { PAGE_SIZE_OPTIONS } from "../utils/constants";

describe("constants", () => {
  it("deve ter valores de constantes", () => {
    expect(PAGE_SIZE_OPTIONS).toEqual([8, 16, 24, 32, 40, 48]);
  });
});
