"use server";


import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { StripeRedirect } from "./schema";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";




const handler = async (data: InputType): Promise<ReturnType>=>{
    const session = await getSession();
    if(!session){
        redirect("/login")
    }
    const {userId, orgId, userName} = session;


    if(!userId || !orgId || !userName) {
        return {
            error: "unauthorized",
        };
    }
  const settingsUrl = absoluteUrl(`/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
        where:{orgId,}
    });

    if(orgSubscription && orgSubscription.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: orgSubscription.stripeCustomerId,
            return_url: settingsUrl,
        });

        url = stripeSession.url;
    } else {
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: userName,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data:{
                            name: "CardHive Pro",
                            description: "Unlimited boards for your organization",    
                        },
                        unit_amount: 2000,
                        recurring:{
                            interval: "month",
                        },
                    },
                    quantity:1,
                },
            ],
            metadata:{
                orgId,
            },
        });

        url = stripeSession.url || "";

    }
  } catch {
    return {
        error: "Something went wrong!"
    }
  };
  revalidatePath(`/organization/${orgId}`);
  return {data: url};
};
export const stripeRedirect = CreateSafeAction(StripeRedirect, handler)