"use client";

import { ListWithCard } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

import { UseAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface ListContainerProps {
    data: ListWithCard[];
    boardId: string;

};

function reorder<T>(list: T[], startIndex: number, endIndex: number){
    const result = Array.from(list);
    const [removed] = result.splice(startIndex,1);
    result.splice(endIndex, 0, removed);
    return result;

};



export const ListContainer = ({ data, boardId }: ListContainerProps) => {

    const [orderData, setOrderData] = useState(data);

    const { execute: executeUpdateListOrder} = UseAction(updateListOrder,{
        onSuccess: ()=>{
            toast.success("list reordered");
        },
        onError: (error)=>{
            toast.error(error);
        },
    });

    const { execute: executeUpdateCardOrder} = UseAction(updateCardOrder,{
        onSuccess: ()=>{
            toast.success("Card reordered");
        },
        onError: (error)=>{
            toast.error(error);
        },
    });

    useEffect(() => {
        setOrderData(data);
    }, [data]);

    const OnDragEnd = (result: any) =>{
        const { destination, source, type } = result;
        if(!destination){
            return;
        }
        // if drop in the same position
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }
        // user move a list 

        if(type === "list"){
            const items = reorder(
                orderData,
                source.index,
                destination.index,
            ).map((item, index)=>({ ...item, order:index}));
            setOrderData(items);
            // TODO triger a server action
            executeUpdateListOrder({items, boardId});

        }

        //user moves a card
        if(type === "card"){
            const newOrderData = [...orderData];
            //source destination list 
            const sourceList = newOrderData.find(list => list.id === source.droppableId);
            const destList = newOrderData.find(list => list.id === destination.droppableId);

            if(!sourceList || !destList){
                return;
            }

            //check if card exist on the source list 
            if(!sourceList.cards){
                sourceList.cards = [];
            }
            // check if card exist on the destination list 
            if(!destList.cards){
                destList.cards = [];
            }
            
            // moving the card in the same list 
            if(source.droppableId === destination.droppableId){
                const reorderCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index,
                );

                reorderCards.forEach((card,idx) => {
                    card.order = idx;
                });
                sourceList.cards = reorderCards;
                setOrderData(newOrderData);
                //TODO Triger server action
                executeUpdateCardOrder({
                    boardId:boardId,
                    items: reorderCards,
                });
                //user move the card to another list 


            } else{
                //removwe card from the source list 
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                //asign new list id to the card
                movedCard.listId = destination.droppableId;
                //add the card to the destination list 
                destList.cards.splice(destination.index, 0 , movedCard);
                sourceList.cards.forEach((card,idx) =>{card.order=idx;});
                // update the order foreach card in the destination list 
                destList.cards.forEach((card,idx) =>{card.order = idx;});

                setOrderData(newOrderData);
                //todo triger server action
                executeUpdateCardOrder({
                    boardId: boardId,
                    items: destList.cards,
                })
            }
        }
    };

    return (

        <DragDropContext onDragEnd={OnDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (

                    <ol 
                    {...provided.droppableProps}
                    ref={provided.innerRef}

                    className="flex gap-x-3 h-full">
                        {orderData.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};
