"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";

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


    let list;
    try {

       const listToCopy = await db.list.findUnique({
        where: {
            id,
            boardId,
            board: {
                orgId,
            },
        },
        include:{
            cards: true,
        },
       });

       if(!listToCopy){
        return { error: "List not Found"};
       }

       const lastList = await db.list.findFirst({
        where:{ boardId},
        orderBy:{ order: "desc" },
        select:{ order: true },

       });


       const newOrder = lastList ? lastList.order + 1: 1;
       list = await db.list.create({
        data:{
            boardId:listToCopy.boardId,
            title: `${listToCopy.title} -copy`,
            order: newOrder,
            cards: {
                createMany: {
                    data: listToCopy.cards.map((card) =>({
                        title: card.title,
                        Description: card.description,
                        order: card.order,
                        
                    })),
                },
            },
        },

        include: {
            cards: true,
        },
       });
       await createAuditLog({
        entityTitle: list.title,
        entityId:list.id,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.CREATE,
       });
    } catch (error) {
        return {
            error: "Failed to Copy List"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return {data: list};
};
export const copyList = CreateSafeAction(CopyList, handler)