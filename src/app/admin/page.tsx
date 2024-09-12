import FilterParticipantsList from "@/components/FilterParticipants/FilterParticipantList";
import FilterParticipantsControl from "@/components/FilterParticipants/FilterParticipantsControls";

export const dynamic = "force-dynamic";

export default async function Admin({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    status?: string;
    place?: string;
  };
}) {
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const place = searchParams?.place || "";
  return (
    <div>
      <FilterParticipantsControl />
      <hr className="m-3" />
      <FilterParticipantsList query={query} status={status} place={place} />
    </div>
  );
}
