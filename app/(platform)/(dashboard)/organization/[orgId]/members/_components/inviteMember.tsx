"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import List from "./list";

interface Board {

    id: string;
    title: string; // Changed from 'name' to 'title'
    orgId: string;
    imageId?: string;
    imageThumbUrl?: string;
}
const InviteMemberForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [boards, setBoards] = useState<Board[]>([]);
    const [selectedBoardId, setSelectedBoardId] = useState("");
    const [lists, setLists] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch('/api/boards/');
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.boards) {
                        setBoards(result.boards);
                        console.log(boards)
                    } else {
                        toast.error("No organizations found.");
                    }
                } else {
                    const result = await response.json();
                    toast.error(result.message);
                }

            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        fetchBoards();
    }, []);

    const handleBoardChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const boardId = e.target.value;

        // Set the selected board ID immediately
        setSelectedBoardId(boardId);

        // Use the boardId directly in the console log and other operations
        
        setActiveTab(boardId);

        // Fetch lists for the selected board
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            alert('Please enter a valid name and email address.');
            return;
        }

        try {
            const response = await fetch("/api/sendemail/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });

            if (response.ok) {
                toast.success(`Invitation sent to ${email}`);
                await response.json();
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to send invitation');
                console.error('Error response:', errorData);
            }
        } catch (error) {
            console.error('Error sending invitation:', error);
            alert('Failed to send invitation');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Invite Member</h2>
            <form className="flex flex-col space-y-4 p-4 border rounded shadow-lg bg-white">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter member's name"
                    className="p-2 border rounded w-full"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter member's email"
                    className="p-2 border rounded w-full"
                    required
                />
                <select
                    onChange={handleBoardChange}
                    className="p-2 border rounded w-full"
                    defaultValue=""
                >
                    <option value="" disabled>Select a board that you want to assign this member</option>
                    {boards.map((board) => (
                        <option className="text-black"
                            key={board.id}
                            value={board.id}
                        >
                            {board.title}
                        </option>
                    ))}
                </select>

            </form>
            {selectedBoardId && (
                <List selectedBoardId={selectedBoardId} name={name} email={email} />
            )}
        </div>
    );
};

export default InviteMemberForm;
