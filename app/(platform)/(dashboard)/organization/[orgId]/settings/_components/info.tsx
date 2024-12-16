"use client";
import React, { useEffect, useState } from "react";
import { FaIdCard, FaSearch, FaShareAlt } from "react-icons/fa";

import { getUserDetails } from "@/app/_components/getuserdetail";

import { currentOrg } from "@/app/_components/fetchOrg";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
export const Info = () => {

    const user = getUserDetails();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


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

    return (
        <div className="h-14 px-4 flex item-center">
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