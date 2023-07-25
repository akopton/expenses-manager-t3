import { useMemo } from "react";
import { replacePolishLetters } from "~/utils/replacePolishLetters";

export const useSearch = <T extends { name: string | null }>(
  data: T[] | undefined,
  searchValue: string
) => {
  const filteredData = useMemo(() => {
    if (data)
      return data.filter((user) => {
        const userName = user.name?.toLowerCase() as string;
        const searchText = searchValue.toLowerCase();
        return replacePolishLetters(userName).includes(
          replacePolishLetters(searchText)
        );
      });
  }, [searchValue, data]);

  return { filteredData };
};
