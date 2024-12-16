"use client";
import { SessionProvider } from "next-auth/react";



const SessionWrapper = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    );
};
export default SessionWrapper;