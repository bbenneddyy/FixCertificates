"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FilterParticipantsPage({
  totalPages,
}: {
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }
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

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `/admin?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center my-8">
      <ul className="flex items-center space-x-2">
        <li>
          <Link
            href={createPageUrl(Math.max(1, currentPage - 1))}
            scroll={false}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Previous
          </Link>
        </li>
        {allPages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Link
                href={createPageUrl(page)}
                scroll={false}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  page === currentPage
                    ? "bg-green-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </Link>
            )}
          </li>
        ))}
        <li>
          <Link
            href={createPageUrl(Math.min(totalPages, currentPage + 1))}
            scroll={false}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
