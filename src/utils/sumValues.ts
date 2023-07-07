import type { Decimal } from "@prisma/client/runtime";
import { decimalToFloat } from "./decimalToFloat";

export const sumValues = (
  arr: { value: Decimal; count?: number }[]
): number => {
  const sum = arr.reduce(
    (acc: number, curr: { value: Decimal; count?: number }) => {
      return curr.count
        ? acc + decimalToFloat(curr.value) * 100 * curr.count
        : acc + decimalToFloat(curr.value) * 100;
    },
    0
  );
  return sum / 100;
};
