"use server";

import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { DecreaseAvailbleCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { getSession } from "@/lib/session";


const handler = async (data: InputType): Promise<ReturnType>=>{
    const session = await getSession();
    if (!session){
        redirect("/login");
    }

    const {userId, orgId} = session

    const isPro = await checkSubscription();

    if(!userId || !orgId) {
        return {
            error: "unauthorized",
        };
    }
    const {id} = data;


    let board;
    try {

        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        });
        if(!isPro){
        await DecreaseAvailbleCount();
        }
        await createAuditLog({
            entityTitle: board.title,
            entityId:board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
           });
    } catch (error) {
        return {
            error: "Failed to delete"
        }
    }
    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
};
export const deleteBoard = CreateSafeAction(DeleteBoard, handler)