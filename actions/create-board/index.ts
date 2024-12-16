"use server";

import { getSession } from '@/lib/session';
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { IncreamentAvailbleCount, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { redirect } from 'next/navigation';

const handler = async (data: InputType): Promise<ReturnType>=>{
    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const {userId, orgId}= session;
    if(!userId || !orgId) {
        return {
            error: "unauthorized",
        };
    }
    const canCreate = await hasAvailableCount();
    const isPro = await checkSubscription();

    if(!canCreate && !isPro){
        return{
            error: "you have reached your limit of free boards. Please Upgrade to create more."
        }
        
    }

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
    ] = image.split("|");

    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName){
        return{
            error: "Missing Fields. Failed to Create Board"
        };
    }

    let board;
    try {

        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,

            }
        });
        if(!isPro){
        await IncreamentAvailbleCount();
    }
        await createAuditLog({
            entityTitle: board.title,
            entityId:board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
           });
    } catch (error) {
        return {
            error: "Failed to create"
        }
    }
    revalidatePath(`/board/${board.id}`);
    return { data: board};
};
export const createBoard = CreateSafeAction(CreateBoard, handler)