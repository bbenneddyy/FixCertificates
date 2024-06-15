import { updateUser } from "./actions";
import { useParams } from "next/navigation";
import prisma from "@/db/prisma";

export default async function ApprovePage({
  params,
}: {
  params: { id: string };
}) {
  const updateUserWithId = updateUser.bind(null, Id);
  const res = await prisma.registration.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!res) return <div>Not Found</div>;

  return (
    <div className="w-full flex justify-center font-bold pt-5">
      <div className="py-1">
        <div className="py-2 border-2 rounded-md p-2 bg-slate-100">
          <p>{res.firstname}</p>
          <p>{res.education}</p>
          <p>{res.email}</p>
          <p>{res.status}</p>
        </div>
      </div>
      <form action={updateItem}>
      <label>update สถานะ
      <select
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 max-w-2xl"
            name="education"
          >
            <option>approve</option>
            <option>disapprove</option>
            <option>pending</option>
          </select>
        </label>
        <button
          type="submit"
          className=" bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded-2xl"
          //aria-disabled={pending}
        >
          update status
        </button>
      </form>
    </div>
  );
}
