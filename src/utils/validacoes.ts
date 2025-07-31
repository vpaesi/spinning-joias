import { QUANTIDADE_MAXIMA_PRODUTO, QUANTIDADE_MINIMA_PRODUTO } from "./constants";

export function clampQuantity(value: number): number {
  return Math.max(QUANTIDADE_MINIMA_PRODUTO, Math.min(QUANTIDADE_MAXIMA_PRODUTO, value));
}