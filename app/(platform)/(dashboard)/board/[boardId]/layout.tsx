import { db } from "@/lib/db";

import { notFound, redirect, RedirectType } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";
import { getSession } from "@/lib/session";



export async function generateMetadata({
    params
}:{
    params: {boardId: string};
}) {
    const session = await getSession();
    if(!session){
        redirect("/login");
    }
    const {orgId}= session;
    if(!orgId){
        return {
            title: "Board",
        };
    }
    const {boardId} = params;
    const board = await db.board.findUnique({
        where:{
            id: boardId,
            orgId,
        }
    });


    return{
        title: board?.title || "Board",
    };
}

const BoardIdLaout = async({children, params,}:{
    children: React.ReactNode;
    params: {boardId: string;};
}) =>{

    const session = await getSession();
    if(!session){
        redirect("/login");
    }
    const {orgId}= session;
    if(!orgId){
        redirect("/select-org");
    };
    const {boardId} = params;
    const board = await db.board.findUnique({
        where:{
            id: boardId,
            orgId,
        },
    });

    if(!board){
        notFound(); 
    }
    return(
        <div 
        className="relative bg-no-repeat bg-cover bg-center overflow-x-auto"
        >
            
            <BoardNavbar data={board} />
            <div className="overflow-x-auto"/>
            <main className="">
                
            {children}
            </main>
            
        </div>
    );
};
export default BoardIdLaout;