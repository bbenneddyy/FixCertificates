"use client";

import { useSearchParams } from "next/navigation";

export default async function FilterParticipantsPage({
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
    <div className="flex items-center justify-center space-x-6 text-sm">
      <a
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`px-2 py-1 rounded ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500 hover:bg-blue-100"
        }`}
      >
        Previous
      </a>
      {allPages.map((page, index) => (
        <a
          key={index}
          href={page === "..." ? "#" : createPageUrl(page)}
          className={`px-2 py-1 rounded ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : page === "..."
              ? "text-gray-400 cursor-default"
              : "text-blue-500 hover:bg-blue-100"
          }`}
        >
          {page}
        </a>
      ))}
      <a
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`px-2 py-1 rounded ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500 hover:bg-blue-100"
        }`}
      >
        Next
      </a>
    </div>
  );
}
