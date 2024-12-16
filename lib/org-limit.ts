import { MAX_FREE_BOARDS } from "@/constants/boards";

import { db } from "./db";
import { getSession } from "./session";
import { redirect } from "next/navigation";

export const IncreamentAvailbleCount = async () =>{

    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const {userId, orgId}= session;
    if(!orgId){
        throw new Error("unauthorized");
    }
    const orgLimit = await db.orgLimit.findUnique({
        where:{
            orgId,
        },

    });

    if(orgLimit){
        await db.orgLimit.update({
            where:{orgId},
            data:{count: orgLimit.count + 1}
        });
    } else{
        await db.orgLimit.create({
            data:{ orgId, count: 1,}
        });
    }
};

export const DecreaseAvailbleCount = async () =>{
    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const {userId, orgId}= session;
    if(!orgId){
        throw new Error("unauthorized");
    }
    const orgLimit = await db.orgLimit.findUnique({
        where:{
            orgId,
        },

    });

    if(orgLimit){
        await db.orgLimit.update({
            where:{orgId},
            data:{count: orgLimit.count > 0 ? orgLimit.count - 1 : 0}
        });
    } else{
        await db.orgLimit.create({
            data:{ orgId, count: 1,}
        });
    }
};

export const hasAvailableCount  = async () =>{
    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const {userId, orgId}= session;
    if(!orgId){
        throw new Error("unauthorized");
    }
    const orgLimit = await db.orgLimit.findUnique({
        where:{
            orgId,
        },

    });
    if(!orgLimit || orgLimit.count < MAX_FREE_BOARDS){
        return true;
    } else{
        return false;
    }
};
export const getAvailableCount  = async () =>{
    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const {userId, orgId}= session;
    if(!orgId){
        return 0;
    }
    const orgLimit = await db.orgLimit.findUnique({
        where:{
            orgId,
        },

    });
    if(!orgLimit){
        return 0;
    } 
    return orgLimit.count;
};