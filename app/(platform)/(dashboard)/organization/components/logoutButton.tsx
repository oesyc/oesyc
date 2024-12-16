"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {data:session} = useSession();
  const handleLogout = async () => {
    setLoading(true);
    localStorage.removeItem("userDetails");
    
    if(session){
      await signOut({ redirect: true, callbackUrl: '/' });
    }
    try {
      // Make an API call to the logout route
      const response = await fetch("/api/delsession", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect user after successful logout (e.g., to the home page)
        window.location.href = "/";
      } else {
        // Handle any errors from the API
        alert("Logout failed, please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }

    setLoading(false);
  };

  return (
    
    <button onClick={handleLogout} disabled={loading} className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 w-full">
      <FaSignOutAlt className="mr-2" />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
