import { useEffect, useState } from "react";

const usePagination = (items) => {
  const [paginationData, setPaginationData] = useState({});
  const [exactPage, setExactPage] = useState(1);

  useEffect(() => {
    const itemsPerPage = 6;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (exactPage - 1) * itemsPerPage;
    const endIndex =
      startIndex + itemsPerPage > items.length
        ? items.length
        : startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setExactPage(newPage);
      }
    };
    const handleNext = () => {
      handlePageChange(exactPage + 1);
    };
    const handlePrevious = () => {
      handlePageChange(exactPage - 1);
    };

    setPaginationData({
      endIndex,
      handleNext,
      handlePrevious,
      handlePageChange,
      currentItems,
      startIndex,
      exactPage,
      totalPages,
      setExactPage,
    });
  }, [items, exactPage]);

  return paginationData;
};
export default usePagination;
