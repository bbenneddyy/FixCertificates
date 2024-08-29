import FilterParticipantsList from "@/components/FilterParticipants/FilterParticipantList";
import FilterParticipantsControl from "@/components/FilterParticipants/FilterParticipantsControls";
import FilterParticipantsPage from "@/components/FilterParticipants/FilterParticipantsPage";
import { ITEMS_PER_PAGE } from "@/constants/invoices";
import { fetchInvoicesPages } from "@/utils/data";

export const dynamic = "force-dynamic";

export default async function Admin({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    status?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const currentPage = Number(searchParams?.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const { totalPages, participantData } = await fetchInvoicesPages(
    query,
    currentPage,
    ITEMS_PER_PAGE,
    skip
  );

  return (
    <div>
      <FilterParticipantsControl />
      <hr className="m-3" />
      <FilterParticipantsList
        participants={participantData}
        query={query}
        status={status}
        skip={skip}
        take={ITEMS_PER_PAGE}
      />
      <FilterParticipantsPage totalPages={totalPages} />
    </div>
  );
}
