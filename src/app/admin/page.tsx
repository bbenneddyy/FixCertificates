import FilterParticipantsList from "@/components/FilterParticipants/FilterParticipantList";
import FilterParticipantsControl from "@/components/FilterParticipants/FilterParticipantsControls";

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
  return (
    <div>
      <FilterParticipantsControl />
      <hr className="m-3" />
      <FilterParticipantsList query={query} status={status} />
    </div>
  );
}
