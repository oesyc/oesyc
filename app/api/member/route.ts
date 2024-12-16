import { generateProfileIcon } from '@/lib/create_profile_icon';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { name, email } = await request.json();

    // Basic validation
    if (!name || !email) {
        return NextResponse.json(
            { message: 'All fields are required.' },
            { status: 400 }
        );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return NextResponse.json(
            { message: 'User with this email already exists.' },
            { status: 400 }
        );
    }

    // Generate a profile icon URL (using the user's name)
    const imageUrl = generateProfileIcon(name);

    try {
        // Check if there's an invitation for this email
        
        const invitation = await prisma.invitations.findFirst({
            where:{
                email:email,
            },
        });
       
        // Create the new user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                profileImage: imageUrl,
                role:'MEMBER',
            },
            
        });
        const owner = await prisma.user.findFirst({
            where: {
              AND: [
                {
                  organizations: {
                    some: {
                      id: invitation?.orgId, // Match the organization ID
                    },
                  },
                },
                {
                  role: 'OWNER', // Ensure the role is 'OWNER'
                },
              ],
            },
          });
        const updatemembership = await prisma.organizationMember.updateMany({
            where:{userId:owner?.id},
            data:{
                userId:user.id,
            }
        });

        // Fetch the organization based on the invitation
        const update = await prisma.invitations.updateMany({
            where:{email},
            data:{
                status:'accepted',
            }
        })

        // Fetch the board and list based on the invitation
        
        // Return success response
        return NextResponse.json(
            { message: 'User created and assigned successfully!', user },
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
