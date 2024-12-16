import { NextRequest, NextResponse } from "next/server";
import { createSession, deleteSession, getSession, updateSession } from "@/lib/session"; // Import session management function
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {  // Change to POST method
  try {
    // Parse the incoming request body (orgId and pageType)
    const { orgId }: { orgId: string} = await req.json();
    if (!orgId) {
      // If either field is missing, return an error response
      return NextResponse.json(
        { error: "orgId and pageType are required" },
        { status: 400 }
      );
    }
    const session = await getSession();
    if(!session){
      redirect("/login");
    }
    const {userName, userId} = session;
    await deleteSession();
    await createSession({ orgId:orgId ,userName:userName,userId:userId,pageType:"", });

    return NextResponse.json({ message: "Session updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json({ error: "Error updating session" }, { status: 500 });
  }
}
