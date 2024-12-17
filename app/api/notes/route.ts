import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from "@/lib/session"; // Adjust based on your session logic

const prisma = new PrismaClient();

// GET: Fetch all notes for a user and organization
export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orgId } = session;

    try {
        const notes = await prisma.note.findMany({
            where: {
                orgId: orgId,
            },
            orderBy: { createdAt: 'desc' }, // Latest notes first
        });

        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}

// POST: Create a new note
export async function POST(req: NextRequest) {
    const { title, content, priority, category } = await req.json();
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, orgId } = session;
    

    if (!title || !content) {
        return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    try {
        const note = await prisma.note.create({
            data: {
                orgId,
                title,
                content,
                priority,
                category,
                userId,
                
            },
        });

        return NextResponse.json({note});
    } catch (error) {
        return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
    }
}
