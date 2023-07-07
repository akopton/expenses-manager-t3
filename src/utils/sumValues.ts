import type { Decimal } from "@prisma/client/runtime";
import { decimalToFloat } from "./decimalToFloat";

export const sumValues = (arr: { value: Decimal; count?: number }[]) => {
  return arr.reduce((acc: number, curr: { value: Decimal; count?: number }) => {
    return curr.count
      ? acc + decimalToFloat(curr.value) * curr.count
      : acc + decimalToFloat(curr.value);
  }, 0);
};
