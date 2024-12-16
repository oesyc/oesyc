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
        <div className="space-y-4">
            {/* Chat */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-200 rounded-md">
                <LiaSmsSolid className="h-5 w-5 text-[#454545]" />

            </div>

            {/* Notes */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-200 rounded-md">
                <LuPencilLine className="h-5 w-5 text-[#454545]" />

            </div>

            {/* Meetings */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-200 rounded-md">

                <Link href={`/organization/${orgId}/meetings`}>
                    <SiGooglemeet className="h-5 w-5 text-[#454545]" />
                </Link>

            </div>

            {/* Calls */}
            <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-200 rounded-md">
                <MdPhoneCallback className="h-5 w-5 text-[#454545]" />

            </div>
        </div>
    );
};

export default SmSidebar;
