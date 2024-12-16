import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

import { redirect, useRouter  } from "next/navigation"; // For redirection in server component
import { getSession } from "@/lib/session";


export const BoardList = async() => {

    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const { userId , orgId}= session;
    
    const user = await db.user.findUnique({
        where:{
            id:userId,
        },
    });
    const invitation = await db.invitations.findFirst({
        where:{
            email:user?.email,
        },
    });
    let boards;
    if(user?.role === 'MEMBER'){
         boards = await db.board.findMany({
            where: {
              AND: [
                { orgId: orgId }, // Check orgId matches
                { id: invitation?.boardId as string }, // Check id matches boardId
              ],
            },
            orderBy: {
              createdAt: "desc",
            },
          });
    } else {

    boards = await db.board.findMany({
        where:{
            orgId,
        },
        orderBy:{
            createdAt: "desc"
        }
    });
}
    const availableCount  = await getAvailableCount();
    const isPro = await checkSubscription();

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2"/>
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board) =>(
                    <Link
                    key={board.id}
                    href={`/board/${board.id}`}
                    style={{backgroundImage: `url(${board.imageThumbUrl})`}}
                    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden "
                    >
                        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/50 transition"/>
                        <p className="relative font-semibold text-white">
                            {board.title}
                        </p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                <div role="button" className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
                    <p className="text-lg">Create new board</p>
                    <span className="text-sm"> {isPro ? "unlimited" : `${MAX_FREE_BOARDS - availableCount} remaining`}</span>
                    <Hint sideOffset={40} discription={`Free Work Spaces can have up to 5 Open Boards. For Unlimited Boards upgrade this workspace`}>
                        <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]"/>
                    </Hint>
                </div>
                </FormPopover>
            </div>
        </div>
    );
};
BoardList.Skeleton = function SkeletonBoardList(){
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
        </div>
    );
};