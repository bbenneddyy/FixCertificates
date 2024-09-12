import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const data = await request.json();
    const user = data.user; // Assume user data comes from the request

    const response = NextResponse.json({ message: 'User logged in' });
    response.cookies.set('user', JSON.stringify(user), { maxAge: 3 * 60 * 60 ,path: '/',}); // Set cookie for 3 hours
    return response;
}
