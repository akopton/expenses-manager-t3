export const convertToPln = (value: number) => {
  return value.toFixed(2).replace(".", ",") + " zł";
};
