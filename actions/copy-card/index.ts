"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
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
    const {id, boardId} = data;


    let card;
    try {

       const cardToCopy = await db.card.findUnique({
        where: {
            id,
            list: {
                board:{
                    orgId,
                },
            },
        },
       });

       if(!cardToCopy){
        return { error: "Card not Found"};
       }

       const lastCard = await db.card.findFirst({
        where:{ listId:cardToCopy.listId},
        orderBy:{ order: "desc" },
        select:{ order: true },

       });


       const newOrder = lastCard ? lastCard.order + 1: 1;
       card = await db.card.create({
        data:{
            listId:cardToCopy.listId,
            description:cardToCopy.description,
            title: `${cardToCopy.title} -copy`,
            order: newOrder,
        },
       });

       await createAuditLog({
        entityTitle: card.title,
        entityId:card.id,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.CREATE,
       });
    } catch (error) {
        return {
            error: "Failed to Copy List"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return {data: card};
};
export const copyCard = CreateSafeAction(CopyCard, handler)