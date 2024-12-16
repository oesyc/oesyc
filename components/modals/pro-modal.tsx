"use client";

import { useProModal } from "@/hooks/use-pro-model";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { UseAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () =>{

    const proModal = useProModal();

    const {execute, isLoading} = UseAction(stripeRedirect,{
        onSuccess: (data)=>{
            window.location.href = data;
        },
        onError: (error)=>{
            toast.error(error);
        }
    });

    const onClick = () =>{
        execute({});
    }

    return(
        <Dialog
        open={proModal.isOpen}
        onOpenChange={proModal.onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <DialogTitle/>
                <div className="aspect-video relative flex items-center justify-center">
                    <Image 
                    src="/hero.jpeg"
                    alt="hero"
                    className="object-cover"
                    fill
                    />
                </div>
                <div className="text-neutral-700 mx-auto space-y-4 p-3">
                    <h2 className="font-semibold text-xl ">
                        Upgrade To OESYC Pro Today!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of OESYC
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited Board</li>
                            <li>Advance CheckList</li>
                            <li>Admin and security features</li>
                            <li>and more</li>
                        </ul>
                    </div>
                    <Button 
                    disabled={!!isLoading}
                    onClick={onClick}
                    className="w-full">
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};