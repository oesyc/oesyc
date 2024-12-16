"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getUserDetails } from "@/app/_components/getuserdetail";
import { LuChevronsUpDown } from "react-icons/lu";
import { currentOrg } from "@/app/_components/fetchOrg";
import Image from "next/image";
import Logo from "@/app/_components/logo";
import ProfileSwitcher from "../../../organization/components/profileSwitcher";

export const Navbar = () => {

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
        <div className="fixed top-0 w-full h-14 px-4 shadow-sm bg-white flex item-center z-50">
            <div className="md:max-w-screen-2xl mx-auto flex item-center w-full justify-between">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center">
                        <Logo/>
                    </div>
                    <div>
                        <nav className="flex space-x-4 ml-10 mt-4 text-neutral-400">
                            <Link href="/home" className="text-neutral-400 hover:text-black ">
                                Organization
                            </Link>
                            <Link href="/about" className="text-neutral-400 hover:text-black ">
                                Template
                            </Link>
                            <Link href="/contact" className="text-neutral-400 hover:text-black">
                                Recent
                            </Link>
                        </nav>
                    </div>

                </div>
                <div className="flex space-x-4 md:w-auto item-senter justify-center w-full">
                <div className="flex justify-center items-center">
                        <FaRegBell className="h-6 w-6 text-blue-800" />
                    </div>
                    
                    <ProfileSwitcher user={user}/>
                </div>
            </div>
        </div>
    );
};