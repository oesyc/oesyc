
import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-option";

import { getSession } from "@/lib/session";
import BackButton from "./backButton";


interface BoardNavbarProps {
    data: Board;
};

export const BoardNavbar = async ({
    data
}: BoardNavbarProps) => {
    
        const session = await getSession();
        if(!session){
            return null;
        }
        const {orgId} = session;
        
    
    
    return (
        <div className="w-full h-14 z-[40] top-14 flex items-center px-6 gap-x-4 text-white pt-1 border-b border-[#E6DFFC]">
           <BackButton orgId={orgId}/>
           <BoardTitleForm data={data} />
           
           <div className="ml-auto space-x-2">
            <div className="flex items-center justify-center gap-x-4">
            <button className="px-4 py-1 border border-white text-black bg-white">
                Share
            </button>
            
            
            <BoardOptions id={data.id} />
            </div>
           </div>
        </div>
    );
};