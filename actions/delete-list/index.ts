"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
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

        list = await db.list.delete({
            where: {
                id,
                boardId,
                board:{
                    orgId,
                },
            },
        });
        await createAuditLog({
            entityTitle: list.title,
            entityId:list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.DELETE,
           });
    } catch (error) {
        return {
            error: "Failed to delete"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return {data: list};
};
export const deleteList = CreateSafeAction(DeleteList, handler)