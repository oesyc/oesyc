"use client";
import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FileTextIcon, SettingsIcon, UsersIcon, CalendarIcon, TableIcon, Plus } from 'lucide-react';
import Logo from "@/app/_components/logo";  // Assuming Logo is a component

import Image from "next/image";
import { PlusIcon } from "lucide-react";

import { getOrgId } from "@/app/_components/getorgid";
import { getUserDetails } from "@/app/_components/getuserdetail";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";


// Define the types
interface Organization {
    id: string;
    name: string;
    // No imageUrl here since you're using a dummy image
}



const Sidebar = () => {
    const [currentPage, setCurrentPage] = useState<string | null>(null);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [error, setError] = useState("");

    const userDetails = getUserDetails();

    useEffect(() => {
        const fetchOrganizations = async () => {
            if (userDetails) {
                try {
                    const response = await fetch(`/api/orgstore`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch organizations.");
                    }
                    const result = await response.json().catch((e) => {
                        console.error("Failed to parse JSON:", e);
                        return {};
                    });
                    if (result && result.organizations) {
                        setOrganizations(result.organizations);
                    } else {
                        setError("No organizations found.");
                    }
                } catch (err) {
                    setError("Error fetching organizations.");
                    console.error(err);
                }
            }
        };
        fetchOrganizations();
    }, [userDetails]);


    const activeOrg = getOrgId();
    const handleLinkClick = async (orgId: string, pageType: string) => {
        localStorage.setItem("pageType", JSON.stringify(pageType));
        localStorage.setItem("orgdetails", JSON.stringify(orgId));
        try {
            // Store session data via API
            const response = await fetch('/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orgId }),
            });

            if (!response.ok) { // If the response status is not 2xx
                const errorData = await response.json(); // Parse the error message from the response
                console.error('Error storing session:', errorData.error); // Log the error message
                alert(errorData.error); // Optionally show an alert or handle the error visually
            } else {

            }



        } catch (error) {
            console.error("Error storing session data:", error);
        }
        redirect(`/organization/${orgId}/${pageType}`);
    };

    useEffect(() => {
        // Retrieve org details from localStorage when the component mounts
        const pagetype = localStorage.getItem("pageType");
        if (pagetype) {
            try {
                const parsedDetails = JSON.parse(pagetype);
                setCurrentPage(parsedDetails.pagetype); // Set the active page type
            } catch (error) {
                console.error("Error parsing org details from localStorage:", error);
            }
        }
    }, []);


    return (
        <div className="flex flex-col ">
           
            {/* Profile Icon and My Work */}
            <div className="flex items-center justify-between mb-2 p-2">
                <p className="text-gray-500 font-light">WorkPlace</p>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <Link href="/select-org">
                        <Plus className="h-4 w-4 " />
                    </Link>
                </Button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Organizations Section */}
            <div className="mt-6">

                <Accordion type="single" collapsible defaultValue={activeOrg ? activeOrg : undefined}>
                    {organizations.map((org) => (
                        <AccordionItem key={org.id} value={org.id}>
                            {/* Accordion Trigger with dynamic image and active state */}
                            <AccordionTrigger
                                className={`flex items-center justify-between p-2 text-lg font-semibold text-gray-700 hover:bg-[#e6f6fd6a] hover:no-underline cursor-pointer ${org.id === activeOrg ? "bg-[#E6F6FD]" : ""}`}
                            >
                                <div className="flex items-center space-x-4">
                                    {/* Organization Image */}
                                    <Image src="/orgicon.png" alt="orgimg" width={25} height={25} />
                                    <span className="text-gray-800 font-light text-sm hover:no-underline">{org.name}</span>
                                </div>
                            </AccordionTrigger>

                            {/* Accordion Content with active link styling */}
                            <AccordionContent>
                                <div className="flex justify-center">
                                    <div className="space-y-2 px-3 py-2 text-gray-600">
                                        {/* Board Link */}
                                        <span
                                            onClick={() => { handleLinkClick(org.id, ""); }}
                                            className={`block hover:bg-gray-300 px-2 py-1 rounded-md ${org.id === activeOrg && currentPage === "" ? "text-black bg-black" : ""}`}
                                        >
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                {/* Icon for Board */}
                                                <FileTextIcon className="w-4 h-4" />
                                                <span>Board</span>
                                            </div>
                                        </span>

                                        {/* Settings Link */}
                                        <span
                                            onClick={() => { handleLinkClick(org.id, "settings"); }}
                                            className={`block hover:bg-gray-300 px-2 py-1 rounded-md ${org.id === activeOrg && currentPage === "settings" ? "text-black bg-[#E6F6FD]" : ""}`}
                                        >
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                {/* Icon for Settings */}
                                                <SettingsIcon className="w-4 h-4" />
                                                <span>Settings</span>
                                            </div>
                                        </span>

                                        {/* Members Link */}
                                        <span
                                            onClick={() => { handleLinkClick(org.id, "members"); }}
                                            className={`block hover:bg-gray-300 px-2 py-1 rounded-md ${org.id === activeOrg && currentPage === "members" ? "text-black bg-[#E6F6FD]" : ""}`}
                                        >
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                {/* Icon for Members */}
                                                <UsersIcon className="w-4 h-4" />
                                                <span>Members</span>
                                            </div>
                                        </span>

                                        {/* Calendar Link */}
                                        <span
                                            onClick={() => { handleLinkClick(org.id, "calendar"); }}
                                            className={`block hover:bg-gray-300 px-2 py-1 rounded-md ${org.id === activeOrg && currentPage === "calendar" ? "text-black bg-[#E6F6FD]" : ""}`}
                                        >
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                {/* Icon for Calendar */}
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>Calendar</span>
                                            </div>
                                        </span>

                                        {/* Table Link */}
                                        <span
                                            onClick={() => { handleLinkClick(org.id, "table"); }}
                                            className={`block hover:bg-gray-300 px-2 py-1 rounded-md ${org.id === activeOrg && currentPage === "table" ? "text-black bg-[#E6F6FD]" : ""}`}
                                        >
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                {/* Icon for Table */}
                                                <TableIcon className="w-4 h-4" />
                                                <span>Table</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Sidebar;
