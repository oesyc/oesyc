"use client";
import { useEffect, useState } from "react";
import { Info } from "../settings/_components/info";
import { Button } from "@/components/ui/button";

const MeetingPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
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

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="w-full">
            <div>
                <Info />
            </div>
            {bookings && bookings.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px' }}>
                {bookings.map((booking, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: getRandomColor(),
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <h3 style={{ margin: '0 0 10px' }}>{booking.heading}</h3>
                        <p style={{ margin: '0 0 5px' }}>{new Date(booking.date).toLocaleDateString()}</p>
                        <p style={{ margin: '0' }}>{booking.timeSlot && booking.timeSlot.toString()}</p>
                        {/* Add the "Start" button */}
                        <Button className="px-8 py1 bg-gradient-to-tr from-[#6834FF] to-[#ED0DEA] mt-3">
                            START
                        </Button>
                    </div>
                ))}
            </div>
            ):( 
            <div className="w-full">
                <p className="text-black font-bold">Please Add Meetings in Calendar. There are no Meetings set yet for this Organization</p>
            </div>
        )}
        </div>
    );
};

export default MeetingPage;
