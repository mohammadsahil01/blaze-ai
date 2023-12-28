import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async()=>{
    const {userId} = auth()

    if(!userId){
        return false;
    }

    const userSubscriiption = await prismadb.userSubscription.findUnique({
        where:{
            userId:userId
        },
        select:{
            stripeCurrentPeriodEnd:true,
            stripeCustomerId:true,
            stripePriceId:true,
            stripeSubscriptionId:true
        }
    })

    if(!userSubscriiption){
        return false;
    }

    const isValid = userSubscriiption.stripePriceId&& userSubscriiption.stripeCurrentPeriodEnd?.getTime()!+DAY_IN_MS>Date.now();

    return !!isValid;
}