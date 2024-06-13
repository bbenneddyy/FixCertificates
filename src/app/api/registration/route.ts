import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRegistration = async (req: NextApiRequest, res: NextApiResponse) => {
  const regis = await prisma.registration.findMany();
  return res.status(200).json(regis);
};
