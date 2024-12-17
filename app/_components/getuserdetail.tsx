"use client";
export const getUserDetails = () => {
    if (typeof window !== "undefined") {
      const userDetails = localStorage.getItem("userDetails");
      return userDetails ? JSON.parse(userDetails) : null;
    }
    return null;
  };
  