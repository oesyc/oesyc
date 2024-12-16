"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { UseAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-model";
import { toast } from "sonner";

interface SubscriptionButtonProps {
    isPro: boolean;
};
export const SubscriptionButton = ({isPro}:SubscriptionButtonProps) =>{
    
    const proModal = useProModal();
    const {execute , isLoading} = UseAction(stripeRedirect,{
        onSuccess:(data)=>{
            window.location.href = data;
        },
        onError: (error)=>{
            toast.error(error);
        }
    });

    const onClick = () =>{
        if(isPro){
            execute({});
        } else {
            proModal.onOpen();
        }
    }


    return (
        <Button
        disabled={!!isLoading}
        onClick={onClick}
        className="bg-gradient-to-tr from-blue-600 to bg-pink-600"
        >
            {isPro ? "Manage subscription": "Upgrade to pro"}
        </Button>
    );
};