import AdminNavbar from "@/components/Navbar/AdminNavbar";
import prisma from "@/utils/db";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

interface Registration {
  registration: any;
  id: string;
  education: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  reason: string;
  status: string;
}

async function getRegisteredUser({ params }: { params: { id: string } }) {
  try {
    const registeredUser = await prisma.registration.findUnique({
      where: {
        id: params.id,
      },
    });
    return registeredUser;
  } catch (e) {
    return;
  }
}

export default async function ApprovePage({
  params,
}: {
  params: { id: string };
}) {
  const registeredUser = await getRegisteredUser({ params: { id: params.id } });
  if (!registeredUser) {
    return (
      <div>
        <AdminNavbar />
        <Suspense fallback={<p>Loading...</p>}>
          <p className="text-center p-2 m-2">
            ไม่พบข้อมูล หรือ เกิดข้อผิดพลาดในการทำงาน
          </p>
          <p className="text-center font-bold">404 not found</p>
        </Suspense>
      </div>
    );
  }
  return (
    <div>
      <AdminNavbar />
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-16">
          <div className="w-full max-w-md m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                {registeredUser.firstname} {registeredUser.lastname}
              </h1>
            </div>
            <div className="text-gray-600 mb-4">
              <p className="mb-2">
                <strong>อีเมล:</strong> {registeredUser.email}
              </p>
              <p className="mb-2">
                <strong>ระดับชั้น:</strong> {registeredUser.education}
              </p>
              <p className="mb-2">
                <strong>สถานะ:</strong> {registeredUser.status}
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={`/assets/${registeredUser.id}.${registeredUser.file_type}`}
                alt="slip"
                className="rounded-md shadow-md"
                width={250}
                height={250}
              />
            </div>
            <div className="flex justify-around mt-4">
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Reject
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Accept
              </button>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
