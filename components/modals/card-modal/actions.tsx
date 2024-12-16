"use client";



import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { UseAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-model";
import { toast } from "sonner";

interface ActionsProps {
    data: CardWithList;
};

export const Actions = ({data}:ActionsProps) => {

    const params = useParams();
    const cardModal = useCardModal();

    const {execute: executeCopyCard, isLoading:isLoadingCopy} = UseAction(copyCard,{
        onSuccess: (data) =>{
            toast.success(`Card "${data.title}" Copied`);
            cardModal.onClose();
        },
        onError: (error) =>{
            toast.error(error);
        },
    });
    const {execute: executeDeleteCard,isLoading:isLoadingDelete} = UseAction(deleteCard,{
        onSuccess: (data) =>{
            toast.success(`Card "${data.title}" Deleted`);
            cardModal.onClose();
        },
        onError: (error) =>{
            toast.error(error);
        },
    });

    const onCopy = () =>{
        const boardId = params.boardId as string;
        executeCopyCard({
            id: data.id,
            boardId,
        });
    };
    const onDelete = () =>{
        const boardId = params.boardId as string;
        executeDeleteCard({
            id: data.id,
            boardId,
        });
    }

    return(
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button
            onClick={onCopy}
            disabled={isLoadingCopy as boolean}
            
            className="w-full justify-start"
            >
                <Copy className="h-4 w-4 mr-2"/>
                Copy
            </Button>
            <Button
            onClick={onDelete}
            disabled={isLoadingDelete as boolean}
            
            className="w-full justify-start"
            >
                <Trash className="h-4 w-4 mr-2"/>
                Delete
            </Button>
        </div>
    );
};
Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y2 mt-2">
            <Skeleton className="h-4 w-20 mt-1 bg-neutral-200" />
            <Skeleton className="h-8 w-full mt-1 bg-neutral-200" />
            <Skeleton className="h-8 w-full mt-1 bg-neutral-200" />
        </div>
    );
};