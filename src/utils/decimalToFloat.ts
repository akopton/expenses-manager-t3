import type { Decimal } from "@prisma/client/runtime";

export const decimalToFloat = (num: Decimal) => {
  const string = num.toString();
  const number = parseFloat(string);
  return number;
};
