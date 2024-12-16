import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/session'; // Import the deleteSession function

export async function POST() {
  try {
    // Call the deleteSession function to remove the session cookie
    await deleteSession();

    // Return a success response
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    // Handle any errors during the session deletion
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
