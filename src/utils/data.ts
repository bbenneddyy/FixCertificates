"use server";

import { db } from "./db";
import { unstable_noStore as noStore } from "next/cache";
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

const ITEMS_PER_PAGE = 2;

export async function fetchInvoicesPages(query: string, currentPage: number) {
  noStore();
  try {
    // Get the total number of entries
    const totalItems = await db.registration.count();

    // Fetch paginated data
    const participantData = await db.registration.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: {
        created_at: "desc",
      },
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return { totalPages, participantData };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}
