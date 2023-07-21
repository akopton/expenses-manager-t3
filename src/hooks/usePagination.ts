import { useEffect, useState } from "react";

/* show grid based on itemsPerPage which is cols * rows in grid, 
when its mobile show only one item per page, total pages is data.length  */

export const usePagination = <T>(itemsPerPage: number, data: T[]) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const totalPages = Math.ceil(data.length / itemsPerPage);

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

  useEffect(() => {
    setTotalPages(() => Math.ceil(data.length / itemsPerPage));
  }, [data, itemsPerPage]);

  useEffect(() => {
    setCurrentItems(() => data.slice(startIndex, endIndex));
  }, [data, currentPage]);

  return { currentPage, currentItems, showPage, totalPages };
};
