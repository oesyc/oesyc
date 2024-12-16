"use client";
import React, { useEffect, useState } from "react";
import { FaIdCard, FaSearch, FaShareAlt } from "react-icons/fa";

import { getUserDetails } from "@/app/_components/getuserdetail";

import { currentOrg } from "@/app/_components/fetchOrg";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import MemberSwitcher from "./memberSwitcher";
interface Memberss {
    profileImage: string;
    email: string;
}
export const Info = () => {

    const user = getUserDetails();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [users, setUsers] = useState<Memberss[]>([]);


    const [organizationName, setOrganizationName] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        // Define the async function inside the useEffect hook
        const fetchOrganization = async () => {
            try {
                const organization = await currentOrg();

                if (organization) {
                    setOrganizationName(organization.name);  // Set the organization name
                } else {
                    setError("Organization not found.");
                }
            } catch (err) {
                setError("Error fetching organization.");
            }
        };

        // Call the async function
        fetchOrganization();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    useEffect(() => {
        // Define the async function inside the useEffect hook
        const fetchMembers = async () => {
            try {
                const response = await fetch('/api/getmembers/');
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.users) {
                        setUsers(result.users);
                    }
                } else {
                    console.log("error");
                }

            } catch (err) {
                setError("Error fetching members.");
            }
        };

        // Call the async function
        fetchMembers();
    }, []);

    return (
        <div className="h-14 px-4 shadow-sm flex item-center z-50">
            <div className="md:max-w-screen-2xl mx-auto flex item-center w-full justify-between">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center">
                        <Image src="/orgicon.png" alt="orgicon" width={45} height={45} />
                        <div className="flex flex-col items-start justify-center ml-2">
                            <h3 className="text-black font-bold text-2xl">{organizationName}</h3>
                            <div className="flex space-x-1">
                                <FaIdCard className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-light text-gray-400">Free</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex space-x-4 md:w-auto items-center justify-center w-full">
                <MemberSwitcher users={users}/>
                    <div className="relative w-1/2 flex items-center justify-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-1 pl-10 pr-4 border bg-gray-100 text-gray-800 focus:outline-none"
                        />
                        <span className="absolute left-3 top-[50%] transform -translate-y-1/2">
                            <FaSearch className="text-gray-400" />
                        </span>
                    </div>

                    {/* Share Button */}
                    <div className="flex justify-center h-2/3 p-3 items-center cursor-pointer bg-gradient-to-r from-blue-800 to-pink-800 text-white hover:bg-blue-700 transition duration-300">
                        <FaShareAlt className="h-3 w-3 mr-2" />
                        <span className="text-sm">Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Info.skeleton = function skeletonInfo(){
    return(
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="h-full w-full absolute"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]"/>
                <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2"/>
                <Skeleton className="h-4 w-[100px]"/>
                </div>
            </div>
        </div>
    );
};