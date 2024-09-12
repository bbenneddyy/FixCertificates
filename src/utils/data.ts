"use server";

import { db } from "./db";

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