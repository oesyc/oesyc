"use client";
import { getOrgId } from "@/app/_components/getorgid";
import Link from "next/link";
import { LiaSmsSolid } from "react-icons/lia";
import { LuPencilLine } from "react-icons/lu";;
import { SiGooglemeet } from "react-icons/si";
import { MdPhoneCallback } from "react-icons/md";

const SmSidebar = () => {
    const orgId = getOrgId();
    return (
        <div className="space-y-4 bg-transparent">
            {/* Chat */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-black rounded-md">
                <LiaSmsSolid className="h-5 w-5 text-white" />

            </div>

            {/* Notes */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-black rounded-md">
                <LuPencilLine className="h-5 w-5 text-white" />

            </div>

            {/* Meetings */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-black rounded-md">

                <Link href={`/organization/${orgId}/meetings`}>
                    <SiGooglemeet className="h-5 w-5 text-white" />
                </Link>

            </div>

            {/* Calls */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-black rounded-md">
                <MdPhoneCallback className="h-5 w-5 text-white" />

            </div>
        </div>
    );
};

export default SmSidebar;
