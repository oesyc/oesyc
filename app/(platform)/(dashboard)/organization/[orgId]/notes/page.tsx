"use client";
import React, { useEffect, useState } from 'react';
import {
    Notebook,
    Plus,
    Search,
    Filter,
    Star,
    Archive,
    Trash2,
    Check
} from 'lucide-react';
import { Info } from '../settings/_components/info';
import { Separator } from '@/components/ui/separator';

// Note Interface
interface Note {
    id: string;
    title: string;
    content: string;
    priority: string;
    category?: string;
    createdAt: Date;
}

const NotesApp: React.FC = () => {
    // State Management
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState({
        title: '',
        content: '',
        priority: '',
        category: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPriority, setFilterPriority] = useState<string | null>(null);


    
        const fetchNotes = async () => {
            const response = await fetch('/api/notes/'); // API Route
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                console.error("Failed to fetch notes");
            }
        };

        useEffect(() => {
            fetchNotes();
        }, []);

    // Note Creation Handler
    const handleCreateNote = async () => {
        if (!newNote.title || !newNote.content || !newNote.priority) {
            alert("Title and content are required");
            return;
        }

        try {
            const response = await fetch('/api/notes/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNote),
            });

            if (response.ok) {
                const data = await response.json();
                fetchNotes();
                setNotes([...notes, data]); // Update notes with new note
            } else {
                const error = await response.json();
                if (error.status === 400) {
                    alert("missing field");
                }
                if (error.status === 500) {
                    alert("failed to create");
                }
                alert(error.error)
            }
        } catch (error) {
            console.error("Error saving note:", error);
        }

        setIsModalOpen(false);
        setNewNote({ title: "", content: "", priority: "", category: "" });
    };

    // Filtered Notes
    const validNotes = notes.filter(note => note.title && note.priority);

    const filteredNotes = validNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterPriority ? note.priority === filterPriority : true)
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Info/>
            <Separator/>
            <div className="container mx-auto mt-5">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <Notebook className="text-purple-600" size={36} />
                        <h1 className="text-3xl font-bold text-gray-800">Notes</h1>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="flex space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        </div>

                        <div className="flex space-x-2 items-center">
                            {[
                                { level: 'LOW', color: 'text-green-500', label: 'Low Priority' },
                                { level: 'MEDIUM', color: 'text-yellow-500', label: 'Medium Priority' },
                                { level: 'HIGH', color: 'text-red-500', label: 'High Priority' }
                            ].map(({ level, color, label }) => (
                                <div
                                    key={level}
                                    className="flex items-center space-x-1 group"
                                >
                                    <button
                                        onClick={() => setFilterPriority(
                                            filterPriority === level ? null : level
                                        )}
                                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition ${filterPriority === level
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <Star
                                            size={20}
                                            className={`${color} ${filterPriority === level ? 'text-white' : ''
                                                }`}
                                        />
                                        <span className="text-sm">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                                    </button>

                                    {/* Tooltip */}
                                    <div className="relative">
                                        <div className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 
          bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300">
                                            {label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition"
                        >
                            <Plus size={20} />
                            <span>New Note</span>
                        </button>
                    </div>
                </header>

                {/* Notes Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map(note => (
                        <div
                            key={note.id}
                            className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-xl transition"
                        >
                            <div className="absolute top-4 right-4 flex space-x-2">
                                
                                <button className="text-gray-400 hover:text-red-500">
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                                {note.title}
                            </h2>

                            <p className="text-gray-600 mb-4">
                                {note.content}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${note.priority === 'HIGH'
                                    ? 'bg-red-100 text-red-800'
                                    : note.priority === 'MEDIUM'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                    {note.priority} Priority
                                </span>

                                <span className="text-sm text-gray-500">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* New Note Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Note</h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Note Title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />

                                <textarea
                                    placeholder="Note Content"
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />

                                <div className="flex space-x-4">
                                    <select
                                        value={newNote.priority}
                                        onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="" disabled>select periority</option>
                                        <option value="LOW">Low Priority</option>
                                        <option value="MEDIUM">Medium Priority</option>
                                        <option value="HIGH">High Priority</option>
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="Category (Optional)"
                                        value={newNote.category}
                                        onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateNote}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        Create Note
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {notes.length === 0 && (
                    <div className="text-center mt-16">
                        <Notebook className="mx-auto text-gray-300 mb-4" size={64} />
                        <p className="text-xl text-gray-500">
                            You haven't created any notes yet.
                            <br />
                            Click "New Note" to get started!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesApp;