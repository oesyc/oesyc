import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger
} from "@/components/ui/tooltip";

interface HintProps {
    children: React.ReactNode;
    discription: string;
    side?: "left" | "right" |"top" | "bottom";
    sideOffset?: number;
};

export const Hint = ({
    children,
    discription,
    side="bottom",
    sideOffset = 0

}:HintProps)=>{
    return(
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                sideOffset={sideOffset}
                side={side}
                className="text-xs max-w-[220px] break-words"
                >
                    {discription}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )

}