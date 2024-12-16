"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";


const handler = async (data: InputType): Promise<ReturnType>=>{
    const session = await getSession();
    if (!session){
        redirect("/login");
    }

    const {userId, orgId} = session

    if(!userId || !orgId) {
        return {
            error: "unauthorized",
        };
    }
    const { title, id } = data;


    let board;
    try {

        board = await db.board.update({
            where: {
                id,
                orgId,
            },
            data:{
                title,
            }
        });
        await createAuditLog({
            entityTitle: board.title,
            entityId:board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.UPDATE,
           });
    } catch (error) {
        return {
            error: "Failed to update"
        }
    }
    revalidatePath(`/board/${id}`);
    return { data: board};
};
export const updateBoard = CreateSafeAction(UpdateBoard, handler)