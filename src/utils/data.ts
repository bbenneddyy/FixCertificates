"use server";

import { db } from "./db";
import { unstable_noStore as noStore } from "next/cache";
import { ITEMS_PER_PAGE } from "@/constants/invoices";

// Get all participants' data
export async function getParticipantData() {
  try {
    const participantData = await db.registration.findMany({
      where: {
        status: "accepted",
      },
      select: {
        title: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        education: true,
        reason: true,
        question1: true,
        question2: true,
        question3: true,
        question4: true,
        question5: true,
        question6: true,
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

export async function getNumberOnsiteParticipants() {
  try{
    const numberOnsite = await db.registration.count({
      where: {
        place: {
          startsWith: 'Onsite'
        }
      }
    });
    console.log(`Number of Onsite participants': ${numberOnsite}`);
    return numberOnsite;
  } catch (e){
    console.error(e);
  }

}
