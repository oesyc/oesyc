import { SessionOptions } from 'iron-session';
import { cookies } from 'next/headers'; // for Next.js 13+ edge runtime

// Define your session structure
export interface Session {
  userId: string;
  userName: string;
  orgId: string;
  pageType:string | null;
}

// Define the session options
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string, // Secret for encryption
  cookieName: "my_session", // Cookie name
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    sameSite: 'lax', // SameSite policy for cookies
    httpOnly: true, // Prevent JS access to cookie
    path: '/', // Available on all paths
    maxAge: 60 * 60 * 24 * 7, // 7 days expiration
  },
};

// Function to create a session
export async function createSession(sessionData: Session) {
  const cookieStore = await cookies();
  cookieStore.set('my_session', JSON.stringify(sessionData), sessionOptions.cookieOptions);
}

// Function to get the session
export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('my_session');
  if (!sessionCookie) return null;
  return JSON.parse(sessionCookie.value) as Session;
}

// Function to delete the session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('my_session');
}
export async function updateSession(updatedData: Partial<Session>) {
  const currentSession = await getSession();

  if (!currentSession) {
    throw new Error('No session found to update');
  }

  // Merge updated data with current session data
  const newSessionData: Session = {
    ...currentSession,
    ...updatedData,
  };

  // Update the session cookie
  const cookieStore = await cookies();
  cookieStore.set('my_session', JSON.stringify(newSessionData), {
    ...sessionOptions.cookieOptions,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Ensure a new expiration
  });
}