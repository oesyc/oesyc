"use client"; // Ensures this is client-side code

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>; // You can show a loading spinner or message while loading the data
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome to Your Dashboard
        </h2>

        {/* Display user details */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">User Details</h3>
          <p><strong>ID:</strong> {userDetails.id}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Name:</strong> {userDetails.name}</p>
        </div>

        {/* You can add more functionality here */}
        <div className="mt-6">
          <button className="w-full py-2 mt-4 bg-[#6432FF] text-white rounded-lg hover:bg-[#5230d9] transition-colors">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
