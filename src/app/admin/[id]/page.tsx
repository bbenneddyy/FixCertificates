import { db } from "@/utils/db";
import Image from "next/image";
import UpdateStatusButtons from "@/components/Buttons/UpdateStatusButtons";

export const dynamic = "force-dynamic";

async function getRegisteredUser(id: string) {
  try {
    const registeredUser = await db.registration.findUnique({
      where: {
        id,
      },
    });
    return registeredUser;
  } catch (e) {
    return null;
  }
}

export default async function ApprovePage({ params }: { params: { id: string }; }) {
  const registeredUser = await getRegisteredUser(params.id);
  if (!registeredUser) {
    return (
      <div>
        <p className="text-center p-2 m-2">
          ไม่พบข้อมูล หรือ เกิดข้อผิดพลาดในการทำงาน
        </p>
        <p className="text-center font-bold">404 not found</p>
      </div>
    );
  }
  return (
    <div>
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
            {registeredUser.id &&
              <Image
                src={`/api/images/${registeredUser.id}.${registeredUser.file_type}`}
                alt="slip"
                className="rounded-md shadow-md"
                width={250}
                height={250}
                unoptimized
              />
            }
          </div>
          <div className="flex justify-around mt-4">
            <UpdateStatusButtons id={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
