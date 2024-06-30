"use server";

import { db } from "./db";

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
