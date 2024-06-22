import AdminNavbar from "@/components/Navbar/AdminNavbar";
import { db } from "@/utils/db";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

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
}

async function getRegistration(): Promise<IRegistration[]> {
  const registrations = await db.registration.findMany({
    orderBy: [
      {
        status: "asc",
      },
    ],
  });
  return registrations;
}

export default async function Admin() {
  const regisData = await getRegistration();
  return (
    <div>
      <AdminNavbar />
      <Suspense fallback={<p>Loading...</p>}>
        {regisData?.map((regis) => (
          <Link
            href={`/admin/${regis.id}`}
            key={regis.id}
            className="flex justify-center"
          >
            <div className="w-1/2 m-2 border-2 rounded-md p-2 bg-slate-100 flex justify-between">
              <p>{regis.firstname}</p>
              <p>{regis.status}</p>
            </div>
          </Link>
        ))}
      </Suspense>
    </div>
  );
}
