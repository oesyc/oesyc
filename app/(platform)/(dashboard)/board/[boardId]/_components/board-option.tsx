"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { deleteBoard } from "@/actions/delete-board";
import { UseAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface BoardOptionsProps {
    id: string;
}

export const BoardOptions = ({id}:BoardOptionsProps) => {

    const {execute} = UseAction(deleteBoard, {
        onError: (error)=>{
            toast.error(error);
        }
    });

    const onDelete =() =>{
        execute({id});
    };

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button className="bg-white h-auto w-auto p-2 border border-white hover:bg-white">
                    <MoreHorizontal className="h-4 w-4 text-black"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent 
            className="px-0 pt-3 pb-3 " 
            side="bottom" 
            align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Button variant="ghost" onClick={onDelete} className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    );
};