import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
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

            if(!freeTrial){
                return new NextResponse("Free trial has expired",{status:403})
            }

            if(!userId){
                return new NextResponse("Unauthorised",{status:401})
            }

            const response = await replicate.run(
                "meta/musicgen:7be0f12c54a8d033a0fbd14418c9af98962da9a86f5ff7811f9b3423a1f0b7d7",
                {
                    input: {
                        top_k: 250,
                        top_p: 0,
                        prompt: prompt,
                        duration: 5,
                        temperature: 1,
                        continuation: false,
                        model_version: "stereo-large",
                        output_format: "wav",
                        continuation_start: 0,
                        multi_band_diffusion: false,
                        normalization_strategy: "peak",
                        classifier_free_guidance: 3
                      }
                }
              );
              await increaseApiLimit();
            return NextResponse.json(response);



        } catch (error){
            console.log("Music ERROR",error);
            return new NextResponse("Internal error",{status:500})
        }
    }