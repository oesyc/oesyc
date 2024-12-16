
import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
// meetings/route.ts
export async function POST(req: NextRequest) {
    

    try {
        const { date, timeSlot, heading } = await req.json();
        const session = await getSession();
    if(!session){
        return null
    }

    const {orgId} = session;
        // Check if the slot is already booked
        const existingBooking = await prisma.meeting.findFirst({
            where: {
                date,
                timeSlot,
                orgId
            }
        });

        if (existingBooking) {
            return NextResponse.json(
                { message: "Time slot already booked" },
                { status: 400 }
            );
        }

        // Create a new booking
        const newMeeting = await prisma.meeting.create({
            data: {
                date,
                timeSlot,
                heading,
                orgId
            }
        });

        return NextResponse.json(newMeeting, { status: 201 });
    } catch (error) {
        console.error('Error creating meeting:', error);
        return NextResponse.json(
            { message: 'Failed to create meeting' }, 
            { status: 500 }
        );
    }
}