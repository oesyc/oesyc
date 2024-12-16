import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(){
    const session = await getSession();
    if(!session){
        return null;
    }
    const {userId, orgId} = session;
    try {
      const user = await prisma.user.findUnique({
        where:{
          id:userId,
        }
      });
      let users;
      if(user?.role === 'OWNER'){

      
        const members = await prisma.organizationMember.findMany({
            where: {
              organizationId: orgId,
            },
            select: {
              userId: true, // Only select the `userId` field
            },
          });
          const userIds = members.map((member) => member.userId);
           users = await prisma.user.findMany({
            where: {
              id: {
                in: userIds, // Use the `in` operator to filter users by IDs
              },
            },
          });
          if (users.length === 0) {
            return NextResponse.json({message: "no members found"})
        }
      
          
          
      } else {
        users = await prisma.user.findMany({
          where: {
            organizations: {
              some: {
                id: orgId, // Match the organization ID
              },
            },
          },
        });
      }
      return NextResponse.json({ users: users });
       
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch users", error }, { status: 500 });
    }
}