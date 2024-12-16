import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { hasAvailableCount, IncreamentAvailbleCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


export async function POST(req:NextRequest) {
    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        return NextResponse.redirect('/login');
    }
    const { userId, orgId } = session;
    if (!userId || !orgId) {
        return {
            error: "unauthorized",
        };
    }
    const canCreate = await hasAvailableCount();
    const isPro = await checkSubscription();

    if (!canCreate && !isPro) {
        return {
            error: "you have reached your limit of free boards. Please Upgrade to create more."
        }

    }
    const title = "basic";
    const imageId = "8ZAxI5FwjFo";
    const imageThumbUrl = "https://images.unsplash.com/photo-1488711500009-f9111944b1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjY1NDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzNTc1MjF8&ixlib=rb-4.0.3&q=80&w=200";
    const imageFullUrl = "https://images.unsplash.com/photo-1488711500009-f9111944b1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjY1NDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzNTc1MjF8&ixlib=rb-4.0.3&q=85";
    const imageUserName = "Sorasak";
    const imageLinkHTML = "https://unsplash.com/photos/skogafoss-falls-8ZAxI5FwjFo";

    let board;
    let list
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
        if (!isPro) {
            await IncreamentAvailbleCount();
        }
        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
        });
        const lastList = await db.list.findFirst({
            where: {
                boardId: board.id,
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            },
        });

        const newOrder = lastList ? lastList.order + 1: 1;
        const first = "todo"
        list = await db.list.create({
            data:{
                title:first,
                boardId:board.id,
                order: newOrder,
            }
        });
        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE,
           });

        //    second list creation
        const akhriList = await db.list.findFirst({
            where: {
                boardId: board.id,
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            },
        });

        const newOrder2 = akhriList ? akhriList.order + 1: 1;
        const two = "doing"
        list = await db.list.create({
            data:{
                title:two,
                boardId:board.id,
                order: newOrder2,
            }
        });
        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE,
           });

           // third list creation
           const thirdList = await db.list.findFirst({
            where: {
                boardId: board.id,
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            },
        });

        const thirdOrder2 = thirdList ? thirdList.order + 1: 1;
        const three = "done";
        list = await db.list.create({
            data:{
                title:three,
                boardId:board.id,
                order: thirdOrder2,
            }
        });
        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE,
           });
           const boardId = board.id;
           return NextResponse.redirect(`/board/${boardId}`)
           
    } catch (error) {
        return {
            error: "Failed to create"
        }
    }

}