import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
    const id = params.id;
    const userRegistration = await prisma.registration.findUnique({
        where: {
          id: id as string,
        }});
    return NextResponse.json({
        registration : userRegistration
    });
}
