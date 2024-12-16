import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import SessionWrapper from "../_components/sessionWrapper";


const PlatfromLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        
            <QueryProvider>
                <Toaster />
                <ModalProvider />
                <SessionWrapper>
                {children}
                </SessionWrapper>
            </QueryProvider>
        
    );
};
export default PlatfromLayout;