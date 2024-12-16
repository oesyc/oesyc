// app/api/orgstore/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getSession, createSession, updateSession } from '@/lib/session';


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
        // Handle case where there's no session (user not logged in)
        return NextResponse.redirect('/login');
      }
      const {userId}= session; // Get userId from URL params
      const user = await prisma.user.findUnique({
        where:{
          id:userId,
        },
      });
      

      if (user?.role === 'MEMBER'){
        const organizations = await prisma.organization.findMany({
          where: {
            members: {
              some: {
                userId: userId, // Filter for the user ID
              },
            },
          },
        });
        return NextResponse.json({ organizations });
      } else {
    const organizations = await prisma.organization.findMany({
      where: {
        ownerId: userId, // Ensure you're fetching organizations for the correct user
      },
    });
    return NextResponse.json({ organizations });
  }
    

    // Update the session with the new orgId (from the fetched organization)
    
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json({ message: 'Failed to fetch organizations' }, { status: 500 });
  }
}
