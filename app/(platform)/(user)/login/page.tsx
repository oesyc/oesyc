"use client";
import Logo from "@/app/_components/logo";
import SnowEffect from "@/app/_components/snoweffect";
import { useSession, signIn } from "next-auth/react"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Otp from "./_components/otp";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState("");

  const { data: session } = useSession();
  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (session) {
        const email = session.user?.email;
        // Or set a real password if needed for your application
        console.log(session.user?.email)
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          const result = await response.json();

          if (response.ok) {
            localStorage.setItem('userDetails', JSON.stringify(result.userDetails));
            window.location.href = "/select-org"; // Change this to your protected route
          } else {
            setError(result.message || "Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Login error:", error);
          setError("An error occurred. Please try again.");
        }
      }
    };

    // Call the function once when the session is available
    if (session) {
      handleGoogleLogin();
    }
  }, [session]);
  const sendOtp = async () => {
    try {
      const response = await fetch("/api/sendotp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });


      if (response.ok) {
        const data = await response.json();
        setGeneratedOtp(data.otp); // Save the generated OTP for validation
        toast.success("OTP sent successfuly")
      } else {
        toast.error("Failed to send otp")
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred while sending the OTP.');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("email required.");
      return;
    }
    sendOtp();
    setActive("active");
  };
  return (
    <div className="w-full flex items-center justify-center p-11 min-h-screen">
      {active === "active" ? (
            <Otp generatedOtp={generatedOtp} email={email} />
          ) : (
      <div className="flex bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] items-center justify-center overflow-hidden w-3/4 ">
        <div>
          
            <Image src="/loginback.png" alt="loginback" width={415} height={415} />
          

        </div>
        <div className="w-full max-w-md p-8 bg-white rounded-none shadow-lg mr-12">
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
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
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



            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gradient-to-r from-[#6432FF] to-pink-800 text-white rounded-none hover:bg-[#5230d9] transition-colors"
            >
              Sign In To Your Account
            </button>
          </form>


          {/* Additional Links */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-[#6432FF] font-medium hover:underline">
                Sign up
              </a>
            </p>
            <p className="text-gray-600 mt-2">
              <a href="#" className="text-[#6432FF] font-medium hover:underline">
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default LoginPage;
