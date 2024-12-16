"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
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
    const { title, boardId, listId } = data;


    let card;
    try {
        const list = await db.list.findUnique({
            where:{
                id: listId,
                board:{
                    orgId,
                },
            },
        });

        if(!list) {
            return {
                error: "List not found.",
            };
        }

        const lastCard = await db.card.findFirst({
            where:{ listId},
            orderBy: {order: "desc"},
            select:{order: true},
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;
        card = await db.card.create({
            data:{
                title,
                listId,
                order: newOrder,

            },
        });

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE,
        });

    } catch (error) {
        return {
            error: "Failed to create"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return { data: card};
};
export const createCard = CreateSafeAction(CreateCard, handler)