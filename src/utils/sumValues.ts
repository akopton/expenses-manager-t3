export const sumPlnValues = (
  arr: { value: number; count?: number }[]
): number => {
  const sum = arr.reduce(
    (acc: number, curr: { value: number; count?: number }) => {
      return curr.count
        ? acc + curr.value * 100 * curr.count
        : acc + curr.value * 100;
    },
    0
  );
  return sum / 100;
};
