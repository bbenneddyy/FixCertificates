import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function GET(
//     req: NextApiRequest, res: NextApiResponse
// ) {
//     const { id } = req.query;
//     const userRegistration = await prisma.registration.findUnique({
//         where: {
//           id: id as string,
//         }});

//     return res.json({
//         registration : userRegistration
//     });
// }
export async function GET(
    request: Request,
    {params} : {params: {id: string}}
) {
    const id = params.id;
    const userRegistration = await prisma.registration.findUnique({
        where: {
          id: id as string,
        }});

    return Response.json({
        registration : userRegistration
    });
}

// export async function POST(
//     request: Request,
//     {params, body}: {params: {cuid: string}, body: any}
// ) {
//     const cuid = params.cuid;
//     const newRegistration = body;

//     const insertedRegistration = await db.insert(registrations, {...newRegistration, cuid});

//     return Response.json({
//         registration : insertedRegistration
//     });
// }