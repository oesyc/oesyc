import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Invitations {
    id: string,
    name: string,
    email: string,
    status: string,
}
const RequestList = () => {
    const [invitations, setInvitations] = useState<Invitations[]>([]);
    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await fetch('/api/getinv/');
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.invitations) {
                        setInvitations(result.invitations);

                    } else {
                        toast.error("No invitations found.");
                    }
                } else {
                    const result = await response.json();
                    toast.error(result.message);
                }

            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        fetchInvitations();
    }, []);


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Guest({invitations.length})</h2>
            
            <div className="space-y-1">
                {/* Show a message if no invitations are present */}
                {invitations.length === 0 ? (
                    <p className="text-center text-gray-700 text-lg">
                        There are no guests invited for this organization.
                    </p>
                ) : (
                    // Map through invitations and display the new layout
                    invitations.map((invitation, index) => {
                        // Generate a unique background color for each invitation
                        const bgColors = ["bg-red-100", "bg-yellow-100", "bg-purple-100", "bg-blue-100"];
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

                                {/* Right Section: ID and Status */}
                                <div className="flex items-center space-x-8">
                                    {/* ID */}
                                    <span className="text-gray-700 font-medium">ID: {invitation.id}</span>

                                    {/* Status Button */}
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                        Pending
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

export default RequestList;
