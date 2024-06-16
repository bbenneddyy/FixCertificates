"use server";

import { db } from "@/utils/db";
import { formSchema } from "./schema";
import { sendMail } from "./mail";
import { writeFile } from "fs/promises";
import path from "path";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// prevState is required. Please do not delete
export async function createParticipant(
  prevState: { message: string },
  formData: FormData
) {
  // Parse data
  const parse = formSchema.safeParse({
    education: formData.get("education"),
    title: formData.get("title"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    reason: formData.get("reason") || "",
    slip: formData.get("slip") as File,
  });

  if (!parse.success) {
    return { message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง" };
  }

  const data = parse.data;
  const fileType = data.slip?.type.split("/")[1];

  try {
    const newRegistration = await db.registration.create({
      data: {
        education: data.education,
        title: data.title,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        reason: data.reason,
        file_type: fileType
      },
    });

    const content = `${newRegistration.id}.${fileType}`;

    const buffer = Buffer.from(await data.slip?.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), `public/assets/${content}`),
      buffer
    );

    sendMail({
      to: `${data.email}`,
      subject: "ยืนยันการส่งข้อมูลเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34",
      name: `${data.firstname}`,
    });

    return { message: `${data.email} สมัครสำเร็จ` };

  } catch (e) {
    console.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return { message: "ไม่สามารถใช้ข้อมูลซ้ำได้" };
    }
    return {
      message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง",
    };
  }

}
