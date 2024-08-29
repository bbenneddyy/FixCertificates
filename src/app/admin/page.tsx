import FilterParticipantsList from "@/components/FilterParticipants/FilterParticipantList";
import FilterParticipantsControl from "@/components/FilterParticipants/FilterParticipantsControls";
import FilterParticipantsPage from "@/components/FilterParticipants/FilterParticipantsPage";
import { fetchInvoicesPages } from "@/utils/data";

export const dynamic = "force-dynamic";

export default async function Admin({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    status?: string;
  };
}) {
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages, participantData } = await fetchInvoicesPages(
    query,
    currentPage
  );

  return (
    <div>
      <FilterParticipantsControl />
      <hr className="m-3" />
      <FilterParticipantsList
        participants={participantData}
        query={query}
        status={status}
      />
      <FilterParticipantsPage totalPages={totalPages} />
    </div>
  );
}
