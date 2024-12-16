"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
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
    const { items,boardId } = data;


    let updatedCards;
    try {
        const transaction = items.map((card)=>
        db.card.update({
            where:{
                id:card.id,
                list:{
                    board:{
                        orgId,
                    }
                },
            },
            data:{
                order: card.order,
                listId: card.listId,
            },
        }),
        );

        updatedCards = await db.$transaction(transaction);

    } catch (error) {
        return {
            error: "Failed to create reorder"
        }
    }
    revalidatePath(`/board/${boardId}`);
    return { data: updatedCards};
};
export const updateCardOrder = CreateSafeAction(UpdateCardOrder, handler)