import FilterParticipantsControl from "@/components/FilterParticipants/FilterParticipantsControls";
import FilterParticipantsList from "@/components/FilterParticipants/FilterParticipantList";
import FilterParticipantsPage from "@/components/FilterParticipants/FilterParticipantsPage";


export default async function Admin({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    status?: string;
    page?: string; // Add page parameter for pagination
  };
}) {
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const page = parseInt(searchParams?.page || "1", 10);
  const pageSize = 2; // Adjust this value as needed
  const skip = (page - 1) * pageSize;

  return (
    <div>
      <FilterParticipantsControl />
      <hr className="m-3" />
      <FilterParticipantsList
        query={query}
        status={status}
        skip={skip}
        take={pageSize}
      />
      <FilterParticipantsPage
        currentPage={page}
        pageSize={pageSize}
        query={query}
        status={status}
      />
    </div>
  );
}
