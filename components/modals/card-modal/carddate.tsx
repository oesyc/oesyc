"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { UseAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface DateProps {
    data: CardWithList;
};

export const CardDate = ({ data }: DateProps) => {

    const queryClient = useQueryClient();
    const params = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<ElementRef<"input">>(null);
    const formRef = useRef<ElementRef<"form">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };
    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const {execute, FieldErros} = UseAction(updateCard,{
        onSuccess: (data)=>{
            queryClient.invalidateQueries({
                queryKey: ["card",data.id],
            });
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            });
            toast.success(`Card "${data.title}" Updated`);
            disableEditing();
        },
        onError: (error)=>{
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const getdate = formData.get("date") as string;
        const date = new Date(getdate)

        const boardId = params.boardId as string;
        execute({
            id:data.id,
            date,
            boardId,
        })
    }

    // Format for display
    const displayDate = data.date 
        ? new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) 
        : "Add a due date";

    // Check if date is due soon (within 1 day)
    const isDueSoon = () => {
        if (!data.date) return false;
        const today = new Date();
        const dueDate = new Date(data.date);
        const dayDifference = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
        return dayDifference <= 1 && dayDifference > 0;
    };

    return (
        <div className="flex items-start gap-x-3 w-[40%]">
            <Calendar className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Due Date
                </p>
                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className="space-y-2"
                    >
                        <input 
                            type="date"
                            id="date"
                            name="date"
                            ref={inputRef}
                            defaultValue={data.date ? new Date(data.date).toISOString().split("T")[0] : undefined}                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>
                                Save
                            </FormSubmit>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                size="sm"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        role="button"
                        className={`flex items-center justify-between min-h-[38px] bg-white text-sm font-medium py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none ${
                            isDueSoon() ? "text-red-500 border-red-500" : ""
                          }`}
                    >
                        {displayDate}
                    </div>
                )}
            </div> 
        </div>
    );
};

CardDate.Skeleton = function DateSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-[78px] mb-2 bg-neutral-200" />
            </div>
        </div>
    )
}