import React, { Suspense } from 'react'; // Import Suspense from React
import { db } from "@/utils/db";
import Image from "next/image";
import UpdateStatusButtons from "@/components/Buttons/UpdateStatusButtons";
import LoadingEdit from "../../../components/LoadingSkeletons/LoadingEdit";

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

async function getUserAnswers(id: string) {
  try {
    const answers = await db.question.findMany({
      where: {
        participantId: id,
      },
      orderBy: {
        sessionNum: "asc", // Order by session number
      },
    });
    return answers;
  } catch (e) {
    console.error("Error fetching user answers:", e);
    return [];
  }
}

const sessionQuestions: { [key: string]: string } = {
  "1": "แพทย์...ทางเลือกที่ใช่?",
  "2": "ตีแผ่ชีวิต Preclinical clerkship",
  "3": "ตีแผ่ชีวิตแพทย์",
  "4": "หลักสูตรการเรียนแพทย์",
  "5": "การเตรียมตัวสอบเข้าคณะแพทย์",
  "6": "จัดการความเครียดกับการอ่านหนังสือ",
};

export default async function ApprovePage({
  params,
}: {
  params: { id: string };
}) {
  const registeredUser = await getRegisteredUser(params.id);
  const userAnswers = await getUserAnswers(params.id);
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
      <Suspense fallback={<LoadingEdit />}>
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
              {registeredUser.id && (
                <Image
                  src={`/api/images/${registeredUser.id}.${registeredUser.file_type}`}
                  alt="slip"
                  className="rounded-md shadow-md"
                  width={250}
                  height={250}
                  unoptimized
                />
              )}
            </div>
            <div className="flex justify-around mt-4">
              <UpdateStatusButtons id={params.id} />
            </div>
            <div className="mt-6 text-gray-600">
              <p className="mb-2">
                <strong>สิ่งที่แพ้:</strong>{" "}
                <span id="allergy">
                  {registeredUser.allergy ? registeredUser.allergy : "-"}
                </span>
              </p>

              <p className="mb-2">
                <strong>ประเภทการสมัคร:</strong>{" "}
                <span id="place">{registeredUser.place}</span>
              </p>
              <p className="mb-2">
                <strong>เหตุผลที่อยากเข้าร่วม:</strong>{" "}
                <span id="reason">
                  {registeredUser.reason ? registeredUser.reason : "-"}
                </span>
              </p>
              <div className="mt-6">
                <h2 className="font-bold text-xl text-gray-800 mb-4">
                  คำถามในแต่ละ session
                </h2>
                {userAnswers.length === 0 ? (
                  <p>ไม่มีคำถาม</p>
                ) : (
                  userAnswers.map((answer) => (
                    <div key={answer.id} className="mb-4">
                      <p className="mb-1">
                        <strong>
                          {sessionQuestions[answer.sessionNum.toString()]}:
                        </strong>{" "}
                        {answer.question}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
