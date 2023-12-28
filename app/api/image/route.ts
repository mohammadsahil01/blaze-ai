import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAIApi, { OpenAI } from "openai";



const openai = new OpenAI({apiKey:process.env.OPEN_API_KEY});

export async function POST(
    req:Request)
    {
        try{
            const {userId} = auth()
            const body = await req.json()
            const {prompt,amount =1,resolution="512x512"} = body;

            if(!prompt){
                return new NextResponse("Prompt is required",{status:400})
            }

            const freeTrial = await checkApiLimit();

            const isPro = await checkSubscription()
            
            if(!freeTrial && !isPro){
                return new NextResponse("Free trial has expired",{status:403})
            }

            if(!amount){
                return new NextResponse("Amount is required",{status:400})
            }

            if(!resolution){
                return new NextResponse("Resolution is required",{status:400})
            }

            if(!userId){
                return new NextResponse("Unauthorised",{status:401})
            }

            const response = await openai.images.generate({
                prompt,
                n:parseInt(amount,10),
                size:resolution
            })
            if(!isPro){
                await increaseApiLimit();
            }
            return NextResponse.json(response.data);



        } catch (error){
            console.log("{IMAGE ERROR",error);
            return new NextResponse("Internal error",{status:500})
        }
    }