"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
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
    const { title, boardId } = data;


    let list;
    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId,
            },
        });

        if(!board){
            return{
                error: "Board Not Found ",

            };
        }

        const lastList = await db.list.findFirst({
            where: {
                boardId: boardId,
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            },
        });

        const newOrder = lastList ? lastList.order + 1: 1;

        list = await db.list.create({
            data:{
                title,
                boardId,
                order: newOrder,
            }
        });
        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE,
           });
    } catch (error) {
        return {
            error: "Failed to create List"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return { data: list};
};
export const createList = CreateSafeAction(CreateList, handler)