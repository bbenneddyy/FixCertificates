import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const regis = await prisma.registration.findMany();
    return Response.json(regis)
  } catch  (e) {
    console.error(e);
  }
};