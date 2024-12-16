import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

    const session = await getSession();
    if(!session){
        return null;
    }
    const {orgId} = session;

try {
    const boards = await db.board.findMany({
        where:{
            orgId:orgId,
        },
    });
    if (boards.length === 0) {
        return NextResponse.json({message: "no boards found"})
    }

    return NextResponse.json({boards:boards});
} catch (error) {
    return NextResponse.json({message: "error in fetching in board"});
}
}