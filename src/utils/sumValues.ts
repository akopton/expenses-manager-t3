import { decimalToFloat } from "./decimalToFloat";

export const sumValues = (arr: any[]) => {
  return arr.reduce((acc, curr) => {
    return curr.count
      ? acc + decimalToFloat(curr.value) * curr.count
      : acc + decimalToFloat(curr.value);
  }, 0);
};
