"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import 'react-calendar/dist/Calendar.css';

import { Info } from '../settings/_components/info';
import { toast } from 'sonner';

interface Booking {
    date: string;
    timeSlot: string;
    heading: string;
}

const BookingCalendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);

    const [newMeetingHeading, setNewMeetingHeading] = useState('');

    useEffect(() => {
        // Fetch all booked meetings from the server
        const fetchBookings = async () => {
            try {
                const response = await fetch('/api/meetings/');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);
    

    const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Handle different potential types of value
        if (value instanceof Date) {
            setSelectedDate(value);
            fetchAvailableSlots(value);
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setSelectedDate(value[0]);
            fetchAvailableSlots(value[0]);
        }
    };

    const fetchAvailableSlots = (date: Date) => {
        const dateStr = date.toISOString();
        // Assume we have slots from 9 AM to 5 PM
        const allSlots = [
            '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
        ];
        const bookedSlots = bookings
            .filter((booking) => booking.date === dateStr)
            .map((booking) => booking.timeSlot);

        setAvailableSlots(allSlots.filter((slot) => !bookedSlots.includes(slot)));
    };

    const handleBooking = async () => {
        if (!selectedDate || !newMeetingHeading || availableSlots.length === 0) {
            alert('Please select a date, time slot, and provide a heading.');
            return;
        }

        const dateStr = selectedDate.toISOString();
        
        const timeSlot = availableSlots[0]; // Select the first available slot

        try {
            const response = await fetch("/api/getmeetings/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    date: dateStr, 
                    timeSlot:timeSlot, 
                    heading: newMeetingHeading 
                })
            });
    
    
            if (response.ok) {
                const newMeeting = await response.json();
                toast.success("Meeting scheduled successfully");
                
                
                // Update local state to reflect the new booking
                setBookings([...bookings, newMeeting]);
                
                
                // Reset form
                setNewMeetingHeading('');
                setSelectedDate(null);
                setAvailableSlots([]);
            } else {
                toast.error("Failed to schedule meeting");
            }
        } catch (error) {
            console.error('Complete error object:', error);
            toast.error('There was an error booking the meeting. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div>
                <Info/>
                <h1 className="text-2xl font font-semibold text-black">Schedule Your Meetings with Ease</h1>
            </div>
            <div className="flex gap-x-11">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="w-[600px]"
                    tileDisabled={({ date, view }) => {
                        if (view === 'month') {
                            const dateStr = date.toISOString().split('T')[0];
                            const bookedSlotsForDate = bookings.filter(
                                booking => new Date(booking.date).toISOString().split('T')[0] === dateStr
                            );
                    
                            // Agar total 9 slots book ho chuke hain to date disable kar do
                            return bookedSlotsForDate.length >= 9;
                        }
                        return false;
                    }}
                />
                {selectedDate && (
                    <div className="mt-4">
                        <h2>Select a Time Slot</h2>
                        <ul className="grid grid-cols-3 gap-4 mt-4">
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot, index) => (
                                    <li key={index} className="flex justify-center">
                                        <button
                                            className="w-full p-2 border rounded hover:bg-gray-200"
                                            onClick={() => setNewMeetingHeading(slot)}
                                        >
                                            {slot}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p className="col-span-full text-center mt-4">No available slots for this date.</p>
                            )}
                        </ul>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Name your Meeting"
                                value={newMeetingHeading}
                                onChange={(e) => setNewMeetingHeading(e.target.value)}
                                className="border p-2 rounded"
                            />
                            <button
                                onClick={handleBooking}
                                className="ml-2 bg-gradient-to-tr from-[#6633FF] to-[#EB0CE9] text-white p-2 rounded hover:bg-blue-700"
                            >
                                Book Meeting
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingCalendar;
