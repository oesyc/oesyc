
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createSession } from '@/lib/session';
const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email } = await request.json();
    try {
        const invitation = await prisma.invitations.findFirst({
            where: {
                email:email,
            },
        });
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid user Please register with this email' }, { status: 400 });
        }
        if (invitation) {
            const userDetails = { id: user.id, email: user.email, name: user.name, image: user.profileImage };
            await createSession({
                userId: userDetails.id,
                userName: userDetails.name,
                orgId: invitation.orgId,
                pageType: '',
            });

            // Here you can create a session or send a success response
            return NextResponse.json({ message: 'Login successful', userDetails });
        }
        const userDetails = { id: user.id, email: user.email, name: user.name, image: user.profileImage };
        await createSession({
            userId: userDetails.id,
            userName: userDetails.name,
            orgId: '',
            pageType: '',
        });

        // Here you can create a session or send a success response
        return NextResponse.json({ message: 'Login successful', userDetails });

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
    }
}
