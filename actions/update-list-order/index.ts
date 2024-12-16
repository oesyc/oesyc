"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";
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
    const { items, boardId } = data;


    let lists;
    try {
        const transaction = items.map((list)=>
        db.list.update({
            where:{
                id:list.id,
                board:{
                    orgId,
                },
            },
            data:{
                order: list.order,

            },
        })
        );

        lists = await db.$transaction(transaction);

    } catch (error) {
        return {
            error: "Failed to create reorder"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return { data: lists};
};
export const updateListOrder = CreateSafeAction(UpdateListOrder, handler)