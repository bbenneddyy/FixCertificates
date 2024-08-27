"use client";

import { db } from "@/utils/db";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Registration } from "@prisma/client";
interface FilterParticipantsPageProps {
  currentPage: number; // Define currentPage prop
  pageSize: number; // Define pageSize prop
  query: string; // Define query prop
  status: string; // Define status prop
}
// Fetch participants with pagination
async function getParticipants(page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;
    console.log("Fetching participants with:", { skip, limit });

    // Fetch participants with pagination
    const participants = await db.registration.findMany({
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    // Fetch the total count of participants
    const count = await db.registration.count();

    console.log("Fetched participants:", { participants, count });
    return { participants, count };
  } catch (e) {
    console.error("Error fetching participants:", e);
    return { participants: [], count: 0 };
  }
}
// interface Participant {
//   id: string;
//   education: string;
//   title: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   phone: string;
//   allergy: string | null;
//   place: string;
//   reason: string | null;
//   status: string;
//   created_at: Date;
//   file_type: string | null;
// }

export default function FilterParticipantsPage({
  currentPage,
  pageSize,
  query,
  status,
}: FilterParticipantsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [participants, setParticipants] = useState<Registration[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const limit = pageSize; // Use pageSize from props

  useEffect(() => {
    console.log("useEffect triggered"); // Debug log
    async function fetchData() {
      try {
        console.log("Fetching data for page:", currentPage);

        const { participants, count } = await getParticipants(currentPage, limit);

        setParticipants(participants);
        setTotalCount(count);

        console.log("Fetched data:", { currentPage, participants, count });
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }
    fetchData();
  }, [currentPage, query, status, limit]); // Add dependencies

  // Calculate total pages based on total count and limit
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const query = searchParams.get("query") || "";
      const status = searchParams.get("status") || "";
      console.log(`Navigating to page ${newPage}`);
      router.push(`/admin?page=${newPage}&query=${query}&status=${status}`);
    }
  };

  console.log("Component state:", {
    currentPage,
    totalCount,
    limit,
    totalPages,
    participantsLength: participants.length,
  });

  return (
    <div>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            {participant.firstname} {participant.lastname}
          </li>
        ))}
      </ul>
      <div className="pagination-controls">
        <div className="flex justify-center items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
