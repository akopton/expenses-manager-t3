import { decimalToFloat } from "./decimalToFloat";

export const sumValues = (arr: any[]) => {
  console.log(arr[0].count === true);

  return arr.reduce((acc, curr) => {
    return acc + decimalToFloat(curr.value);
  }, 0);
};
