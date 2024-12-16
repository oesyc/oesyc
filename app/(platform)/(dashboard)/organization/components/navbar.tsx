"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getUserDetails } from "@/app/_components/getuserdetail";
import { LuChevronsUpDown } from "react-icons/lu";
import { currentOrg } from "@/app/_components/fetchOrg";
import Image from "next/image";
import Logo from "@/app/_components/logo";
import { FormPopover } from "@/components/form/form-popover";
import { Button } from "@/components/ui/button";
import ProfileSwitcher from "./profileSwitcher";
import { toast } from "sonner";

export const Navbar = () => {

    const user = getUserDetails();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown div
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference to the user info div

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

    

const handleTemplate = async () => {
    try {
        const response = await fetch('/api/template/', { method: 'POST' });
        if(response.ok){
            toast.success("Template has been applied please wait redirecting you");
        }
    } catch (error) {
        console.log("failed to Apply Template");
    }
}


    return (
        <div className="fixed top-0 w-full h-14 px-4 shadow-sm bg-white flex item-center z-50">
            <div className="md:max-w-screen-2xl mx-auto flex item-center w-full justify-between">
                <div className="flex justify-center">
                    <div className="flex justify-center">
                        <Logo />

                    </div>
                    <div>
                        <nav className="flex space-x-4 ml-10 mt-4 text-neutral-400">
                            <Link href="/home" className="text-[#454545] font-light hover:text-black ">
                                Organization
                            </Link>
                            <div ref={containerRef} className="relative">
                                <button
                                    className="flex items-center text-[#454545] hover:text-black"
                                    onClick={toggleDropdown}
                                >
                                    Template
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div ref={dropdownRef} className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-slate-200">
                                        <div className="flex items-center px-4 py-2 border-b cursor-pointer hover:bg-[#E6F6FD]">
                                    <img 
                                        src="/basictemp.png" 
                                        alt="Placeholder Image" 
                                        className="w-6 h-6 rounded-md object-cover" 
                                    />
                                    <button 
                                        className="ml-4 text-gray-700 hover:text-black" 
                                        onClick={handleTemplate}
                                    >
                                        Basic
                                    </button>
                                </div>
                                    </div>
                                )}
                            </div>
                            <Link href="/contact" className="text-[#454545] hover:text-black">
                                Recent
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center justify-center ml-2">
                        <FormPopover align="start" side="bottom" sideOffset={18}>
                            <Button className="rounded-sm hidden md:block h-auto py-1.5 px-2 bg-gradient-to-tr from-blue-800 to-pink-800">
                                Create
                            </Button>
                        </FormPopover>
                    </div>

                </div>
                <div className="flex space-x-4 md:w-auto item-senter justify-center w-full">

                    <div className="flex justify-center items-center">
                        <FaRegBell className="h-6 w-6 text-[#454545]" />
                    </div>

                    <ProfileSwitcher user={user} />
                </div>
            </div>
        </div>
    );
};