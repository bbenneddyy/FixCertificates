import EditInfoForm from "@/components/Forms/EditInfoForm";
import { db } from "@/utils/db";
import { Suspense } from "react";

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

export default async function Edit({ params }: { params: { id: string }; }) {
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
        <Suspense fallback={<p>Loading...</p>}>
            <EditInfoForm id={params.id} registeredUser={registeredUser} />
        </Suspense>
    )
}