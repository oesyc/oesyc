

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";
import { getSession } from "@/lib/session";

interface BoardIdPageprops {
    params: {
        boardId: string;

    };
};


const BoardIdPage = async ({ params }: BoardIdPageprops) => {

    const session = await getSession();
    if (!session){
        redirect("/login");
    }

    const { userId, orgId} = session
    if (!orgId) {
        redirect("/organization");
    }
    const {boardId} = await params;

        const user = await db.user.findUnique({
            where:{id: userId}
        });
        const invitation = await db.invitations.findFirst({
            where:{
                email: user?.email,
            }
        });

        let lists;

    // Case 1: User's email exists in the invitation table and a list is found
    if (invitation) {
        const findList = await db.list.findUnique({
            where: {
                id: invitation.listId,
            },
            include: {
                cards: {
                    orderBy: {
                        order: "asc",
                    },
                },
            },
        });

        if (findList) {
            // Return only the found list
            lists = [findList]; // Wrap the single list in an array to maintain consistent structure
        } else {
            // Case 2: User's email exists in the invitation table but no list is found
            lists = await db.list.findMany({
                where: {
                    boardId: boardId,
                    board: {
                        orgId,
                    },
                },
                include: {
                    cards: {
                        orderBy: {
                            order: "asc",
                        },
                    },
                },
                orderBy: {
                    order: "asc",
                },
            });
        }
    } else {
        // Case 3: User's email does not exist in the invitation table
        lists = await db.list.findMany({
            where: {
                boardId: boardId,
                board: {
                    orgId,
                },
            },
            include: {
                cards: {
                    orderBy: {
                        order: "asc",
                    },
                },
            },
            orderBy: {
                order: "asc",
            },
        });
    }

    return (
        <div className="p-4 w-full overflow-hidden">
            <ListContainer 
            boardId={boardId}
            data={lists}

            />
        </div>
    );
};

export default BoardIdPage;