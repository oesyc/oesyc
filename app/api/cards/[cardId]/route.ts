import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { cardId: string } }
) {
    try {
        const session = await getSession();
        if(!session){
            redirect("/login");
        }
        const {userId, orgId} = session;
        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
       const {cardId} = params;
        const card = await db.card.findUnique({
            where:{
                id: cardId,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
            include: {
                list:{
                    select:{
                        title: true,
                    },
                },
            },
        });

        return NextResponse.json(card);


    } catch {
        return new NextResponse("Internal error", { status: 500 });
    }
}