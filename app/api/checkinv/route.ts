import { getSession, updateSession } from '@/lib/session';
import { PrismaClient } from '@prisma/client';

import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "email required" },
        { status: 400 }
      );
    }

    const invitations = await prisma.invitations.findFirst({
      where: {
        email:email, 
      },
    });
   
    return NextResponse.json({ invitations });
  } catch (error) {
    console.error("Error creating organization:", error);
    return NextResponse.json({ message: "Failed to create organization" }, { status: 500 });
  }
}
