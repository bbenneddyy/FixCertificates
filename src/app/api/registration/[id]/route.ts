import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/prisma';

// type Registration = {
//     registration: any;
//     id: string;
//     education: string;
//     title: string;
//     firstname: string;
//     lastname: string;
//     email: string;
//     phone: string;
//     reason: string;
//     status: string;
//   }
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
export async function GET (
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

export async function PATCH (
    request: Request,
    {params} : {params: {id: string, isValid: string}}
) {
    const body = await request.json();
    const { status } = body;
    
    const id = status.id;
    const valid = status.isValid;

    await prisma.registration.update({
        where: {
            id: id
        },
        data: {
            status: valid
        }

    })

    
    // const index = Registration.findIndex(
    //     (registration) => registration.id === params.id 
    // )
    // Registration[index].status = status;
    // return Response.json(Registration[index])
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