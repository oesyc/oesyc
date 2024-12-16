import { getSession, updateSession } from '@/lib/session';
import { PrismaClient } from '@prisma/client';

import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json(
        { message: "Organization name and user ID are required" },
        { status: 400 }
      );
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        ownerId: userId,  // Ensure that the ownerId is being passed correctly
      },
    });
    const session = await getSession();
    if (!session) {
      // If there's no session, return an error response or redirect
      return NextResponse.redirect('/login');  // Use redirect here
    }
    await updateSession({ orgId: organization.id});
    return NextResponse.json({ message: "Organization created successfully", organization });
  } catch (error) {
    console.error("Error creating organization:", error);
    return NextResponse.json({ message: "Failed to create organization" }, { status: 500 });
  }
}
