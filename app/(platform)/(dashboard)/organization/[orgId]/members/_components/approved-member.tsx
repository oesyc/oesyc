import { Divide } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ApprovedInvitations {
    id: string,
    name: string,
    email: string,
    status: string,
}
const ApprovedMember = () => {
    const [approvedinvitations, setApprovedInvitations] = useState<ApprovedInvitations[]>([]);
    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await fetch('/api/approvedinv/');
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.invitations) {
                        setApprovedInvitations(result.invitations);

                    } else {
                        toast.error("No Approved Members");
                    }
                } else {
                    const result = await response.json();
                    toast.error(result.message);
                }

            } catch (error) {
                console.error('Error fetching approved invitations:', error);
            }
        };

        fetchInvitations();
    }, []);


    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-1">Workspace Members({approvedinvitations.length})</h2>
            <p className="text-[#454545] mb-4">These are the Members who have acess for this organization</p>
            <div className="space-y-1">
                {/* Show a message if no members are present */}
                {approvedinvitations.length === 0 ? (
                    <p className="text-center text-gray-700 text-lg">
                        This organization currently does not have any members.
                    </p>
                ) : (
                    // Map through invitations and display the new layout
                    approvedinvitations.map((invitation, index) => {
                        // Generate a unique background color for each user
                        const bgColors = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-pink-100"];
                        const bgColor = bgColors[index % bgColors.length];

                        return (
                            <div
                                key={invitation.id}
                                className={`flex justify-between items-center p-2 ${bgColor}`}
                            >
                                {/* Left Section: Name and Email */}
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800">{invitation.name}</span>
                                    <span className="text-sm text-gray-600">{invitation.email}</span>
                                </div>

                                {/* Right Section: Member and Status */}
                                <div className="flex items-center space-x-8">
                                    {/* Member Text */}
                                    <span className="text-gray-700 font-medium">Member</span>

                                    {/* Status Button */}
                                    <button className="bg-green-800 text-white px-3 py-1 rounded">
                                        Approved
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

        </div>
    );
};

export default ApprovedMember;
