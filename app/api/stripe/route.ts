import {auth, currentUser} from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingUrl = absoluteUrl("/settings");

export async function GET(){
    try{
        const {userId} = auth()
        const user = await currentUser();
        if(!userId||!user){
            return new NextResponse("user not found",{status:401})
        }

        const userSubscriiption = await prismadb.userSubscription.findUnique({
            where:{
                userId
            }
        })

        if(userSubscriiption && userSubscriiption.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer:userSubscriiption.stripeCustomerId,
                return_url:settingUrl

            })

            return new NextResponse(JSON.stringify({url:stripeSession.url}))
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url:settingUrl,
            cancel_url:settingUrl,
            payment_method_types:["card"],
            mode:"subscription",
            billing_address_collection:"auto",
            customer_email:user.emailAddresses[0].emailAddress,
            line_items:[
                {
                    price_data:{
                        currency:"INR",
                        product_data:{
                            name:"blaze AI",
                            description:"All AI tools",
                        },
                        unit_amount:5000,
                        recurring:{
                            interval:"month"
                        },
                    },
                    quantity:1
                }
            ],
            metadata:{
                userId,
            }
        });

        return new NextResponse(JSON.stringify({url:stripeSession.url}))

    }catch(error){
        console.log("Stripe error",error)
        return new NextResponse("Internal error",{status:500})
    }
}