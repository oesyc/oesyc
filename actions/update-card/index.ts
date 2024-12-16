"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
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
    const { boardId, id, ...values } = data;


    let card;
    try {

        card = await db.card.update({
            where: {
                id,
                list:{
                    board:{
                        orgId,
                    },
                },
            },
            data:{
                ...values,
            }
        });
        await createAuditLog({
            entityTitle: card.title,
            entityId:card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE,
           });
    } catch (error) {
        return {
            error: "Failed to update"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return { data: card};
};
export const updateCard = CreateSafeAction(UpdateCard, handler)