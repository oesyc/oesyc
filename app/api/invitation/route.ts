import { generateProfileIcon } from '@/lib/create_profile_icon';
import { getSession } from '@/lib/session';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { name, email,selectedBoardId, selectedListId } = await request.json();

    // Basic validation
    if (!name || !email || !selectedBoardId || !selectedListId) {
        return NextResponse.json(
            { message: 'All fields are required.' },
            { status: 400 }
        );
    }

    // Check if user already exists
    const existingUser = await prisma.invitations.findFirst({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        const message = "User already invited.";
        return NextResponse.json({ message }, { status: 400 });
    }
    const session = await getSession();
    if(!session){
        return null;
    }
    
    const {orgId, userId} = session;
    const pending= "pending";
    try {
        // Create user
        const invitations = await prisma.invitations.create({
            data: {
                name: name,
                email: email,
                boardId:selectedBoardId,
                orgId: orgId,
                listId:selectedListId,
                status:pending,
            },
        });
        const createMember = await prisma.organizationMember.create({
            data:{
                userId:userId,
                organizationId: orgId,
                role:'MEMBER',
            },
        });

        return NextResponse.json(
            { message: 'User created successfully!', invitations },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { message: 'An error occurred while creating the user.' },
            { status: 500 }
        );
    }
}
