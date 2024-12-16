"use client";
import { MoveLeftIcon } from "lucide-react"
import { redirect } from "next/navigation"

interface BackButtonInterface {
    orgId: string | null;
}
const BackButton = ({orgId}: BackButtonInterface) => {
    return (
        <div>
            <button onClick={() => redirect(`/organization/${orgId}`)}>
                <MoveLeftIcon className="text-white w-5 h-5" />
            </button>
        </div>
    );
};
export default BackButton;