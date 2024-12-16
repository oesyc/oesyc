"use client";
import React, { useState } from "react";
import InviteMemberForm from "./inviteMember";
import RequestList from "./requestlist";
import ApprovedMember from "./approved-member";

// Components for the tabs





const Tabs = () => {
    const [activeTab, setActiveTab] = useState("colaborators");

    return (
        <div className="w-full">
            <div className="flex mt-4">
                {/* Vertical tabs */}
                <div className="w-1/4 border-r">
                    <ul className="flex flex-col space-y-2">
                    <li>
                            <button
                                onClick={() => setActiveTab("colaborators")}
                                className={`w-full text-left p-2 hover:bg-[#F2F2FF] ${
                                    activeTab === "colaborators" ? "bg-[#F2F2FF]" : ""
                                }`}
                            >
                               Workspace Members
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("invite")}
                                className={`w-full text-left p-2 hover:bg-[#F2F2FF] ${
                                    activeTab === "invite" ? "bg-[#F2F2FF]" : ""
                                }`}
                            >
                                Invite Member
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("guest")}
                                className={`w-full text-left p-2 hover:bg-[#F2F2FF] ${
                                    activeTab === "guest" ? "[#F2F2FF]" : ""
                                }`}
                            >
                                Guest
                            </button>
                        </li>
                        
                       
                    </ul>
                </div>
                {/* Tab content */}
                <div className="w-3/4 px-8">
                    {activeTab === "invite" && <InviteMemberForm />}
                    {activeTab === "colaborators" && <ApprovedMember />}
                    {activeTab === "guest" && <RequestList />}
                </div>
            </div>
        </div>
    );
};

export default Tabs;
