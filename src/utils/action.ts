"use server";

import { db } from "@/utils/db";
import { editFormSchema, submitFormSchema } from "./schema";
import { sendMail } from "./mail";
import { writeFile } from "fs/promises";
import path from "path";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { webStatus } from "./config";

// Create Participant
// prevState is required. Please do not delete
export async function createParticipant(
  prevState: { message: string; status: number },
  formData: FormData
) {
  // Close registration
  if (webStatus !== "open") {
    return { message: "ปิดรับสมัครแล้ว", status: 400 };
  }

  // Parse data
  const parse = submitFormSchema.safeParse({
    education: formData.get("education"),
    title: formData.get("title"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    reason: formData.get("reason") || "",
    slip: formData.get("slip") as File,
    sessionOne: formData.get("sessionOne"),
    sessionTwo: formData.get("sessionTwo"),
    sessionThree: formData.get("sessionThree"),
    sessionFour: formData.get("sessionFour"),
    sessionFive: formData.get("sessionFive"),
    sessionSix: formData.get("sessionSix"),
  });

  if (!parse.success) {
    return {
      message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง",
      status: 500,
    };
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
        file_type: fileType,
        questions: {
          create: [
            { sessionNum: 1, question: data.sessionOne || "" },
            { sessionNum: 2, question: data.sessionTwo || "" },
            { sessionNum: 3, question: data.sessionThree || "" },
            { sessionNum: 4, question: data.sessionFour || "" },
            { sessionNum: 5, question: data.sessionFive || "" },
            { sessionNum: 6, question: data.sessionSix || "" },
          ],
        },
      },
    });

    const content = `${newRegistration.id}.${fileType}`;

    const buffer = Buffer.from(await data.slip?.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), `asset/${content}`),
      buffer
    );

    sendMail({
      to: `${data.email}`,
      subject: "ยืนยันการส่งข้อมูลเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34",
      name: `${data.firstname}`,
    });

    return {
      message: `${data.firstname} ${data.lastname} (${data.email})`,
      status: 200,
    };
  } catch (e) {
    console.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return { message: "ไม่สามารถใช้ข้อมูลซ้ำได้", status: 400 };
    }
    return {
      message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง",
      status: 400,
    };
  }
}

// Update registration status
export async function updateRegistrationStatus(id: string, status: string) {
  try {
    await db.registration.update({
      where: { id },
      data: { status },
    });
    return { message: `User is ${status}ed`, status: 200 };
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Update user's information
export async function updateUserInformation(
  prevState: { message: string; status: number },
  formData: FormData
) {
  // Parse data
  const parse = editFormSchema.safeParse({
    id: formData.get("id"),
    education: formData.get("education"),
    title: formData.get("title"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });
  if (!parse.success) {
    return { message: "แก้ไขไม่สำเร็จ", status: 500 };
  }
  const data = parse.data;
  try {
    const edituser = await db.registration.update({
      where: { id: data.id },
      data: {
        education: data.education,
        title: data.title,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
      },
    });
    if (edituser) {
      console.log("User edited successfully");
    } else {
      console.log("Failed to edit user");
    }
    return { message: `${data.email} แก้ไขสำเร็จ`, status: 200 };
  } catch (e) {
    console.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return { message: "ไม่สามารถใช้ข้อมูลซ้ำได้", status: 400 };
    }
    return { message: "แก้ไขไม่สำเร็จ กรุณาตรวจสอบข้อมูล", status: 400 };
  }
}
