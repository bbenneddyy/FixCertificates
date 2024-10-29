import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createParticipant(name: string, lastName: string) {
  try {
    await prisma.registration.create({ data: { name, lastName } });
    return { message: "Participant created", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create participant", status: 500 };
  }
}