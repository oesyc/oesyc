
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { selectedBoardId } = await request.json();
    try {
        
        const lists = await prisma.list.findMany({
            where:{
                boardId:selectedBoardId,
            },
        });
       
        // Here you can create a session or send a success response
        return NextResponse.json({ lists });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
    }
}
