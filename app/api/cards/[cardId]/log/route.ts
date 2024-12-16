import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

import { ENTITY_TYPE } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { cardId: string } }
){
    const {cardId} = await params;
    try {
        const session = await getSession();
        if(!session){
            redirect("/login");
        }
        const {userId, orgId} = session;
        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const auditLogs = await db.auditLog.findMany({
            where:{
                orgId,
                entityId: cardId,
                entityType: ENTITY_TYPE.CARD,
            },
            orderBy: {
                createdAt: "desc",              
            },
        });
        return NextResponse.json(auditLogs);
        

    } catch {
        return new NextResponse("Internal error", { status: 500 });
    }
};