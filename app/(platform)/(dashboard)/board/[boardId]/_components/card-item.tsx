"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-model";
import { FaRegClock } from "react-icons/fa6";

interface CardItemProps {
    data: Card;
    index: number;
};

export const CardItem = ({ data, index }: CardItemProps) => {
    const cardModal = useCardModal();
    const currentDate = new Date();
    const cardDate = data.date ? new Date(data.date) : null;

    // Check if the date is within one day of the current date
    const isCloseToDue = cardDate
        ? Math.abs(cardDate.getTime() - currentDate.getTime()) <= 24 * 60 * 60 * 1000
        : false;

    const formattedDate = cardDate ? cardDate.toLocaleDateString() : "";

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="flex items-center justify-between border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
                    onClick={() => cardModal.onOpen(data.id)}
                    role="button"
                >
                    <div className="truncate">{data.title}</div>
                    <div className="flex items-center text-xs">
                        <FaRegClock className={`${
                                isCloseToDue ? "text-red-500 mr-1 w-4 h-4" : "text-gray-500 mr-1 w-4 h-4"
                            }`} />
                        <span
                            className={`${
                                isCloseToDue ? "text-red-500 font-bold" : "text-gray-500"
                            }`}
                        >
                            {formattedDate}
                        </span>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
