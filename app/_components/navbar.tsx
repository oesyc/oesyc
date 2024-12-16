"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
export const Navbar = () => {

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
                                Home
                            </Link>
                            <Link href="/about" className="text-neutral-400 hover:text-black ">
                                About
                            </Link>
                            <Link href="/contact" className="text-neutral-400 hover:text-black">
                                Contact
                            </Link>
                        </nav>
                    </div>
                    
                </div>
                <div className="space-x-4 md:block md:w-auto flex item-senter justify-between w-full">
                    <Button className="mt-2 bg-transparent text-black hover:text-white border border-fuchsia-700 rounded-none px-6 hover:bg-gradient-to-r from-[#6432FF] to-[#EC0BE9]">
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                    <Button className="mt-2 p-5 bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] rounded-none">
                        <Link href="/register">
                            Get Started
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};