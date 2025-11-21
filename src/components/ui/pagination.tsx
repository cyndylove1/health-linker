import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { HiArrowSmallRight } from "react-icons/hi2";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between md:flex-row flex-col w-full py-6 px-4">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 text-[var(--black-white-300)] disabled:opacity-40"
      >
        <HiArrowSmallLeft size={18} />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 py-2 md:py-0">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              …
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(Number(page))}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm 
              ${
                currentPage === page
                  ? "bg-[#F2EAFA] text-[#040C55] font-[500]"
                  : "text-[#5C5C5C]"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 text-[var(--black-white-800)] disabled:opacity-40"
      >
        Next
        <HiArrowSmallRight size={18} />
      </button>
    </div>
  );
}
