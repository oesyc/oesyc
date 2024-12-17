// pages/organization/index.tsx

"use client";

import { getUserDetails } from "@/app/_components/getuserdetail";
import { MoveRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";


const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Fetch user details only on client-side
    const fetchedUserDetails = getUserDetails();
    setUserDetails(fetchedUserDetails);
  }, []);
  // Fetch organizations when the component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      if (userDetails) {
        try {
          const response = await fetch(`/api/orgstore`);

          // Check if the response is successful
          if (!response.ok) {
            throw new Error("Failed to fetch organizations.");
          }

          // Check if response is empty
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
  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName) {
      setError("Organization name is required.");
      return;
    }

    try {
      const response = await fetch("/api/orgcreate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: organizationName, userId: userDetails.id }),
      });

      const result = await response.json();
      if (response.ok) {
        // Redirect to dashboard or some other page after successful creation
        const orgId = result.organization.id;
        localStorage.setItem('orgdetails', JSON.stringify(orgId));
        window.location.href = `/organization/${orgId}`;
      } else {
        setError(result.message || "Failed to create organization");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  const handleOrgSelect = async (orgId: string) => {
    localStorage.setItem('orgdetails', JSON.stringify(orgId));
    try {
      // Store session data via API
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orgId}),
      });
  
      if (!response.ok) { // If the response status is not 2xx
          const errorData = await response.json(); // Parse the error message from the response
          console.error('Error storing session:', errorData.error); // Log the error message
          alert(errorData.error); // Optionally show an alert or handle the error visually
        } else{
          window.location.href = `/organization/${orgId}`;
        }
  
      // Redirect to the respective page
      
    } catch (error) {
      console.error("Error storing session data:", error);
    } // Navigate to the organization's details page
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-12 bg-cover bg-center" style={{ backgroundImage: "url('/orgbg.jpg')" }}>
      <div className=" flex flex-col items-start w-2/3 ml-16">
        <div className="flex items-center justify-center mb-4">
          <h1 className="italic font-semibold text-black mr-3 text-3xl">
            Hi, Mr
          </h1>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] text-transparent bg-clip-text">{userDetails ? userDetails.name : ""},</h1>
        </div>
        <div className="mb-4">
          <h2 className="text-4xl font-semibold text-[#6432FF]">
            WE BRINGS ALL YOUR TASK'S,TEAMS AND TOOLS TOGATHER
          </h2>
        </div>

        {/* Show Organizations */}
        {organizations.length === 0 ? (
          <p className="text-center text-gray-600 mb-6">Please create organization to move further</p>
        ) : (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Organizations</h3>
            <ul className="space-y-4">
              {organizations.map((org: { name: string, id: string }) => (
                <li
                  key={org.id}
                  className="flex items-center space-x-3 text-gray-800 cursor-pointer hover:bg-slate-50"
                  onClick={() => handleOrgSelect(org.id)} // Keep this functionality as it is
                >
                  <img src="/orgicon.png" alt="orgicon" width={40} height={40} />
                  <span>{org.name}</span> {/* Organization name */}
                  <MoveRightIcon className="w-4 h-4"/>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Create Organization Form */}
        <form onSubmit={handleCreateOrganization} className="space-y-4">
          <div>
            <input
              type="text"
              id="organizationName"
              className="w-full px-4 py-2 border border-[#6432FF] rounded-none focus:outline-none focus:border-[#6432FF] bg-transparent"
              placeholder="Enter organization name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-gradient-to-r from-[#6432FF] to-[#d93030] text-white rounded-none"
          >
            Create Organization
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <img src="/orgimg.webp" alt="orgimg" />
      </div>
    </div>
  );
};

export default OrganizationPage;
