import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAIApi from "openai";

import { increaseApiLimit, checkApiLimit} from "@/lib/api-limit";

const openai = new OpenAIApi({apiKey:process.env.OPEN_API_KEY});

export async function POST(
    req:Request)
    {
        try{
            const {userId} = auth()
            const body = await req.json()
            const {messages} = body;

            if(!messages){
                return new NextResponse("Messasages are required",{status:400})
            }

            const freeTrial = await checkApiLimit();

            if(!freeTrial){
                return new NextResponse("Free trial has expired",{status:403})
            }

            if(!userId){
                return new NextResponse("Unauthorised",{status:401})
            }

            const response = await openai.chat.completions.create({
                model:"gpt-3.5-turbo",messages
            })
            await increaseApiLimit();
            return NextResponse.json(response.choices[0].message);



        } catch (error){
            console.log("{CONVERSATION ERROR",error);
            return new NextResponse("Internal error",{status:500})
        }
    }