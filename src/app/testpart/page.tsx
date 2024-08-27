"use client";

import { db } from "@/utils/db";

async function fetchAllParticipants() {
  try {
    const participants = await db.registration.findMany();
    console.log("All participants fetched:", participants);
    return participants;
  } catch (e) {
    console.error("Error fetching all participants:", e);
    return [];
  }
}

export default async function FilterParticipantsPage() {
  const participants = await fetchAllParticipants();

  return (
    <div>
      <h1>Testing Prisma Database Connection</h1>
      <p>Number of participants: {participants.length}</p>
      {/* You can display more details about participants here if needed */}
    </div>
  );
}
