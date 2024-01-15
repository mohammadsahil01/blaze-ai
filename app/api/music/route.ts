import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { TIMEOUT } from "dns";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth:process.env.REPLICATE_API_TOKEN!
})

export async function POST(
    req:Request)
    {
        try{
            const {userId} = auth()
            const body = await req.json()
            const {prompt} = body;

            if(!prompt){
                return new NextResponse("Prompt is required",{status:400})
            }

            const freeTrial = await checkApiLimit();
            const isPro = await checkSubscription()
            
            if(!freeTrial && !isPro){
                return new NextResponse("Free trial has expired",{status:403})
            }

            

            if(!userId){
                return new NextResponse("Unauthorised",{status:401})
            }

            const response = await replicate.run(
                "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
                {
                  input: {
                    prompt_a: prompt
                  }
                }
             );
              if(!isPro){
                await increaseApiLimit();
            }
            return NextResponse.json(response);



        } catch (error){
            console.log("Music ERROR",error);
            return new NextResponse("Internal error",{status:500})
        }
    }

    

    // export default async (req, res) => {
    //   try {
    //     const response = await axios.get('https://api.example.com/someData', {
    //       timeout: 5000, // Set your desired timeout value in milliseconds (e.g., 5000ms or 5 seconds)
    //     });
    
    //     const data = response.data;
    //     res.status(200).json({ data });
    //   } catch (error) {
    //     res.status(500).json({ error: 'Request timed out or an error occurred' });
    //   }
    // };