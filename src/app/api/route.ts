import { NextResponse } from 'next/server';
import { createParticipant } from '@/utils/action';

export async function POST(request: Request) {
  const { name, lastName } = await request.json();

  const response = await createParticipant(name, lastName);
  return NextResponse.json(response);
}