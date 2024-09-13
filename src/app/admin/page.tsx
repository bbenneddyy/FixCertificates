import GetCSVButton from "@/components/Buttons/GetCSVButton";
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
    place?: string;
  };
}) {
  const query = searchParams?.query || "";
  const status = searchParams?.status ? searchParams.status.split(",") : [];
  const currentPage = Number(searchParams?.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const { totalPages, participantData } = await fetchInvoicesPages(
    query,
    currentPage,
    ITEMS_PER_PAGE,
    skip
  );
  const place = searchParams?.place || "";

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
        place={place}
      />
      <FilterParticipantsPage totalPages={totalPages} />
    </div>
  );
}
//<FilterParticipantsList query={query} status={status} place={place} />

