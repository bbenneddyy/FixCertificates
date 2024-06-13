"use server";
import { revalidatePath } from 'next/cache';
// import db from '../../prisma/'
import prisma from './db';
import { formSchema } from "./schema";

// prevState is required. Please do not delete
export async function createParticipant(prevState: { message: string }, formData: FormData) {

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
    await prisma.formSchema.create({
      data: {
        education: data.education,
        title: data.title,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        reason: data.reason,
        slip: data.slip,
      },
    })
    // Save data to database and save file to volume here
    console.log(data);
    revalidatePath("/register");
    return { message: `${data.email} สมัครสำเร็จ` };
  } catch (e) {
    return { message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง" };
  }
}
