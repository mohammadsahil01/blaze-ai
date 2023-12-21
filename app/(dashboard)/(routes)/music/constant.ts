import * as z from "zod";


export const formSchema = z.object({
    prompt:z.string().min(5,{
        message:"Prompt is required"
    }),    
})