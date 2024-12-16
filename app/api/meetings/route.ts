import { NextRequest, NextResponse } from 'next/server';
import {PrismaClient } from '@prisma/client'; // Assume Prisma is set up
import { getSession } from '@/lib/session';
const prisma = new PrismaClient();
export async function GET() {
    
    try {
        const session = await getSession();
    if(!session){
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const {orgId} = session;

        const meetings = await prisma.meeting.findMany({
            where: {
                orgId: orgId,
            }
        });
        return NextResponse.json(meetings);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        return NextResponse.json(
            { message: 'Failed to fetch meetings' }, 
            { status: 500 }
        );
    }
}
