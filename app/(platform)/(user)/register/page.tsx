"use client";
import { useSession, signIn } from "next-auth/react"

import Logo from '@/app/_components/logo';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";

interface Invitations {
    id: string,
    name: string,
    email: string,
    status: string,
}

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { data: session } = useSession();
    const [invitations, setInvitations] = useState<Invitations[]>([]);

    // const fetchInvitations = async (email: string) => {
    //     try {
    //         const response = await fetch('/api/checkinv/', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email }),
    //         });
    //         if (response.ok) {
    //             const result = await response.json();
    //             if (result && result.invitations) {
    //                 setInvitations(result.invitations);
    //                 console.log("invitaions", invitations);
    //             } else {
    //                 console.log("error");
    //             }
    //         } else {
    //             const result = await response.json();
    //             console.log("response not ok");
    //         }

    //     } catch (error) {
    //         console.error('Error fetching invitations:', error);
    //     }
    // };

    useEffect(() => {
        const handleGoogleLogin = async () => {
            if (session) {

                const name = session.user?.name;
                const email = session.user?.email;
                // if (email) {
                //     fetchInvitations(email);
                // }
                // console.log(invitations.length);
                // if (invitations.length >= 1) {
                //     try {
                //         // Assuming you have an API endpoint for signup
                //         const response = await fetch('/api/member/', {
                //             method: 'POST',
                //             headers: { 'Content-Type': 'application/json' },
                //             body: JSON.stringify({ name, email }),
                //         });

                //         if (response.ok) {
                //             toast.success("redirecting please wait");
                //             window.location.href = "/login"; // Redirect after successful signup
                //         } else {
                //             toast.error("sign up failed");
                //         }
                //     } catch (error) {
                //         console.error('An error occurred:', error);
                //     }
                // } else {
                    try {
                        // Assuming you have an API endpoint for signup
                        const response = await fetch('/api/register', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, email }),
                        });

                        if (response.ok) {
                            console.log('User created successfully!');
                            window.location.href = "/login"; // Redirect after successful signup
                        } else {
                            console.error('Signup failed. Please try again.');
                        }
                    } catch (error) {
                        console.error('An error occurred:', error);
                    }
                //}
            }
        };

        // Call the function once when the session is available
        if (session) {
            handleGoogleLogin();
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simple client-side validation
        if (!name || !email) {
            setError('All fields are required.');
            return;
        }
        // if (email) {
        //     fetchInvitations(email);
        // }

        // if (invitations) {
        //     try {
        //         // Assuming you have an API endpoint for signup
        //         const response = await fetch('/api/member/', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ name, email }),
        //         });

        //         if (response.ok) {

        //             window.location.href = "/login"; // Redirect after successful signup
        //         } else {
        //             console.error('Signup failed. Please try again.');
        //         }
        //     } catch (error) {
        //         console.error('An error occurred:', error);
        //     }
        // } else {

            // You can integrate with Prisma here to create a user in the database
            // Example API call for user creation
            try {
                // Assuming you have an API endpoint for signup
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email }),
                });

                if (response.ok) {
                    // Redirect to login or dashboard
                    console.log('User created successfully!');
                    window.location.href = "/login";
                } else {
                    setError('Signup failed. Please try again.');
                }
            } catch (error) {
                setError('An error occurred. Please try again.');
            }
        //}

    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Toggle the password visibility
    };

    return (
        <div className="w-full flex items-center justify-center p-11 min-h-screen">
            <div className="flex bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] items-center justify-center overflow-hidden w-3/4 ">
                <div>

                    <Image src="/loginback.png" alt="loginback" width={415} height={415} />


                </div>
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="mb-8">
                        <Logo />
                    </div>
                    <div
                        onClick={() => signIn("google")}
                        className="flex items-center justify-center mt-3 mb-3 border border-pink-700 p-1 space-x-3 cursor-pointer"
                    >
                        <Image src="/googleicon.png" width={40} height={40} alt="google"></Image>
                        <span className="">Sign-up With Google</span>
                    </div>
                    <h2 className="text-2xl font-light text-center text-gray-800 mb-6">
                        OR
                    </h2>

                    {/* Display error message if any */}
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>

                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 rounded-none bg-[#F2F2FF] focus:outline-none focus:border-[#6432FF]"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Field */}
                        <div>

                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 rounded-none bg-[#F2F2FF] focus:outline-none focus:border-[#6432FF]"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}


                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-gradient-to-r from-[#6432FF] to-pink-800 text-white rounded-none hover:bg-[#5230d9] transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">Already have an account? <a href="/login" className="text-[#6432FF] font-medium hover:underline">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
