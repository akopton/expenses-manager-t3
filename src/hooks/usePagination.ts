import { useState } from "react";

export const usePagination = <T>(itemsPerPage: number, data: T[]) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const showPage = (page: number): void => {
    if (page < 1) {
      setCurrentPage(totalPages);
      return;
    }
    if (page > totalPages) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(page);
  };

  return { currentPage, currentItems, showPage, totalPages };
};
