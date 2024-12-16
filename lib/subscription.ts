

import { redirect } from "next/navigation";
import { db } from "./db";
import { getSession } from "./session";


const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () =>{
    const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const {orgId}= session;

    if(!orgId){
        return false;
    }

    const orgSubscription = await db.orgSubscription.findUnique({
        where:{
            orgId,
        },
        select:{
            stripeSubscriptionId:true,
            stripeCurrentPeriodEnd:true,
            stripeCustomerId:true,
            stripePriceId:true,
        },

    });

    if(!orgSubscription){
        return false;
    }
    const isValid = orgSubscription.stripePriceId && orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
    return !!isValid;
};

