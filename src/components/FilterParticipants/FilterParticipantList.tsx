import { db } from "@/utils/db";
import Link from "next/link";

interface IRegistration {

  id: string;
  education: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  reason: string | null;
  status: string;
  place: string;

}

interface FilterParticipantsListProps {
  participants: IRegistration[];
  query: string;
  status: string[];
  skip: number;
  take: number;
  place: string;
}

async function getRegistration(
  query: string,
  status: string | string[],
  skip: number,
  take: number
): Promise<IRegistration[]> {
  const whereClause: any = {
    firstname: {
      contains: query,
    },
  };

  if (Array.isArray(status)) {
    whereClause.status = {
      in: status.filter((s) => s !== ""),
    };
  } else if (status !== "") {
    whereClause.status = {
      contains: status,
    };
  }

  const registrations = await db.registration.findMany({
    where: whereClause,
    orderBy: [
      {
        status: "asc",
      },
    ],
    skip,
    take,
  });
  return registrations;
}

export default async function FilterParticipantsList({
  participants,
  query,
  status,
  skip,
  take,
  place,
}: FilterParticipantsListProps) {
  // Filter participants based on search query
  const searchedParticipants = Array.isArray(participants)
    ? participants.filter((participant) => {
        return participant.firstname.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  // Filter participants based on status and place
  const searchAndFiltered =
    status.length > 0
      ? searchedParticipants.filter((participant) => {
          return (
            status.includes(participant.status) &&
            participant.place.toLowerCase().includes(place.toLowerCase())
          );
        })
      : searchedParticipants;

  return (
    <div className="mt-2">
      {searchAndFiltered.length === 0 ? (
        <p className="w-1/2 mx-auto rounded-md p-2 bg-slate-100">
          No Participants
        </p>
      ) : (
        <div>
          {Array.isArray(participants) && participants.length === 0 && (
            <p className="w-1/2 m-2 border-2 mx-auto rounded-md p-2 bg-slate-100">
              No Participants
            </p>
          )}

          <div>
            {Array.isArray(participants) &&
              searchAndFiltered.map((participant) => (
                <Link
                  href={`/admin/${participant.id}`}
                  key={participant.id}
                  prefetch={false}
                  className="flex justify-center"
                >
                  <div className="w-1/2 m-2 border-2 rounded-md p-2 bg-slate-100 flex justify-between">
                    <p>{participant.firstname}</p>
                    <p
                      className={`ml-4 font-bold ${
                        participant.status === "accepted"
                          ? "text-green-500"
                          : participant.status === "rejected"
                          ? "text-red-700"
                          : "text-gray-500"
                      }`}
                    >
                      {participant.status}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
