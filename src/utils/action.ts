"use server";
import prisma from "./db";
import { formSchema } from "./schema";
import { sendMail } from "./mail";
import { writeFile } from "fs/promises";
import path from "path";

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

  try {
    console.log(data);
    await prisma.registration.create({
      data: {
        education: data.education,
        title: data.title,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        reason: data.reason,
      },
    });

    // console.log(data)

    // Saving file
    try {
      const buffer = Buffer.from(await data.slip?.arrayBuffer());
      await writeFile(
        path.join(process.cwd(), "public/assets/" + "filename" + ".jpg"),
        buffer
      );
    } catch (error) {
      console.log("Error occured during saving file ", error);
    }
  } catch (e) {
    console.error(e);
  }

  // Send Email
  try {
    sendMail({
      to: `${data.email}`,
      subject: "Test MAil",
      body: `<h1>ส่งเมลเล่น</h1>`,
    });
    return { message: `${data.email} สมัครสำเร็จ` };
  } catch (e) {
    console.error(e);
    return { message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง" };
  }
}
