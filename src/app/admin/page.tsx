import prisma from "@/utils/db";
import Link from "next/link";
import { Suspense } from "react";

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
  const registrations = await prisma.registration.findMany();
  return registrations
}

export default async function Admin() {
  const regisData = await getRegistration()
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        {regisData?.map((regis) => (
          <Link href={`/admin/${regis.id}`} key={regis.id}>
            <div className="py-1">
              <p className="py-2 border-2 rounded-md p-2 bg-slate-100">
                {regis.firstname}
              </p>
            </div>
          </Link>
        ))}
      </Suspense>
    </div>
  );
}
