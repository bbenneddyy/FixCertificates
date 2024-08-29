"use server";

import { db } from "./db";
import { unstable_noStore as noStore } from "next/cache";
import { ITEMS_PER_PAGE } from "@/constants/invoices";

// Get all participants' data
export async function getParticipantData() {
  try {
    const participantData = await db.registration.findMany({
      select: {
        title: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    });
    return participantData;
  } catch (e) {
    console.error(e);
  }
}

export async function fetchInvoicesPages(
  query: string,
  currentPage: number,
  take: number = ITEMS_PER_PAGE,
  skip: number = 0
) {
  noStore();
  try {
    const totalItems = await db.registration.count();

    const participantData = await db.registration.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: {
        created_at: "desc",
      },
    });

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return { totalPages, participantData };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}
