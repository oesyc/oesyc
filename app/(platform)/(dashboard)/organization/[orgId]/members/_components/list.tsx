import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ListProps {
    selectedBoardId: string | null;
    name: string;
    email:string;

}
interface List {
    id: string;
    title: string;
}

const List = ({selectedBoardId, name, email}:ListProps) => {
    const [lists, setlists] = useState<List[]>([]);
    const [selectedListId, setSelectedListId] = useState<string | null>(null);
    const allList = 'allList';
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch('/api/list/', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({selectedBoardId}),
                  });
            
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.lists) {
                        setlists(result.lists);
                        console.log(lists)
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

        if (selectedBoardId) {
            console.log("selected board", selectedBoardId);
            fetchList();
        }
    }, [selectedBoardId]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        hadnleInvitation();
        
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
            
        }
    };
    const handleListChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const listId = e.target.value; // boardId as a string
        setSelectedListId(listId);
        
        // Fetch related lists for the selected board
    };

    const hadnleInvitation = async () => {
        if (!name || !email || !selectedBoardId || !selectedListId) {
            alert('ivalid details ');
            return;
        }

        try {
            const response = await fetch("/api/invitation/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name:name, email:email,selectedBoardId:selectedBoardId,selectedListId: selectedListId }),
            });
            const result = await response.json();
            if (response.status === 400 && result.message === "User already invited.") {
                toast.error("user Already Invited");  // Show alert if user is already invited
            } else if (response.status === 201) {
                toast.success('Invitation created successfully!');
            } else {
                alert('An error occurred.');
            }
        } catch (error) {
            console.error('Error creating invitation:', error);
            alert('Failed to create invitation');
        }

    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 border rounded shadow-lg bg-white">
                <label>Please select a list that you want to assign to this member</label>
                <select
                    onChange={handleListChange}
                    className="p-2 border rounded w-full"
                    defaultValue=""
                >
                    <option value="" disabled>Select List</option>
                    <option className="text-black"
                            key={allList} 
                            value={allList}
                        >
                            All List
                        </option>
                    {lists.map((list) => (
                        <option className="text-black"
                            key={list.id} 
                            value={list.id}
                        >
                            {list.title}
                        </option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Send Invitation
                </button>
            </form>

        </div>
    );
};
export default List;